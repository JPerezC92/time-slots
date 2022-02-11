import { useCallback, useEffect, useRef, useState } from 'react';

import { BookingCanceller } from '@Bookings/Application/BookingCanceller';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { NestJSTimeSlotRepository } from '@TimeSlots/Infrastructure/NestJSTimeSlotRepository';
import { useTimeSlotMergedStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';
import { useBookingMergerStore } from '../ZustandBookingStore';
import { useMotorcyclistMergedStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';
import { NestJSMotorcyclistRepository } from '@Motorcyclists/Infrastructure/NestJSMotorcyclistRepository';

export const useBookingCanceller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeSlotStore = useRef(useTimeSlotMergedStore());
  const bookingStore = useRef(useBookingMergerStore());
  const motorcyclistStore = useRef(useMotorcyclistMergedStore());

  const run = useCallback(async ({ timeSlotId }: { timeSlotId: string }) => {
    setIsLoading(() => true);

    const bookingCanceller = BookingCanceller({
      bookingRepository: NestJSBookingRepository(),
      bookingStore: bookingStore.current,
      motorcyclistRepository: NestJSMotorcyclistRepository(),
      motorcyclistStore: motorcyclistStore.current,
      timeSlotRepository: NestJSTimeSlotRepository(),
      timeSlotStore: timeSlotStore.current,
    });

    await bookingCanceller.execute({ timeSlotId });

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
