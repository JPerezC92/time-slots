import { MotorcyclistId } from "./MotorcyclistId";
import { MotorcyclistIsAvailable } from "./MotorcyclistIsAvailable";

export class Motorcyclist {
  private readonly _motorcyclistId: MotorcyclistId;
  private _isAvailable: MotorcyclistIsAvailable;

  public get id(): string {
    return this._motorcyclistId.value;
  }

  public get isAvailable(): boolean {
    return this._isAvailable.value;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    available: MotorcyclistIsAvailable;
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this._isAvailable = props.available;
  }

  public TakeMotorcyclist() {
    this._isAvailable = this._isAvailable.Take();
  }

  public TakeBackMotorcyclist() {
    this._isAvailable = this._isAvailable.TakeBack();
  }
}
