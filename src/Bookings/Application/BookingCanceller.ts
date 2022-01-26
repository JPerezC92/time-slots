import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotFinder } from 'src/TimeSlot/Application/TimeSlotFinder';
import { TimeSlotRepository } from 'src/TimeSlot/Domain/TimeSlotRepository';
import { TimeSlotStore } from 'src/TimeSlot/Domain/TimeSlotStore';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface BookingCancellerInput {
  customer: Customer;
  timeSlot: TimeSlot;
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
    timeSlot,
  }: BookingCancellerInput): Promise<void> {
    const bookingFound =
      await this._bookingRepository.findByCustomerAndTimeSlot({
        customer,
        timeSlot,
      });
    const motorcyclist = await this._motorcyclistRepository.findById(
      bookingFound.motorcyclistId.value
    );

    customer.CancelBooking({
      motorcyclist: motorcyclist,
      timeSlot: timeSlot,
    });

    await Promise.all([
      this._motorcyclistRepository.update(motorcyclist),
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
