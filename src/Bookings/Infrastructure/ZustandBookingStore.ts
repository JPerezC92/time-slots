import create from 'zustand';

import { BookingStore } from '@Bookings/Domain/BookingStore';
import { Booking } from '@Bookings/Domain/Booking';

interface BookingViewStore {
  bookingList: Booking[];
}

export const useBookingMergerStore = create<BookingStore & BookingViewStore>(
  (set, get) => ({
    bookingList: [],
    saveBookingList: (bookingList) => set({ bookingList }),
    findByTimeSlotId: ({ timeSlotId }) =>
      get().bookingList.find((b) => b.timeSlotId.value === timeSlotId),
  })
);
