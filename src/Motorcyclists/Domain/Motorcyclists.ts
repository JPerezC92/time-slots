import { MotorcyclistId } from './MotorcyclistId';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';

export class Motorcyclist {
  private readonly _maxWorkLoad = 3;
  private readonly _motorcyclistId: MotorcyclistId;
  public timeSlotAssigned: TimeSlotId[];

  public get id(): string {
    return this._motorcyclistId.value;
  }
  public get isAvailable(): boolean {
    return this.timeSlotAssigned.length < this._maxWorkLoad;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    timeSlotAssigned: TimeSlotId[];
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this.timeSlotAssigned = props.timeSlotAssigned;
  }

  public assignTimeSlot(timeSlot: TimeSlot) {
    this.timeSlotAssigned = [
      ...this.timeSlotAssigned,
      new TimeSlotId(timeSlot.id),
    ];
  }

  public unassignTimeSlot(timeSlot: TimeSlot) {
    this.timeSlotAssigned = this.timeSlotAssigned.filter(
      (timeSlotId) => timeSlotId.value !== timeSlot.id
    );
  }
}
