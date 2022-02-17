import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';
import { MotorcyclistStore } from '@Motorcyclists/Domain/MotorcyclistStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';
import { MotorcyclistService } from '@Motorcyclists/Domain/MotorcyclistCounter';

export const MotorcyclistFinder: (props: {
  motorcyclistRepository: MotorcyclistRepository;
  motorcyclistStore: MotorcyclistStore;
}) => UseCase<void> = ({ motorcyclistRepository, motorcyclistStore }) => {
  const motorcyclistService = new MotorcyclistService();

  return {
    execute: async () => {
      const result = await motorcyclistRepository.findAll();
      if (result.status !== ResultStatus.SUCCESS) {
        throw new Error('MotorcyclistFinder failed.');
      }

      const motorcyclistList = result.data.motorcyclists.map(
        Motorcyclist.fromPlain
      );

      motorcyclistStore.save(motorcyclistList);
      motorcyclistStore.updateCount(
        motorcyclistService.countAvailable(motorcyclistList)
      );
    },
  };
};
