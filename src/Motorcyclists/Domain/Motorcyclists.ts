import { MotorcyclistId } from './MotorcyclistId';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';

export class Motorcyclist {
  private readonly _maxWorkLoad = 3;
  private readonly _motorcyclistId: MotorcyclistId;
  public timeSlotAssigned: TimeSlot[];

  public get id(): string {
    return this._motorcyclistId.value;
  }
  public get isAvailable(): boolean {
    return this.timeSlotAssigned.length < this._maxWorkLoad;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    timeSlotAssigned: TimeSlot[];
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this.timeSlotAssigned = props.timeSlotAssigned;
  }

  public assignTimeSlot(timeSlot: TimeSlot) {
    this.timeSlotAssigned = [...this.timeSlotAssigned, timeSlot];
  }

  public unassignTimeSlot(timeSlot: TimeSlot) {
    this.timeSlotAssigned = this.timeSlotAssigned.filter(
      (timeslot) => !timeslot.equals(timeSlot)
    );
  }
}
