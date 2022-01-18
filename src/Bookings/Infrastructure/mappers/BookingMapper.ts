import { Booking } from 'src/Bookings/Domain/Booking';
import { BookingPersistence } from './BookingPlain';

export const BookingMapper = {
  toPersistence: (booking: Booking): BookingPersistence => {
    return {
      id: booking.id,
      motorcyclistId: booking.motorcyclist.id,
      customerId: booking.customer.id,
    };
  },
};
