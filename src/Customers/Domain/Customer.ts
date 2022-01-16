import { Motorcyclist } from "src/Motorcyclists/Domain/Motorcyclists";
import { CustomerId } from "./CustomerId";

export class Customer {
  private readonly _customerId: CustomerId;

  constructor(props: { customerId: CustomerId }) {
    this._customerId = props.customerId;
  }

  public get id(): string {
    return this._customerId.value;
  }

  public TakeMotorcyclist(motorcyclist: Motorcyclist): void {
    motorcyclist.TakeMotorcyclist();
  }

  public TakeBackMotorcyclist(motorcyclist: Motorcyclist): void {
    motorcyclist.TakeBackMotorcyclist();
  }
}
