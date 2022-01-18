import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { CustomerId } from './CustomerId';
import { CustomerName } from './CustomerName';

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

  public TakeMotorcyclist(motorcyclist: Motorcyclist): void {
    motorcyclist.TakeMotorcyclist();
  }

  public TakeBackMotorcyclist(motorcyclist: Motorcyclist): void {
    motorcyclist.TakeBackMotorcyclist();
  }
}
