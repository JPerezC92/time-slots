import { Booking } from './Booking';

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
}
