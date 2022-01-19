import { TimeSlot } from './TimeSlot';

export interface TimeSlotStore {
  setTimeSlotColl(timeSlotCollection: TimeSlot[]): void;
  // updateTimeSlot(timeSlot: TimeSlot): void;
}
