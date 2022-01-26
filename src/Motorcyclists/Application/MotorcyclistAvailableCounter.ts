import { MotorcyclistCounter } from '../Domain/MotorcyclistCounter';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { MotorcyclistStore } from '../Domain/MotorcyclistStore';
import { UseCase } from 'src/Shared/Domain/UseCase';

export class MotorcyclistAvailableCounter implements UseCase<Promise<void>> {
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistStore: MotorcyclistStore;
  private readonly _motorcyclistCounter: MotorcyclistCounter;

  constructor(props: {
    motorcyclistStore: MotorcyclistStore;
    motorcyclistRepository: MotorcyclistRepository;
  }) {
    this._motorcyclistStore = props.motorcyclistStore;
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._motorcyclistCounter = new MotorcyclistCounter();
  }

  async execute(): Promise<void> {
    const motorcyclistCollection = await this._motorcyclistRepository.findAll();

    const count = this._motorcyclistCounter.availableCount(
      motorcyclistCollection
    );

    this._motorcyclistStore.updateCount(count);
  }
}
