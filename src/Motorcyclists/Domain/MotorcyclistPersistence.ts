import { TimeSlotPersistence } from 'src/TimeSlot/Infrastructure/TimeSlotPersistence';

export interface MotorcyclistPersistence {
  id: string;
  timeSlotAssigned: string[];
}
