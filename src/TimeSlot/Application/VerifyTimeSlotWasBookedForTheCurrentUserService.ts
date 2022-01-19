import { Booking } from '../../Bookings/Domain/Booking';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotId } from 'src/TimeSlot/Domain/TimeSlotId';
import { TimeSlotStart } from 'src/TimeSlot/Domain/TimeSlotStart';
import { TimeSlotEnd } from 'src/TimeSlot/Domain/TimeSlotEnd';
import { TimeSlotIsBooked } from 'src/TimeSlot/Domain/TimeSlotIsAvailable';
import { WasBookedForTheCurrentUser } from 'src/TimeSlot/Domain/WasBookedForTheCurrentUser';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface Output {
  bookingColl: Booking[];
  timeSlot: TimeSlot[];
}

export class CheckTimeSlotWasBookedForTheCurrentCustomer
  implements UseCase<TimeSlot[], Output>
{
  public execute({ bookingColl, timeSlot }: Output): TimeSlot[] {
    return timeSlot.map((timeSlot) =>
      bookingColl.some((booking) => booking.timeSlot.equals(timeSlot))
        ? new TimeSlot({
            timeSlotId: new TimeSlotId(timeSlot.id),
            startTime: new TimeSlotStart(timeSlot.start),
            endTime: new TimeSlotEnd(timeSlot.end),
            isBooked: new TimeSlotIsBooked(true),
            wasBookedForTheCurrentUser: new WasBookedForTheCurrentUser(true),
          })
        : timeSlot
    );
  }
}
