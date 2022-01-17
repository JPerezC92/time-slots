import { Motorcyclist } from "./Motorcyclists";

export class MotorcyclistCounter {
  private readonly _motorcyclistCollection: Motorcyclist[];
  constructor(props: { motorcyclistCollection: Motorcyclist[] }) {
    this._motorcyclistCollection = props.motorcyclistCollection;
  }

  public availableCount(): number {
    return this._motorcyclistCollection.filter(
      (motorcyclist) => motorcyclist.isAvailable
    ).length;
  }
}
