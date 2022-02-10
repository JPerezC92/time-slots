import { Booking } from '@Bookings/Domain/Booking';
import { Customer } from '@Customers/Domain/Customer';
import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { BookingPlain } from './BookingPlain';

export interface BookingRepository {
  save(timeSlot: TimeSlot): Promise<JSendResponse<null>>;
  delete(bookingId: Booking['id']): Promise<JSendResponse<null>>;
  findAllByCustomer(): Promise<JSendResponse<{ bookings: BookingPlain[] }>>;
}
