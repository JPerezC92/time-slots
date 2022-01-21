import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { MotorcyclistIsAvailable } from 'src/Motorcyclists/Domain/MotorcyclistIsAvailable';
import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistPersistence } from '../../Domain/MotorcyclistPersistence';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistPersistence => ({
    id: motorcyclist.id,
    isAvailable: motorcyclist.isAvailable,
  }),

  toDomain: (motorcyclist: MotorcyclistPersistence): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      available: new MotorcyclistIsAvailable(motorcyclist.isAvailable),
    });
  },
};
