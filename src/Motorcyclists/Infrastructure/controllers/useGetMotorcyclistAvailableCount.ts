import { useCallback, useEffect, useState } from 'react';

import { FirestoreMotorcyclistRepository } from '../FirestoreMotorcyclistRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { useZustandMotorcyclistStore } from '../useMotorcyclistStore';

export const useGetMotorcyclistAvailableCount = () => {
  const motorcyclistStore = useZustandMotorcyclistStore();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const getCount = async () => {
        const motorcyclistRepository = new FirestoreMotorcyclistRepository();
        const motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
          motorcyclistRepository,
          presenter: { show: (data) => data },
          motorcyclistStore,
        });

        await motorcyclistAvailableCounter.execute();

        setIsLoading(false);
      };

      getCount();
    }
  }, [isLoading, motorcyclistStore]);

  return { isLoading, run };
};
