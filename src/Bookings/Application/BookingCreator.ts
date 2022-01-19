import { BookingRepository } from '../Domain/BookingRepository';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerRepository } from 'src/Customers/Domain/CustomerRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotRepository } from 'src/TimeSlot/Domain/TimeSlotRepository';
import { UseCase } from 'src/Shared/Domain/UseCase';
import { TimeSlotStore } from 'src/TimeSlot/Domain/TimeSlotStore';
import { TimeSlotFinder } from 'src/TimeSlot/Application/TimeSlotFinder';

interface BookingCreatorInput {
  customerId: CustomerId;
  timeSlot: TimeSlot;
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

    this._motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
      motorcyclistRepository: this._motorcyclistRepository,
      motorcyclistStore: this._motorcyclistStore,
    });
  }

  async execute({ customerId, timeSlot }: BookingCreatorInput): Promise<void> {
    const [customerFound, timeSlotFound, motorcyclistFound] = await Promise.all(
      [
        this._customerRepository.findById(customerId),
        this._timeSlotRepository.findById(timeSlot),
        this._motorcyclistRepository.findOneAvailable(),
      ]
    );

    const booking = customerFound.Book({
      motorcyclist: motorcyclistFound,
      timeSlot: timeSlotFound,
    });

    await Promise.all([
      await this._timeSlotRepository.update(timeSlotFound),
      await this._motorcyclistRepository.update(motorcyclistFound),
      await this._bookingRepository.save(booking),
    ]);

    await Promise.all([
      this._timeSlotFinder.execute({ customer: customerFound }),
      this._motorcyclistAvailableCounter.execute(),
    ]);
  }
}
