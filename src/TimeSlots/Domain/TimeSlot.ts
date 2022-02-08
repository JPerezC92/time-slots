import { Booking } from 'src/Bookings/Domain/Booking';
import { TimeSlotEnd } from './TimeSlotEnd';
import { TimeSlotId } from './TimeSlotId';
import { TimeSlotIsBooked } from './TimeSlotIsBooked';
import { TimeSlotStart } from './TimeSlotStart';
import { IsBookedByCustomer } from './IsBookedByCustomer';
import { TimeSlotPlain } from './TimeSlotPlain';

export class TimeSlot {
  private readonly _timeSlotId: TimeSlotId;
  private readonly _startTime: TimeSlotStart;
  private readonly _endTime: TimeSlotEnd;
  private _isBookedByCustomer: IsBookedByCustomer;
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
  public get isBookedByCustomer(): boolean {
    return this._isBookedByCustomer.value;
  }

  constructor(props: {
    timeSlotId: TimeSlotId;
    startTime: TimeSlotStart;
    endTime: TimeSlotEnd;
    isBooked: TimeSlotIsBooked;
    isBookedByCustomer: IsBookedByCustomer;
  }) {
    this._timeSlotId = props.timeSlotId;
    this._startTime = props.startTime;
    this._endTime = props.endTime;
    this._isBooked = props.isBooked;
    this._isBookedByCustomer = props.isBookedByCustomer;
  }

  public static fromPlain(object: TimeSlotPlain): TimeSlot {
    return new TimeSlot({
      timeSlotId: new TimeSlotId(object.id),
      startTime: new TimeSlotStart(object.start),
      endTime: new TimeSlotEnd(object.end),
      isBooked: new TimeSlotIsBooked(object.isBooked),
      isBookedByCustomer: new IsBookedByCustomer(object.isBookedByCustomer),
    });
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
