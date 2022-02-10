import { Booking } from '@Bookings/Domain/Booking';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';

export const BookingFinder: (props: {
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
}) => UseCase<Promise<void>> = ({ bookingRepository, bookingStore }) => {
  return {
    execute: async () => {
      const result = await bookingRepository.findAllByCustomer();

      if (result.status === ResultStatus.SUCCESS) {
        const bookingList = result.data.bookings.map(Booking.fromPlain);
        bookingStore.saveBookingList(bookingList);
      }
    },
  };
};
