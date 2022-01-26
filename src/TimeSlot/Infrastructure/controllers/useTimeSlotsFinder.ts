import { useCallback, useEffect, useState } from 'react';

import { Customer } from 'src/Customers/Domain/Customer';
import { FirestoreBookingRepository } from 'src/Bookings/Infrastructure/FirestoreBookingRepository';
import { FirestoreTimeSlotRepository } from '../FirestoreTimeSlotRepository';
import { TimeSlotFinder } from 'src/TimeSlot/Application/TimeSlotFinder';
import { useZustandTimeSlotStore } from '../ZustandTimeSlotStore';

export const useTimeSlotsFinder = ({ customer }: { customer: Customer }) => {
  const timeSlotStore = useZustandTimeSlotStore();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
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

  return {
    isLoading,
    run,
  };
};
