import { useCallback, useEffect, useRef, useState } from 'react';

import { FirestoreBookingRepository } from 'src/Bookings/Infrastructure/FirestoreBookingRepository';
import { FirestoreTimeSlotRepository } from '../FirestoreTimeSlotRepository';
import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { useAuthViewStore } from 'src/Auth/Infrastructure/ZustandAuthStore';
import { useZustandTimeSlotStore } from '../ZustandTimeSlotStore';

export const useTimeSlotsFinder = () => {
  const { customer } = useAuthViewStore();
  const timeSlotStore = useZustandTimeSlotStore();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        console.log('useTimeSlotsFinder');
        const timeSlotFinder = new TimeSlotFinder({
          timeSlotRepository: new FirestoreTimeSlotRepository(),
          bookingRepository: new FirestoreBookingRepository(),
          timeSlotStore,
        });
        await timeSlotFinder.execute({ customer });
        setIsLoading(() => false);
      }
    })();
  }, [customer, isLoading, timeSlotStore]);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return {
    isLoading,
    run,
  };
};
