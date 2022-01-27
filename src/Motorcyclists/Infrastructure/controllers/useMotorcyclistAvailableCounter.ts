import { useCallback, useEffect, useState } from 'react';

import { FirestoreMotorcyclistRepository } from '../FirestoreMotorcyclistRepository';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { useZustandMotorcyclistStore } from '../useMotorcyclistStore';

export const useMotorcyclistAvailableCounter = () => {
  const motorcyclistStore = useZustandMotorcyclistStore();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => setIsLoading(true), []);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const motorcyclistRepository = new FirestoreMotorcyclistRepository();
        const motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
          motorcyclistRepository,
          motorcyclistStore,
        });

        await motorcyclistAvailableCounter.execute();

        setIsLoading(false);
      }
    })();
  }, [isLoading, motorcyclistStore]);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return { isLoading, run };
};
