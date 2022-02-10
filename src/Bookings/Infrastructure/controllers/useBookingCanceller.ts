import { useCallback, useEffect, useRef, useState } from 'react';

import { BookingCanceller } from '@Bookings/Application/BookingCanceller';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { NestJSTimeSlotRepository } from '@TimeSlots/Infrastructure/NestJSTimeSlotRepository';
import { useTimeSlotMergedStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';
import { useBookingMergerStore } from '../ZustandBookingStore';

export const useBookingCanceller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeSlotStore = useRef(useTimeSlotMergedStore());
  const bookingStore = useRef(useBookingMergerStore());

  const run = useCallback(async ({ timeSlotId }: { timeSlotId: string }) => {
    setIsLoading(() => true);
    const bookingCanceller = BookingCanceller({
      bookingRepository: NestJSBookingRepository(),
      timeSlotRepository: NestJSTimeSlotRepository(),
      timeSlotStore: timeSlotStore.current,
      bookingStore: bookingStore.current,
    });

    await bookingCanceller.execute({ timeSlotId });

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
