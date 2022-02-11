import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerRepository } from 'src/Customers/Domain/CustomerRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { UseCase } from 'src/Shared/Domain/UseCase';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { MotorcyclistAvailableFinder } from 'src/Motorcyclists/Application/MotorcyclistAvailableFinder';
import { TimeSlotAlreadyBooked } from '@TimeSlots/Domain/TimeSlotAlreadyBooked';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { MotorcyclistFinder } from '@Motorcyclists/Application/MotorcyclistFinder';
import { BookingFinder } from './BookingFinder';
import { BookingStore } from '@Bookings/Domain/BookingStore';

interface Input {
  timeSlotId: string;
}

export const BookingCreator: (props: {
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
  motorcyclistRepository: MotorcyclistRepository;
  motorcyclistStore: MotorcyclistStore;
  timeSlotRepository: TimeSlotRepository;
  timeSlotStore: TimeSlotStore;
}) => UseCase<Promise<void>, Input> = ({
  bookingRepository,
  bookingStore,
  motorcyclistRepository,
  motorcyclistStore,
  timeSlotRepository,
  timeSlotStore,
}) => {
  const bookingFinder = BookingFinder({ bookingRepository, bookingStore });
  const motorcyclistFinder = MotorcyclistFinder({
    motorcyclistRepository,
    motorcyclistStore,
  });
  const timeSlotFinder = TimeSlotFinder({ timeSlotRepository, timeSlotStore });

  return {
    execute: async ({ timeSlotId }) => {
      const result = await bookingRepository.save({ timeSlotId });

      if (result.status === ResultStatus.FAIL) {
        await Promise.all([
          motorcyclistFinder.execute(),
          timeSlotFinder.execute(),
        ]);
      }

      if (result.status === ResultStatus.SUCCESS) {
        await Promise.all([
          bookingFinder.execute(),
          motorcyclistFinder.execute(),
          timeSlotFinder.execute(),
        ]);
      }
    },
  };
};
