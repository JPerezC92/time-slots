import { Motorcyclist } from './Motorcyclists';

export interface MotorcyclistRepository {
  findOneAvailable(): Promise<Motorcyclist>;
  findAll(): Promise<Motorcyclist[]>;
  // findById(id: string): Promise<Motorcyclist | null>;
  // save(motorcyclist: Motorcyclist): Promise<void>;
}
