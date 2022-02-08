import { TimeSlotPersistence } from '@TimeSlots/Infrastructure/TimeSlotPersistence';

export interface MotorcyclistPersistence {
  id: string;
  timeSlotAssigned: string[];
}
