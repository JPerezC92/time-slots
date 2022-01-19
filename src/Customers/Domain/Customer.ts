import { CustomerId } from './CustomerId';
import { CustomerName } from './CustomerName';
import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { Booking } from 'src/Bookings/Domain/Booking';

export class Customer {
  private readonly _customerId: CustomerId;
  private readonly _customerName: CustomerName;

  public get id(): string {
    return this._customerId.value;
  }

  public get name(): string {
    return this._customerName.value;
  }

  constructor(props: { customerId: CustomerId; customerName: CustomerName }) {
    this._customerId = props.customerId;
    this._customerName = props.customerName;
  }

  public Book({
    motorcyclist,
    timeSlot,
  }: {
    motorcyclist: Motorcyclist;
    timeSlot: TimeSlot;
  }): Booking {
    timeSlot.book();
    motorcyclist.TakeMotorcyclist();

    return Booking.new({
      customer: this,
      motorcyclist,
      timeSlot,
    });
  }

  public cancelBooking(motorcyclist: Motorcyclist): void {
    motorcyclist.TakeBackMotorcyclist();
  }
}
