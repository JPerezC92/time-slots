import { UseCase } from "src/Shared/Domain/UseCase";
import { MotorcyclistRepository } from "../Domain/MotorcyclistRepository";
import { Motorcyclist } from "../Domain/Motorcyclists";

export interface MotorcyclistAvailableFinderOutput<Presenter> {
  show(motorcyclist: Motorcyclist): Presenter;
}

export class MotorcyclistAvailableFinder<Presenter>
  implements UseCase<Promise<Presenter>>
{
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _presenter: MotorcyclistAvailableFinderOutput<Presenter>;

  constructor(props: {
    motorcyclistRepository: MotorcyclistRepository;
    presenter: MotorcyclistAvailableFinderOutput<Presenter>;
  }) {
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._presenter = props.presenter;
  }

  async execute(): Promise<Presenter> {
    const motorcyclist = await this._motorcyclistRepository.findOneAvailable();
    return this._presenter.show(motorcyclist);
  }
}
