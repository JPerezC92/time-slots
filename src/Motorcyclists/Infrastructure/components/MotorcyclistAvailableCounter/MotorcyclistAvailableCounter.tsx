import { FC, useEffect } from 'react';

import { useMotorcyclistFinder } from '@Motorcyclists/Infrastructure/controllers/useMotorcyclistAvailableCounter';
import { useMotorcyclistViewStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';

export const MotorcyclistAvailableCounter: FC = () => {
  const { isLoading, run } = useMotorcyclistFinder();
  const { available } = useMotorcyclistViewStore();

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <h1>Motorcyclistas disponibles: {!isLoading && available} </h1>
    </div>
  );
};
