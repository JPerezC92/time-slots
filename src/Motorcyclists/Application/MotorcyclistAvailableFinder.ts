import { UseCase } from 'src/Shared/Domain/UseCase';
import { MotorcyclistAvailableService } from '../Domain/MotorcyclistAvailableService';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { Motorcyclist } from '../Domain/Motorcyclist';

export class MotorcyclistAvailableFinder
  implements UseCase<Promise<Motorcyclist>>
{
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _motorcyclistAvailableService: MotorcyclistAvailableService;

  constructor(props: { motorcyclistRepository: MotorcyclistRepository }) {
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._motorcyclistAvailableService = new MotorcyclistAvailableService();
  }

  public async execute(): Promise<Motorcyclist> {
    const motorcyclistCollection = await this._motorcyclistRepository.findAll();

    const motorcyclist =
      this._motorcyclistAvailableService.SearchAvailableWithLessWorkload(
        motorcyclistCollection
      );

    return motorcyclist;
  }
}
