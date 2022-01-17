import { UseCase } from 'src/Shared/Domain/UseCase';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { MotorcyclistCounter } from '../Domain/MotorcyclistCounter';
import { MotorcyclistState } from '../Domain/MotorcyclistState';

interface MotorcyclistAvailableCounterOutput<Presenter> {
  show(props: { count: number }): Presenter;
}

export class MotorcyclistAvailableCounter<Presenter>
  implements UseCase<Promise<Presenter>>
{
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistState: MotorcyclistState;
  private readonly _presenter: MotorcyclistAvailableCounterOutput<Presenter>;

  constructor(props: {
    motorcyclistState: MotorcyclistState;
    motorcyclistRepository: MotorcyclistRepository;
    presenter: MotorcyclistAvailableCounterOutput<Presenter>;
  }) {
    this._motorcyclistState = props.motorcyclistState;
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._presenter = props.presenter;
  }

  async execute(): Promise<Presenter> {
    const motorcyclistCollection = await this._motorcyclistRepository.findAll();

    const motorcyclistCounter = new MotorcyclistCounter({
      motorcyclistCollection,
    });

    const count = motorcyclistCounter.availableCount();

    this._motorcyclistState.updateCount(count);

    return this._presenter.show({ count });
  }
}
