import { MotorcyclistCounter } from '../Domain/MotorcyclistCounter';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { MotorcyclistStore } from '../Domain/MotorcyclistStore';
import { UseCase } from 'src/Shared/Domain/UseCase';

export class MotorcyclistAvailableCounter implements UseCase<Promise<void>> {
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistStore: MotorcyclistStore;

  constructor(props: {
    motorcyclistStore: MotorcyclistStore;
    motorcyclistRepository: MotorcyclistRepository;
  }) {
    this._motorcyclistStore = props.motorcyclistStore;
    this._motorcyclistRepository = props.motorcyclistRepository;
  }

  async execute(): Promise<void> {
    const motorcyclistCollection = await this._motorcyclistRepository.findAll();

    const motorcyclistCounter = new MotorcyclistCounter({
      motorcyclistCollection,
    });

    const count = motorcyclistCounter.availableCount();

    this._motorcyclistStore.updateCount(count);
  }
}
