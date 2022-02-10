import { Booking } from './Booking';

export interface BookingStore {
  saveBookingList(bookingList: Booking[]): void;
  // findAll(): Booking[];
  findByTimeSlotId(props: { timeSlotId: string }): Booking | undefined;
}
