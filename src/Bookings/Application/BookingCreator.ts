import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerRepository } from 'src/Customers/Domain/CustomerRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { UseCase } from 'src/Shared/Domain/UseCase';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { MotorcyclistAvailableFinder } from 'src/Motorcyclists/Application/MotorcyclistAvailableFinder';
import { TimeSlotAlreadyBooked } from '@TimeSlots/Domain/TimeSlotAlreadyBooked';

interface BookingCreatorInput {
  customer: Customer;
  timeSlotId: string;
}

export class BookingCreator
  implements UseCase<Promise<void>, BookingCreatorInput>
{
  private readonly _bookingRepository: BookingRepository;
  private readonly _customerRepository: CustomerRepository;
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistStore: MotorcyclistStore;
  private readonly _timeSlotRepository: TimeSlotRepository;
  private readonly _timeSlotStore: TimeSlotStore;

  private readonly _timeSlotFinder: TimeSlotFinder;
  private readonly _motorcyclistAvailableCounter: MotorcyclistAvailableCounter;
  private readonly _motorcyclistAvailableFinder: MotorcyclistAvailableFinder;

  constructor(props: {
    bookingRepository: BookingRepository;
    customerRepository: CustomerRepository;
    motorcyclistRepository: MotorcyclistRepository;
    motorcyclistStore: MotorcyclistStore;
    timeSlotRepository: TimeSlotRepository;
    timeSlotStore: TimeSlotStore;
  }) {
    this._bookingRepository = props.bookingRepository;
    this._customerRepository = props.customerRepository;
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._motorcyclistStore = props.motorcyclistStore;
    this._timeSlotRepository = props.timeSlotRepository;
    this._timeSlotStore = props.timeSlotStore;

    this._timeSlotFinder = new TimeSlotFinder({
      timeSlotRepository: this._timeSlotRepository,
      timeSlotStore: this._timeSlotStore,
      bookingRepository: this._bookingRepository,
    });

    this._motorcyclistAvailableFinder = new MotorcyclistAvailableFinder({
      motorcyclistRepository: this._motorcyclistRepository,
    });

    this._motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
      motorcyclistRepository: this._motorcyclistRepository,
      motorcyclistStore: this._motorcyclistStore,
    });
  }

  public async execute({
    customer,
    timeSlotId,
  }: BookingCreatorInput): Promise<void> {
    const [timeSlotFound, motorcyclistFound] = await Promise.all([
      this._timeSlotRepository.findById(timeSlotId),
      this._motorcyclistAvailableFinder.execute(),
    ]);

    if (timeSlotFound.isBooked) {
      await Promise.all([
        this._timeSlotFinder.execute({ customer }),
        this._motorcyclistAvailableCounter.execute(),
      ]);
      throw new TimeSlotAlreadyBooked(timeSlotFound);
    }

    const booking = customer.Book({
      motorcyclist: motorcyclistFound,
      timeSlot: timeSlotFound,
    });

    await Promise.all([
      await this._timeSlotRepository.update(timeSlotFound),
      await this._motorcyclistRepository.addTimeSlotAssigned({
        motorcyclistId: motorcyclistFound.id,
        timeSlotId: timeSlotFound.id,
      }),
      await this._bookingRepository.save(booking),
    ]);

    await Promise.all([
      this._timeSlotFinder.execute({ customer }),
      this._motorcyclistAvailableCounter.execute(),
    ]);
  }
}
