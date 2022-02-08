import { FC, useEffect } from 'react';

import { useMotorcyclistFinder } from '@Motorcyclists/Infrastructure/controllers/useMotorcyclistAvailableCounter';
import { useMotorcyclistViewStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';

export const MotorcyclistAvailableCounter: FC = () => {
  const { isLoading, run } = useMotorcyclistFinder();
  const { motorcyclistList } = useMotorcyclistViewStore();

  const motorcyclistCount = motorcyclistList.filter(
    (m) => m.isAvailable
  ).length;

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <h1>Motorcyclistas disponibles: {!isLoading && motorcyclistCount} </h1>
    </div>
  );
};
