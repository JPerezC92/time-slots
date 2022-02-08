import { Booking } from './Booking';
import { Customer } from 'src/Customers/Domain/Customer';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';

export interface BookingRepository {
  findAllByCustomer(customer: Customer): Promise<Booking[]>;
  findByCustomerAndTimeSlot(props: {
    customerId: Customer['id'];
    timeSlotId: TimeSlot['id'];
  }): Promise<Booking | undefined>;
  save(booking: Booking): Promise<void>;
  deleteByCustomerAndTimeSlot(props: {
    customer: Customer['id'];
    timeSlot: TimeSlot['id'];
  }): Promise<void>;
}
