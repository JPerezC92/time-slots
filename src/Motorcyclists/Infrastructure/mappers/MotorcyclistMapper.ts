import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { MotorcyclistPersistence } from '../../Domain/MotorcyclistPersistence';
import { TimeSlotMapper } from 'src/TimeSlot/Infrastructure/mappers/TimeSlotMapper';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistPersistence => ({
    id: motorcyclist.id,
    timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
      TimeSlotMapper.toPersistence
    ),
  }),

  toDomain: (motorcyclist: MotorcyclistPersistence): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
        TimeSlotMapper.toDomain
      ),
    });
  },
};
