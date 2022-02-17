import { AuthStore } from '@Auth/Domain/AuthStore';
import { BookingFinder } from '@Bookings/Application/BookingFinder';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { Logout } from '@Auth/Application/Logout';
import { MotorcyclistFinder } from '@Motorcyclists/Application/MotorcyclistFinder';
import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistStore } from '@Motorcyclists/Domain/MotorcyclistStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const BookingCanceller: (props: {
  authStore: AuthStore;
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
  motorcyclistRepository: MotorcyclistRepository;
  motorcyclistStore: MotorcyclistStore;
  timeSlotRepository: TimeSlotRepository;
  timeSlotStore: TimeSlotStore;
}) => UseCase<Promise<void>, { timeSlotId: string }> = ({
  authStore,
  bookingRepository,
  bookingStore,
  motorcyclistRepository,
  motorcyclistStore,
  timeSlotRepository,
  timeSlotStore,
}) => {
  const timeSlotFinder = TimeSlotFinder({ timeSlotRepository, timeSlotStore });
  const bookingFinder = BookingFinder({ bookingRepository, bookingStore });
  const motorcyclistFinder = MotorcyclistFinder({
    motorcyclistRepository,
    motorcyclistStore,
  });

  const logout = Logout({ authStore });

  return {
    execute: async ({ timeSlotId }): Promise<void> => {
      const token = authStore.tokenExists();

      if (!token) return logout.execute();

      const booking = bookingStore.findByTimeSlotId({ timeSlotId });

      if (!booking) return;

      const result = await bookingRepository.delete(booking.id);

      if (result.status !== ResultStatus.SUCCESS) return;

      await Promise.all([
        timeSlotFinder.execute(),
        bookingFinder.execute(),
        motorcyclistFinder.execute(),
      ]);
    },
  };
};
