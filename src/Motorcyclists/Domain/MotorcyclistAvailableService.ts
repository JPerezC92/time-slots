import { Motorcyclist } from './Motorcyclists';

export class MotorcyclistAvailableService {
  public SearchAvailableWithLessWorkload(
    motorcyclistCollection: Motorcyclist[]
  ): Motorcyclist {
    const motorcyclist = motorcyclistCollection.sort((a, b) => {
      if (a.timeSlotAssigned.length > b.timeSlotAssigned.length) {
        return 1;
      }
      if (a.timeSlotAssigned.length < b.timeSlotAssigned.length) {
        return -1;
      }
      return 0;
    });

    return motorcyclist[0];
  }
}
