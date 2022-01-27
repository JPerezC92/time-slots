import { useCallback, useEffect, useRef, useState } from 'react';

import { BookingCanceller } from 'src/Bookings/Application/BookingCanceller';
import { Customer } from 'src/Customers/Domain/Customer';
import { FirestoreBookingRepository } from '../FirestoreBookingRepository';
import { FirestoreMotorcyclistRepository } from 'src/Motorcyclists/Infrastructure/FirestoreMotorcyclistRepository';
import { FirestoreTimeSlotRepository } from 'src/TimeSlot/Infrastructure/FirestoreTimeSlotRepository';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { useZustandMotorcyclistStore } from 'src/Motorcyclists/Infrastructure/useMotorcyclistStore';
import { useZustandTimeSlotStore } from 'src/TimeSlot/Infrastructure/ZustandTimeSlotStore';

export const useBookingCanceller = ({
  customer,
  timeSlotId,
}: {
  customer: Customer;
  timeSlotId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeSlotStore = useZustandTimeSlotStore();
  const motorcyclistStore = useZustandMotorcyclistStore();

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const bookingCanceller = new BookingCanceller({
          bookingRepository: new FirestoreBookingRepository(),
          motorcyclistRepository: new FirestoreMotorcyclistRepository(),
          timeSlotRepository: new FirestoreTimeSlotRepository(),
          timeSlotStore,
          motorcyclistStore,
        });

        await bookingCanceller.execute({
          customer,
          timeSlotId: timeSlotId,
        });

        setIsLoading(() => false);
      }
    })();
  }, [customer, isLoading, motorcyclistStore, timeSlotId, timeSlotStore]);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
