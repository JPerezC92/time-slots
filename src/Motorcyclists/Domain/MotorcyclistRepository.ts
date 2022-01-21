import { Motorcyclist } from './Motorcyclists';

export interface MotorcyclistRepository {
  findOneAvailable(): Promise<Motorcyclist>;
  findAll(): Promise<Motorcyclist[]>;
  update(motorcyclist: Motorcyclist): Promise<void>;
}
