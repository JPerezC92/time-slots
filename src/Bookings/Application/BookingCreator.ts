import { Booking } from '../Domain/Booking';
import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerRepository } from 'src/Customers/Domain/CustomerRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistState';
import { TakeMotorcyclist } from 'src/Customers/Application/TakeMotorcyclist';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface BookingCreatorInput {
  customerId: CustomerId;
}

export class BookingCreator
  implements UseCase<Promise<void>, BookingCreatorInput>
{
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistStore: MotorcyclistStore;
  private readonly _bookingRepository: BookingRepository;
  private readonly _customerRepository: CustomerRepository;

  constructor(props: {
    motorcyclistRepository: MotorcyclistRepository;
    motorcyclistState: MotorcyclistStore;
    bookingRepository: BookingRepository;
    customerRepository: CustomerRepository;
  }) {
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._bookingRepository = props.bookingRepository;
    this._customerRepository = props.customerRepository;
    this._motorcyclistStore = props.motorcyclistState;
  }

  async execute({ customerId }: BookingCreatorInput): Promise<void> {
    const customer = (await this._customerRepository.findById(
      customerId
    )) as Customer;

    const motorcyclist = await new TakeMotorcyclist({
      motorcyclistRepository: this._motorcyclistRepository,
      presenter: { show: ({ motorcyclist }) => motorcyclist },
    }).execute({ customer });

    await this._motorcyclistRepository.update(motorcyclist);

    await new MotorcyclistAvailableCounter({
      motorcyclistRepository: this._motorcyclistRepository,
      motorcyclistStore: this._motorcyclistStore,
      presenter: { show: () => motorcyclist },
    }).execute();

    const booking = Booking.new({
      motorcyclist,
      customer,
    });

    await this._bookingRepository.save(booking);
  }
}
