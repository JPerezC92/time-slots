import { Motorcyclist } from './Motorcyclists';

export interface MotorcyclistRepository {
  findById(motorcyclistId: string): Promise<Motorcyclist>;
  findOneAvailable(): Promise<Motorcyclist>;
  findAll(): Promise<Motorcyclist[]>;
  update(motorcyclist: Motorcyclist): Promise<void>;
}
