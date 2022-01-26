import { Booking } from 'src/Bookings/Domain/Booking';
import { CustomerId } from './CustomerId';
import { CustomerName } from './CustomerName';
import { IsLoggedIn } from './IsLoggedIn';
import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { TimeSlotId } from 'src/TimeSlot/Domain/TimeSlotId';

export class Customer {
  private readonly _customerId: CustomerId;
  private readonly _customerName: CustomerName;
  private readonly _isLoggedIn: IsLoggedIn;

  public get id(): string {
    return this._customerId.value;
  }
  public get name(): string {
    return this._customerName.value;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  constructor(props: {
    customerId: CustomerId;
    customerName: CustomerName;
    isLoggedIn: IsLoggedIn;
  }) {
    this._customerId = props.customerId;
    this._customerName = props.customerName;
    this._isLoggedIn = props.isLoggedIn;
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
