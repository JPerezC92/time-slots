import { FC, useEffect } from 'react';

import { useMotorcyclistAvailableCounter } from '../../controllers/useMotorcyclistAvailableCounter';
import { useMotorcyclistViewStore } from '../../useMotorcyclistStore';

export const MotorcyclistAvailableCounter: FC = () => {
  const motorcyclistViewState = useMotorcyclistViewStore();
  const { isLoading, run } = useMotorcyclistAvailableCounter();

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <h1>
        motorcyclistAvailableCount {!isLoading && motorcyclistViewState.count}{' '}
      </h1>
    </div>
  );
};
