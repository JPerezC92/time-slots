import { Motorcyclist } from './Motorcyclist';

export class MotorcyclistService {
  public countAvailable(motorcyclistList: Motorcyclist[]): number {
    return motorcyclistList.filter((m) => m.isAvailable).length;
  }
}
