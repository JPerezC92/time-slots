import { MotorcyclistId } from './MotorcyclistId';
import { MotorcyclistIsAvailable } from './MotorcyclistIsAvailable';
import { MotorcyclistPlain } from './MotorcyclistPlain';

export class Motorcyclist {
  private readonly _maxWorkLoad = 3;
  private readonly _motorcyclistId: MotorcyclistId;
  private readonly _isAvailable: MotorcyclistIsAvailable;

  public get id(): string {
    return this._motorcyclistId.value;
  }
  public get isAvailable(): boolean {
    return this._isAvailable.value;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    isAvailable: MotorcyclistIsAvailable;
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this._isAvailable = props.isAvailable;
  }

  public static fromPlain(object: MotorcyclistPlain): Motorcyclist {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(object.id),
      isAvailable: new MotorcyclistIsAvailable(object.isAvailable),
    });
  }

  toPlain(): MotorcyclistPlain {
    return {
      id: this._motorcyclistId.value,
      isAvailable: this._isAvailable.value,
    };
  }
}
