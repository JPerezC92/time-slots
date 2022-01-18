import { Customer } from 'src/Customers/Domain/Customer';
import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';

interface BookingProps {
  bookingId: BookingId;
  motorcyclist: Motorcyclist;
  customer: Customer;
}

export class Booking {
  private readonly _bookingId: BookingId;
  public readonly motorcyclist: Motorcyclist;
  public readonly customer: Customer;

  public get id(): string {
    return this._bookingId.value;
  }

  constructor(props: BookingProps) {
    this._bookingId = props.bookingId;
    this.motorcyclist = props.motorcyclist;
    this.customer = props.customer;
  }

  public static new(props: Omit<BookingProps, 'bookingId'>) {
    return new Booking({
      bookingId: new BookingId(''),
      ...props,
    });
  }
}

export class BookingId {
  constructor(public readonly value: string) {}
}
