import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotEnd } from '@TimeSlots/Domain/TimeSlotEnd';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TimeSlotIsBooked } from '@TimeSlots/Domain/TimeSlotIsBooked';
import { TimeSlotPersistence } from '../TimeSlotPersistence';
import { TimeSlotStart } from '@TimeSlots/Domain/TimeSlotStart';
import { IsBookedByCustomer } from '@TimeSlots/Domain/IsBookedByCustomer';
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
