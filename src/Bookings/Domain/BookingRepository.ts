import { Booking } from './Booking';
import { Customer } from 'src/Customers/Domain/Customer';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';

export interface BookingRepository {
  findAllByCustomer(customer: Customer): Promise<Booking[]>;
  findByCustomerAndTimeSlot(props: {
    customer: Customer;
    timeSlot: TimeSlot;
  }): Promise<Booking>;
  save(booking: Booking): Promise<void>;
  deleteByCustomerAndTimeSlot(props: {
    customer: Customer;
    timeSlot: TimeSlot;
  }): Promise<void>;
}
