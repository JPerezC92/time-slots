import { useCallback, useEffect, useState } from 'react';

import { BookingCreator } from 'src/Bookings/Application/BookingCreator';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { FirestoreBookingRepository } from '../FirestoreBookingRepository';
import { FirestoreCustomerRepository } from 'src/Customers/Infrastructure/FirestoreCustomerRepository';
import { FirestoreMotorcyclistRepository } from 'src/Motorcyclists/Infrastructure/FirestoreMotorcyclistRepository';
import { FirestoreTimeSlotRepository } from 'src/TimeSlot/Infrastructure/FirestoreTimeSlotRepository';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';
import { useZustandMotorcyclistStore } from 'src/Motorcyclists/Infrastructure/useMotorcyclistStore';
import { useZustandTimeSlotStore } from 'src/TimeSlot/Infrastructure/ZustandTimeSlotStore';

export const useTimeSlotBooker = ({ timeSlot }: { timeSlot: TimeSlot }) => {
  const [isLoading, setIsLoading] = useState(false);
  const motorcyclistStore = useZustandMotorcyclistStore();
  const timeSlotStore = useZustandTimeSlotStore();

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      if (isLoading && !timeSlot.isBooked) {
        const bookingCreator = new BookingCreator({
          motorcyclistRepository: new FirestoreMotorcyclistRepository(),
          customerRepository: new FirestoreCustomerRepository(),
          bookingRepository: new FirestoreBookingRepository(),
          timeSlotRepository: new FirestoreTimeSlotRepository(),
          motorcyclistStore,
          timeSlotStore,
        });

        await bookingCreator.execute({
          customerId: new CustomerId('heEjzI8X1OhuoKHonAMe'),
          timeSlot,
        });
      }
      setIsLoading(false);
    })();
  }, [isLoading, motorcyclistStore, timeSlot, timeSlotStore]);

  return {
    run,
    isLoading,
  };
};
