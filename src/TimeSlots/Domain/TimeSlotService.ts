import { Booking } from 'src/Bookings/Domain/Booking';
import { TimeSlot } from './TimeSlot';

export class TimeSlotService {
  public verifyWhichTimeSlotIsBookedByCustomer({
    bookingCollection,
    timeSlotCollection,
  }: {
    bookingCollection: Booking[];
    timeSlotCollection: TimeSlot[];
  }): TimeSlot[] {
    return timeSlotCollection.map((timeSlot) => {
      bookingCollection.map((booking) =>
        timeSlot.checkIfItIsBookedByCustomer(booking)
      );

      return timeSlot;
    });
  }
}
