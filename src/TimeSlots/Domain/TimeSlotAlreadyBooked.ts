import { DomainException } from 'src/Shared/Domain/DomainException';
import { TimeSlot } from './TimeSlot';

export class TimeSlotAlreadyBooked extends DomainException {
  constructor(private readonly _timeSlot: TimeSlot) {
    super();
  }

  public readonly name = 'TimeSlotAlreadyBooked';

  public readonly message = `TimeSlot ${this._timeSlot.start.toLocaleTimeString(
    navigator.language,
    { hour: '2-digit', minute: '2-digit', hour12: true }
  )} - ${this._timeSlot.end.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })} is already booked`;
}
