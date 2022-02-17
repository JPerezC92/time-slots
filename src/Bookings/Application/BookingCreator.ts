import { AuthStore } from '@Auth/Domain/AuthStore';
import { BookingFinder } from '@Bookings/Application/BookingFinder';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { Logout } from '@Auth/Application/Logout';
import { MotorcyclistFinder } from '@Motorcyclists/Application/MotorcyclistFinder';
import { MotorcyclistRepository } from 'src/Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from 'src/Motorcyclists/Domain/MotorcyclistStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from 'src/Shared/Domain/UseCase';

interface Input {
  timeSlotId: string;
}

export const BookingCreator: (props: {
  authStore: AuthStore;
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
  motorcyclistRepository: MotorcyclistRepository;
  motorcyclistStore: MotorcyclistStore;
  timeSlotRepository: TimeSlotRepository;
  timeSlotStore: TimeSlotStore;
}) => UseCase<Promise<void>, Input> = ({
  authStore,
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

  const logout = Logout({ authStore });

  return {
    execute: async ({ timeSlotId }) => {
      const token = authStore.tokenExists();

      if (!token) return logout.execute();

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
