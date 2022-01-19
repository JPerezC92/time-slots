import { Booking, BookingId } from 'src/Bookings/Domain/Booking';
import { CustomerMapper } from 'src/Customers/Infrastructure/mappers/CustomerMapper';
import { MotorcyclistMapper } from 'src/Motorcyclists/Infrastructure/mappers/MotorcyclistMapper';
import { TimeSlotMapper } from 'src/TimeSlot/Infrastructure/mappers/TimeSlotMapper';
import { BookingPersistence } from './BookingPersistence';

export const BookingMapper = {
  toPersistence: (booking: Booking): BookingPersistence => {
    return {
      id: booking.id,
      timeSlot: TimeSlotMapper.toPersistence(booking.timeSlot),
      motorcyclist: MotorcyclistMapper.toPlain(booking.motorcyclist),
      customer: CustomerMapper.toPlain(booking.customer),
    };
  },

  toDomain: (bookingPersistence: BookingPersistence): Booking => {
    return new Booking({
      bookingId: new BookingId(bookingPersistence.id),
      timeSlot: TimeSlotMapper.toDomain(bookingPersistence.timeSlot),
      motorcyclist: MotorcyclistMapper.toDomain(
        bookingPersistence.motorcyclist
      ),
      customer: CustomerMapper.toDomain(bookingPersistence.customer),
    });
  },
};
