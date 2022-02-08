import { TimeSlot } from './TimeSlot';

export interface TimeSlotRepository {
  findAll(): Promise<TimeSlot[]>;
  findById(timeSlot: TimeSlot['id']): Promise<TimeSlot>;
  update(timeSlot: TimeSlot): Promise<void>;
}
