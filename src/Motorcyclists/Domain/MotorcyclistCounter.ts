import { Motorcyclist } from './Motorcyclists';

export class MotorcyclistCounter {
  public availableCount(motorcyclistCollection: Motorcyclist[]): number {
    return motorcyclistCollection.filter(
      (motorcyclist) => motorcyclist.isAvailable
    ).length;
  }
}
