import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotEnd } from 'src/TimeSlot/Domain/TimeSlotEnd';
import { TimeSlotId } from 'src/TimeSlot/Domain/TimeSlotId';
import { TimeSlotIsBooked } from 'src/TimeSlot/Domain/TimeSlotIsBooked';
import { TimeSlotPersistence } from '../TimeSlotPersistence';
import { TimeSlotStart } from 'src/TimeSlot/Domain/TimeSlotStart';
import { IsBookedByCustomer } from 'src/TimeSlot/Domain/IsBookedByCustomer';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

export const TimeSlotMapper = {
  toPersistence: (timeSlot: TimeSlot): TimeSlotPersistence => ({
    id: timeSlot.id,
    start: format(timeSlot.start, 'HH:mm'),
    end: format(timeSlot.end, 'HH:mm'),
    isBooked: timeSlot.isBooked,
  }),

  toDomain: (timeSlotPersistence: TimeSlotPersistence): TimeSlot =>
    new TimeSlot({
      timeSlotId: new TimeSlotId(timeSlotPersistence.id),
      startTime: new TimeSlotStart(
        parse(timeSlotPersistence.start, 'HH:mm', new Date())
      ),
      endTime: new TimeSlotEnd(
        parse(timeSlotPersistence.end, 'HH:mm', new Date())
      ),
      isBooked: new TimeSlotIsBooked(timeSlotPersistence.isBooked),
      isBookedByCustomer: new IsBookedByCustomer(false),
    }),
};
