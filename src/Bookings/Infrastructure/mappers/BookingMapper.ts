import { Booking } from 'src/Bookings/Domain/Booking';
import { BookingId } from 'src/Bookings/Domain/BookingId';
import { BookingPersistence } from '../../Domain/BookingPersistence';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';

export const BookingMapper = {
  toPersistence: (booking: Booking): BookingPersistence => {
    return {
      id: booking.id,
      timeSlotId: booking.timeSlotId.value,
      motorcyclistId: booking.motorcyclistId.value,
      customerId: booking.customerId.value,
    };
  },

  toDomain: ({
    id,
    motorcyclistId,
    customerId,
    timeSlotId,
  }: BookingPersistence): Booking => {
    return new Booking({
      bookingId: new BookingId(id),
      timeSlotId: new TimeSlotId(timeSlotId),
      motorcyclistId: new MotorcyclistId(motorcyclistId),
      customerId: new CustomerId(customerId),
    });
  },
};
