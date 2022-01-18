import { MotorcyclistAvailableFinder } from 'src/Motorcyclists/Application/MotorcyclistAvailableFinder';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { UseCase } from 'src/Shared/Domain/UseCase';
import { Customer } from '../Domain/Customer';

export interface TakeMotorcyclistOutput<Presenter> {
  show(props: { motorcyclist: Motorcyclist }): Presenter;
}

export interface TakeMotorcyclistInputPort {
  customer: Customer;
}

export class TakeMotorcyclist<Presenter>
  implements UseCase<Promise<Presenter>, TakeMotorcyclistInputPort>
{
  private readonly _motorcyclistRepository: MotorcyclistRepository;
  private readonly _presenter: TakeMotorcyclistOutput<Presenter>;

  private readonly _motorcyclistAvailableFinder: MotorcyclistAvailableFinder<Motorcyclist>;

  constructor(props: {
    motorcyclistRepository: MotorcyclistRepository;
    presenter: TakeMotorcyclistOutput<Presenter>;
  }) {
    this._motorcyclistRepository = props.motorcyclistRepository;
    this._presenter = props.presenter;

    this._motorcyclistAvailableFinder = new MotorcyclistAvailableFinder({
      motorcyclistRepository: this._motorcyclistRepository,
      presenter: { show: (motorcyclist) => motorcyclist },
    });
  }

  async execute({ customer }: TakeMotorcyclistInputPort): Promise<Presenter> {
    const motorcyclist = await this._motorcyclistAvailableFinder.execute();

    customer.TakeMotorcyclist(motorcyclist);

    return this._presenter.show({ motorcyclist });
  }
}
