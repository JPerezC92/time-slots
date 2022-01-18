import { useCallback, useEffect, useState } from 'react';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { FirestoreCustomerRepository } from 'src/Customers/Infrastructure/FirestoreCustomerRepository';
import { FirestoreMotorcyclistRepository } from 'src/Motorcyclists/Infrastructure/FirestoreMotorcyclistRepository';
import { useZustandMotorcyclistStore } from 'src/Motorcyclists/Infrastructure/useMotorcyclistStore';
import { BookingCreator } from 'src/Bookings/Application/BookingCreator';
import { FirestoreBookingRepository } from '../FirestoreBookingRepository';

export const useBookMotorcyclist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const motorcyclistStore = useZustandMotorcyclistStore();

  const run = useCallback(() => setIsLoading(() => true), []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const bookingCreator = new BookingCreator({
          motorcyclistRepository: new FirestoreMotorcyclistRepository(),
          customerRepository: new FirestoreCustomerRepository(),
          bookingRepository: new FirestoreBookingRepository(),
          motorcyclistState: motorcyclistStore,
        });

        await bookingCreator.execute({
          customerId: new CustomerId('heEjzI8X1OhuoKHonAMe'),
        });

        setIsLoading(false);
      }
    })();
  }, [isLoading, motorcyclistStore]);

  return {
    run,
    isLoading,
  };
};
