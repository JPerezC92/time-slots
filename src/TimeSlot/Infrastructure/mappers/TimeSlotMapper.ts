import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotEnd } from 'src/TimeSlot/Domain/TimeSlotEnd';
import { TimeSlotId } from 'src/TimeSlot/Domain/TimeSlotId';
import { TimeSlotIsBooked } from 'src/TimeSlot/Domain/TimeSlotIsAvailable';
import { TimeSlotPersistence } from '../TimeSlotPersistence';
import { TimeSlotStart } from 'src/TimeSlot/Domain/TimeSlotStart';
import { WasBookedForTheCurrentUser } from 'src/TimeSlot/Domain/WasBookedForTheCurrentUser';

export const TimeSlotMapper = {
  toPersistence: (timeSlot: TimeSlot): TimeSlotPersistence => ({
    id: timeSlot.id,
    start: timeSlot.start,
    end: timeSlot.end,
    isBooked: timeSlot.isBooked,
  }),

  toDomain: (timeSlotPersistence: TimeSlotPersistence): TimeSlot =>
    new TimeSlot({
      timeSlotId: new TimeSlotId(timeSlotPersistence.id),
      startTime: new TimeSlotStart(timeSlotPersistence.start),
      endTime: new TimeSlotEnd(timeSlotPersistence.end),
      isBooked: new TimeSlotIsBooked(timeSlotPersistence.isBooked),
      wasBookedForTheCurrentUser: new WasBookedForTheCurrentUser(false),
    }),
};
