import { UseCase } from 'src/Shared/Domain/UseCase';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { MotorcyclistCounter } from '../Domain/MotorcyclistCounter';
import { MotorcyclistStore } from '../Domain/MotorcyclistStore';

// interface MotorcyclistAvailableCounterOutput<Presenter> {
//   show(props: { count: number }): Presenter;
// }

export class MotorcyclistAvailableCounter implements UseCase<Promise<void>> {
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistStore: MotorcyclistStore;
  // private readonly _presenter: MotorcyclistAvailableCounterOutput<Presenter>;

  constructor(props: {
    motorcyclistStore: MotorcyclistStore;
    motorcyclistRepository: MotorcyclistRepository;
    // presenter: MotorcyclistAvailableCounterOutput<Presenter>;
  }) {
    this._motorcyclistStore = props.motorcyclistStore;
    this._motorcyclistRepository = props.motorcyclistRepository;
    // this._presenter = props.presenter;
  }

  async execute(): Promise<void> {
    const motorcyclistCollection = await this._motorcyclistRepository.findAll();

    const motorcyclistCounter = new MotorcyclistCounter({
      motorcyclistCollection,
    });

    const count = motorcyclistCounter.availableCount();

    this._motorcyclistStore.updateCount(count);

    // return this._presenter.show({ count });
  }
}
