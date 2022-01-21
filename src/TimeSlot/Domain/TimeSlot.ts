import { TimeSlotEnd } from './TimeSlotEnd';
import { TimeSlotId } from './TimeSlotId';
import { TimeSlotIsBooked } from './TimeSlotIsAvailable';
import { TimeSlotStart } from './TimeSlotStart';
import { WasBookedForTheCurrentUser } from './WasBookedForTheCurrentUser';

export class TimeSlot {
  private readonly _timeSlotId: TimeSlotId;
  private readonly _startTime: TimeSlotStart;
  private readonly _endTime: TimeSlotEnd;
  private readonly _wasBookedForTheCurrentUser: WasBookedForTheCurrentUser;
  private _isBooked: TimeSlotIsBooked;

  public get id(): string {
    return this._timeSlotId.value;
  }
  public get start(): string {
    return this._startTime.value;
  }
  public get end(): string {
    return this._endTime.value;
  }
  public get isBooked(): boolean {
    return this._isBooked.value;
  }

  public get wasBookedForTheCurrentUser(): boolean {
    return this._wasBookedForTheCurrentUser.value;
  }

  constructor(props: {
    timeSlotId: TimeSlotId;
    startTime: TimeSlotStart;
    endTime: TimeSlotEnd;
    isBooked: TimeSlotIsBooked;
    wasBookedForTheCurrentUser: WasBookedForTheCurrentUser;
  }) {
    this._timeSlotId = props.timeSlotId;
    this._startTime = props.startTime;
    this._endTime = props.endTime;
    this._isBooked = props.isBooked;
    this._wasBookedForTheCurrentUser = props.wasBookedForTheCurrentUser;
  }

  public book(): void {
    this._isBooked = new TimeSlotIsBooked(true);
  }

  public CancelBooking(): void {
    this._isBooked = new TimeSlotIsBooked(false);
  }

  public equals(other: TimeSlot): boolean {
    return other instanceof TimeSlot && this.id === other.id;
  }
}
