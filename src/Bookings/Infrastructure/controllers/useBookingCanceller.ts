import { useCallback, useRef, useState } from 'react';

import { BookingCanceller } from '@Bookings/Application/BookingCanceller';
import { JsTokenCookieService } from '@Auth/Infrastructure/JsTokenCookieService';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { NestJSMotorcyclistRepository } from '@Motorcyclists/Infrastructure/NestJSMotorcyclistRepository';
import { NestJSTimeSlotRepository } from '@TimeSlots/Infrastructure/NestJSTimeSlotRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';
import { useBookingMergerStore } from '../ZustandBookingStore';
import { useMotorcyclistMergedStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';
import { useTimeSlotMergedStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';

export const useBookingCanceller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeSlotStore = useRef(useTimeSlotMergedStore());
  const bookingStore = useRef(useBookingMergerStore());
  const motorcyclistStore = useRef(useMotorcyclistMergedStore());
  const authStore = useRef(useAuthMergedStore());

  const run = useCallback(async ({ timeSlotId }: { timeSlotId: string }) => {
    setIsLoading(() => true);

    const bookingCanceller = BookingCanceller({
      authStore: authStore.current,
      bookingRepository: NestJSBookingRepository(),
      bookingStore: bookingStore.current,
      motorcyclistRepository: NestJSMotorcyclistRepository(),
      motorcyclistStore: motorcyclistStore.current,
      timeSlotRepository: NestJSTimeSlotRepository(),
      timeSlotStore: timeSlotStore.current,
      tokenCookieService: JsTokenCookieService(),
    });

    await bookingCanceller.execute({ timeSlotId });

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
