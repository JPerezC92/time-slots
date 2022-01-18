import { FC, useEffect } from 'react';
import { useGetMotorcyclistAvailableCount } from '../../controllers/useGetMotorcyclistAvailableCount';
import { useMotorcyclistViewStore } from '../../useMotorcyclistStore';

export const MotorcyclistAvailableCounter: FC = () => {
  const motorcyclistViewState = useMotorcyclistViewStore();
  const { isLoading, run } = useGetMotorcyclistAvailableCount();

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <h1>
        motorcyclistAvailableCount {!isLoading && motorcyclistViewState.count}{' '}
      </h1>
      <button onClick={() => run()}> c</button>
    </div>
  );
};
