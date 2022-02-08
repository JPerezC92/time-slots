import { Motorcyclist } from './Motorcyclists';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';

export interface MotorcyclistRepository {
  findById(motorcyclistId: string): Promise<Motorcyclist>;
  findOneAvailable(): Promise<Motorcyclist>;
  findAll(): Promise<Motorcyclist[]>;
  addTimeSlotAssigned({
    motorcyclistId,
    timeSlotId,
  }: {
    motorcyclistId: Motorcyclist['id'];
    timeSlotId: TimeSlot['id'];
  }): Promise<void>;
  removeTimeSlotAssigned({
    motorcyclistId,
    timeSlotId,
  }: {
    motorcyclistId: Motorcyclist['id'];
    timeSlotId: TimeSlot['id'];
  }): Promise<void>;
}
