import { FC } from 'react';
import { useGetMotorcyclistAvailableCount } from '../../controllers/useGetMotorcyclistAvailableCount';

export const MotorcyclistAvailableCounter: FC = () => {
  const { count, isLoading, refetch } = useGetMotorcyclistAvailableCount();

  return (
    <div>
      <h1>motorcyclistAvailableCount {!isLoading && count} </h1>
      <button onClick={() => refetch()}> c</button>
    </div>
  );
};
