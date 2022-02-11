import { useCallback, useRef, useState } from 'react';

import { BookingCreator } from '@Bookings/Application/BookingCreator';
import { DomainException } from '@Shared/Domain/DomainException';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { NestJSMotorcyclistRepository } from '@Motorcyclists/Infrastructure/NestJSMotorcyclistRepository';
import { NestJSTimeSlotRepository } from '@TimeSlots/Infrastructure/NestJSTimeSlotRepository';
import { useAlertStore } from '@UI/Alert/Alert';
import { useMotorcyclistMergedStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';
import { useTimeSlotMergedStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';
import { useBookingMergerStore } from '../ZustandBookingStore';

export const useBookingCreator = () => {
  const { addAlert } = useAlertStore();
  const bookingStore = useRef(useBookingMergerStore());
  const motorcyclistStore = useRef(useMotorcyclistMergedStore());
  const timeSlotStore = useRef(useTimeSlotMergedStore());

  const [error, setError] = useState<DomainException>();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async ({ timeSlotId }: { timeSlotId: string }) => {
    setIsLoading(() => true);

    const bookingCreator = BookingCreator({
      bookingRepository: NestJSBookingRepository(),
      bookingStore: bookingStore.current,
      motorcyclistRepository: NestJSMotorcyclistRepository(),
      motorcyclistStore: motorcyclistStore.current,
      timeSlotRepository: NestJSTimeSlotRepository(),
      timeSlotStore: timeSlotStore.current,
    });

    await bookingCreator.execute({ timeSlotId });

    setIsLoading(() => false);
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     addAlert({ status: 'error', message: error.message });
  //     setError(() => undefined);
  //   }
  // }, [addAlert, error]);

  // useEffect(() => {
  //   return () => setIsLoading(() => false);
  // }, []);

  return {
    isLoading,
    run,
  };
};
