import { BookingId } from './BookingId';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { BookingPlain } from './BookingPlain';

interface BookingProps {
  bookingId: BookingId;
  customerId: CustomerId;
  motorcyclistId: MotorcyclistId;
  timeSlotId: TimeSlotId;
}

export class Booking {
  private readonly _bookingId: BookingId;
  public readonly customerId: CustomerId;
  public readonly motorcyclistId: MotorcyclistId;
  public readonly timeSlotId: TimeSlotId;

  public get id(): string {
    return this._bookingId.value;
  }

  constructor(props: BookingProps) {
    this._bookingId = props.bookingId;
    this.motorcyclistId = props.motorcyclistId;
    this.customerId = props.customerId;
    this.timeSlotId = props.timeSlotId;
  }

  public static new(props: Omit<BookingProps, 'bookingId'>) {
    return new Booking({
      bookingId: new BookingId(''),
      ...props,
    });
  }

  public static fromPlain(object: BookingPlain) {
    return new Booking({
      bookingId: new BookingId(object.id),
      customerId: new CustomerId(object.customerId),
      motorcyclistId: new MotorcyclistId(object.motorcyclistId),
      timeSlotId: new TimeSlotId(object.timeSlotId),
    });
  }
}
