import { Motorcyclist } from "./Motorcyclists";

export interface MotorcyclistRepository {
  findOneAvailable(): Promise<Motorcyclist>;
  // findById(id: string): Promise<Motorcyclist | null>;
  // findAll(): Promise<Motorcyclist[]>;
  // save(motorcyclist: Motorcyclist): Promise<void>;
}
