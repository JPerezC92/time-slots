import { useCallback, useEffect, useState } from 'react';

import { FirestoreTimeSlotRepository } from '../FirestoreTimeSlotRepository';
import { TimeSlotFinder } from 'src/TimeSlot/Application/TimeSlotFinder';
import { useZustandTimeSlotStore } from '../ZustandTimeSlotStore';
import { FirestoreBookingRepository } from 'src/Bookings/Infrastructure/FirestoreBookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';

export const useFindTimeSlots = () => {
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

        await timeSlotFinder.execute({
          customer: new Customer({
            customerId: new CustomerId('heEjzI8X1OhuoKHonAMe'),
            customerName: new CustomerName('Philip'),
          }),
        });

        setIsLoading(() => false);
      }
    })();
  }, [isLoading, timeSlotStore]);

  return {
    isLoading,
    run,
  };
};
