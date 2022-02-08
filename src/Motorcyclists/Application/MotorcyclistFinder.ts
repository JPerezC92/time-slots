import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';
import { MotorcyclistStore } from '@Motorcyclists/Domain/MotorcyclistStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';

export const MotorcyclistFinder: (props: {
  motorcyclistRepository: MotorcyclistRepository;
  motorcyclistStore: MotorcyclistStore;
}) => UseCase<void> = ({ motorcyclistRepository, motorcyclistStore }) => {
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
    },
  };
};
