import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { MotorcyclistPersistence } from '../../Domain/MotorcyclistPersistence';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistPersistence => ({
    id: motorcyclist.id,
    timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
      (timeSlotId) => timeSlotId.value
    ),
  }),

  toDomain: (motorcyclist: MotorcyclistPersistence): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
        (timeSlotId) => new TimeSlotId(timeSlotId)
      ),
    });
  },
};
