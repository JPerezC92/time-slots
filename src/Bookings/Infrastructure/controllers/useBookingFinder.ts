import { useCallback, useRef, useState } from 'react';

import { useBookingMergerStore } from '@Bookings/Infrastructure/ZustandBookingStore';
import { BookingFinder } from '@Bookings/Application/BookingFinder';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';

export const useBookingFinder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const bookingStore = useRef(useBookingMergerStore());

  const run = useCallback(() => {
    setIsLoading(() => true);
    const bookingFinder = BookingFinder({
      bookingRepository: NestJSBookingRepository(),
      bookingStore: bookingStore.current,
    });

    bookingFinder.execute();

    setIsLoading(() => false);
  }, []);

  return {
    isLoading,
    run,
  };
};
