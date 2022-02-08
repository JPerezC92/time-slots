import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { UseCase } from '@Shared/Domain/UseCase';

export const TimeSlotFinder: (props: {
  timeSlotRepository: TimeSlotRepository;
  timeSlotStore: TimeSlotStore;
}) => UseCase<Promise<void>> = ({ timeSlotRepository, timeSlotStore }) => {
  return {
    execute: async (): Promise<void> => {
      const result = await timeSlotRepository.findAll();

      if (result.status !== ResultStatus.SUCCESS) {
        throw new Error('TimeSlotFinder: Error finding all time slots');
      }

      const timeSlotList = result.data.timeSlots.map(TimeSlot.fromPlain);

      timeSlotStore.setTimeSlotCollection(timeSlotList);
    },
  };
};
