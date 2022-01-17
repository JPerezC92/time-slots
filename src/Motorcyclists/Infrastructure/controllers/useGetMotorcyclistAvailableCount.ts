import { useEffect, useState } from 'react';
import { MotorcyclistAvailableCounter } from 'src/Motorcyclists/Application/MotorcyclistAvailableCounter';
import { FirestoreMotorcyclistRepository } from '../FirestoreMotorcyclistRepository';
import { useZustandMotorcyclistState } from '../ZustandMotorcyclistState';

export const useGetMotorcyclistAvailableCount = () => {
  const motorcyclistState = useZustandMotorcyclistState((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const refetch = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const getCount = async () => {
        const motorcyclistRepository = new FirestoreMotorcyclistRepository();
        const motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
          motorcyclistRepository,
          presenter: { show: (data) => data },
          motorcyclistState,
        });

        await motorcyclistAvailableCounter.execute();

        setIsLoading(false);
      };

      getCount();
    }
  }, [isLoading, motorcyclistState]);

  return { count: motorcyclistState.count, isLoading, refetch };
};
