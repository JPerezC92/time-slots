import { useCallback, useEffect, useRef, useState } from 'react';

import { MotorcyclistFinder } from '@Motorcyclists/Application/MotorcyclistFinder';
import { NestJSMotorcyclistRepository } from '@Motorcyclists/Infrastructure/NestJSMotorcyclistRepository';
import { useMotorcyclistMergedStore } from '@Motorcyclists/Infrastructure/useMotorcyclistStore';

export const useMotorcyclistFinder = () => {
  const motorcyclistMergedStore = useRef(useMotorcyclistMergedStore());
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => {
    setIsLoading(() => true);
    const motorcyclistFinder = MotorcyclistFinder({
      motorcyclistRepository: NestJSMotorcyclistRepository(),
      motorcyclistStore: motorcyclistMergedStore.current,
    });

    motorcyclistFinder.execute();
    setIsLoading(() => false);
  }, []);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return { isLoading, run };
};
