import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';

export interface MotorcyclistStore {
  updateCount(count: number): void;
  save(motorcyclistList: Motorcyclist[]): void;
}
