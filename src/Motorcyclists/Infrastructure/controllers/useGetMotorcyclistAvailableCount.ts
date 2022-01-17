import { FC, useEffect, useState } from "react";
import { MotorcyclistAvailableCounter } from "src/Motorcyclists/Application/MotorcyclistAvailableCounter";
import { FirestoreMotorcyclistRepository } from "../FirestoreMotorcyclistRepository";

export const useGetMotorcyclistAvailableCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const motorcyclistRepository = new FirestoreMotorcyclistRepository();
      const motorcyclistAvailableCounter = new MotorcyclistAvailableCounter({
        motorcyclistRepository,
        presenter: { show: (data) => data },
      });

      const { count } = await motorcyclistAvailableCounter.execute();
      setCount(() => count);
    };

    getCount();
  }, []);

  return count;
};
