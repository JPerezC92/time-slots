import { BookingFinder } from '@Bookings/Application/BookingFinder';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { TimeSlotStore } from '@TimeSlots/Domain/TimeSlotStore';
import { UseCase } from '@Shared/Domain/UseCase';

export const BookingCanceller: (props: {
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
  timeSlotRepository: TimeSlotRepository;
  timeSlotStore: TimeSlotStore;
}) => UseCase<Promise<void>, { timeSlotId: string }> = ({
  bookingRepository,
  bookingStore,
  timeSlotRepository,
  timeSlotStore,
}) => {
  const timeSlotFinder = TimeSlotFinder({ timeSlotRepository, timeSlotStore });
  const bookingFinder = BookingFinder({ bookingRepository, bookingStore });

  return {
    execute: async ({ timeSlotId }): Promise<void> => {
      const booking = bookingStore.findByTimeSlotId({ timeSlotId });

      if (!booking) return;

      const result = await bookingRepository.delete(booking.id);

      if (result.status !== ResultStatus.SUCCESS) return;

      await Promise.all([timeSlotFinder.execute(), bookingFinder.execute()]);
    },
  };
};
