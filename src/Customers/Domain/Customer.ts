import { Booking } from 'src/Bookings/Domain/Booking';
import { CustomerId } from './CustomerId';
import { FirstName } from './FirstName';
import { IsLoggedIn } from './IsLoggedIn';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { LastName } from './LastName';
import { CustomerPlain } from './CustomerPlain';

export class Customer {
  private readonly _customerId: CustomerId;
  private readonly _firstName: FirstName;
  private readonly _lastName: LastName;
  private readonly _isLoggedIn: IsLoggedIn;

  public get id(): string {
    return this._customerId.value;
  }
  public get firstName(): string {
    return this._firstName.value;
  }
  public get lastName(): string {
    return this._lastName.value;
  }
  public get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  constructor(props: {
    customerId: CustomerId;
    firstName: FirstName;
    lastName: LastName;
    isLoggedIn: IsLoggedIn;
  }) {
    this._customerId = props.customerId;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._isLoggedIn = props.isLoggedIn;
  }

  public static fromPlain(
    props: CustomerPlain & { isLoggedIn: boolean }
  ): Customer {
    return new Customer({
      customerId: new CustomerId(props.id),
      firstName: new FirstName(props.firstName),
      lastName: new LastName(props.lastName),
      isLoggedIn: new IsLoggedIn(props.isLoggedIn),
    });
  }

  public Book({
    motorcyclist,
    timeSlot,
  }: {
    motorcyclist: Motorcyclist;
    timeSlot: TimeSlot;
  }): Booking {
    timeSlot.book();
    motorcyclist.assignTimeSlot(timeSlot);

    return Booking.new({
      customerId: new CustomerId(this.id),
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      timeSlotId: new TimeSlotId(timeSlot.id),
    });
  }

  public CancelBooking({
    motorcyclist,
    timeSlot: timeslot,
  }: {
    motorcyclist: Motorcyclist;
    timeSlot: TimeSlot;
  }): void {
    motorcyclist.unassignTimeSlot(timeslot);
    timeslot.CancelBooking();
  }
}
