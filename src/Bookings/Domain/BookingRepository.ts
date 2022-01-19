import { Booking } from './Booking';
import { Customer } from 'src/Customers/Domain/Customer';

export interface BookingRepository {
  findAllByCustomer(customer: Customer): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
}
