import { TimeSlot } from './TimeSlot';

export interface TimeSlotStore {
  setTimeSlotCollection(timeSlotCollection: TimeSlot[]): void;
}
