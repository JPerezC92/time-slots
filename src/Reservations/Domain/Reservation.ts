import { Customer } from "src/Customers/Domain/Customer";
import { Motorcyclist } from "src/Motorcyclists/Domain/Motorcyclists";

export class Reservation {
  private readonly _reservationId: ReservationId;
  public readonly motorcyclist: Motorcyclist;
  public readonly customer: Customer;

  public get id(): string {
    return this._reservationId.value;
  }

  constructor(props: {
    reservationId: ReservationId;
    motorcyclist: Motorcyclist;
    customer: Customer;
  }) {
    this._reservationId = props.reservationId;
    this.motorcyclist = props.motorcyclist;
    this.customer = props.customer;
  }
}

export class ReservationId {
  constructor(public readonly value: string) {}
}
