import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface BookingCancellerInput {
  customer: Customer;
  timeSlotId: string;
}

export class BookingCanceller
  implements UseCase<Promise<void>, BookingCancellerInput>
{
  private readonly _bookingRepository: BookingRepository;
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _timeSlotRepository: TimeSlotRepository;

  private readonly _timeSlotFinder: TimeSlotFinder;
  private readonly _motorcyclistAvailableCounter: MotorcyclistAvailableCounter;

  constructor(props: {
    bookingRepository: BookingRepository;
    motorcyclistRepository: MotorcyclistRepository;
    timeSlotRepository: TimeSlotRepository;
    timeSlotStore: TimeSlotStore;
    motorcyclistStore: MotorcyclistStore;
  }) {
    this._bookingRepository = props.bookingRepository;
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._timeSlotRepository = props.timeSlotRepository;

    this._timeSlotFinder = new TimeSlotFinder({
      timeSlotRepository: props.timeSlotRepository,
      bookingRepository: props.bookingRepository,
      timeSlotStore: props.timeSlotStore,
    });

    this._motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
      motorcyclistRepository: props.motorcyclistRepository,
      motorcyclistStore: props.motorcyclistStore,
    });
  }

  public async execute({
    customer,
    timeSlotId,
  }: BookingCancellerInput): Promise<void> {
    const [bookingFound, timeSlot] = await Promise.all([
      this._bookingRepository.findByCustomerAndTimeSlot({
        customerId: customer.id,
        timeSlotId,
      }),
      this._timeSlotRepository.findById(timeSlotId),
    ]);

    if (bookingFound) {
      const motorcyclist = await this._motorcyclistRepository.findById(
        bookingFound.motorcyclistId.value
      );

      customer.CancelBooking({
        motorcyclist: motorcyclist,
        timeSlot,
      });

      await Promise.all([
        this._motorcyclistRepository.removeTimeSlotAssigned({
          motorcyclistId: motorcyclist.id,
          timeSlotId: timeSlot.id,
        }),
        this._timeSlotRepository.update(timeSlot),
        this._bookingRepository.deleteByCustomerAndTimeSlot({
          customer: bookingFound.customerId.value,
          timeSlot: bookingFound.timeSlotId.value,
        }),
      ]);

      await Promise.all([
        this._motorcyclistAvailableCounter.execute(),
        this._timeSlotFinder.execute({ customer }),
      ]);
    }
  }
}
