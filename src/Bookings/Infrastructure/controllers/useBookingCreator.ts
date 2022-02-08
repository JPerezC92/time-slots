import { useCallback, useEffect, useRef, useState } from 'react';

import { BookingCreator } from 'src/Bookings/Application/BookingCreator';
import { Customer } from 'src/Customers/Domain/Customer';
import { DomainException } from 'src/Shared/Domain/DomainException';
import { FirestoreBookingRepository } from '../FirestoreBookingRepository';
import { FirestoreCustomerRepository } from 'src/Customers/Infrastructure/FirestoreCustomerRepository';
import { FirestoreMotorcyclistRepository } from 'src/Motorcyclists/Infrastructure/FirestoreMotorcyclistRepository';
import { FirestoreTimeSlotRepository } from '@TimeSlots/Infrastructure/FirestoreTimeSlotRepository';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { useAlertStore } from 'src/UI/Alert/Alert';
import { useZustandMotorcyclistStore } from 'src/Motorcyclists/Infrastructure/useMotorcyclistStore';
import { useZustandTimeSlotStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';
import { useAuthViewStore } from 'src/Auth/Infrastructure/ZustandAuthStore';

export const useBookingCreator = ({ timeSlotId }: { timeSlotId: string }) => {
  const { addAlert } = useAlertStore();
  const motorcyclistStore = useZustandMotorcyclistStore();
  const timeSlotStore = useZustandTimeSlotStore();
  const { customer } = useAuthViewStore();

  const [error, setError] = useState<DomainException>();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      try {
        if (isLoading && customer.isLoggedIn) {
          console.log('useBookingCreator');
          const bookingCreator = new BookingCreator({
            motorcyclistRepository: new FirestoreMotorcyclistRepository(),
            customerRepository: new FirestoreCustomerRepository(),
            bookingRepository: new FirestoreBookingRepository(),
            timeSlotRepository: new FirestoreTimeSlotRepository(),
            motorcyclistStore,
            timeSlotStore,
          });

          await bookingCreator.execute({ customer, timeSlotId: timeSlotId });
        }

        if (isLoading) setIsLoading(false);
      } catch (error) {
        if (DomainException.isDomainException(error)) {
          setError(() => error as DomainException);
        }

        if (isLoading) setIsLoading(false);
      }
    })();
  }, [customer, isLoading, motorcyclistStore, timeSlotId, timeSlotStore]);

  useEffect(() => {
    if (error) {
      addAlert({ status: 'error', message: error.message });
      setError(() => undefined);
    }
  }, [addAlert, error]);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
