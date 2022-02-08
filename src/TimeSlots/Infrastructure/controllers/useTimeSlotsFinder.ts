import { useCallback, useEffect, useRef, useState } from 'react';

import { TimeSlotFinder } from '@TimeSlots/Application/TimeSlotFinder';
import { NestJSTimeSlotRepository } from '@TimeSlots/Infrastructure/NestJSTimeSlotRepository';
import { useTimeSlotMergedStore } from '@TimeSlots/Infrastructure/ZustandTimeSlotStore';

export const useTimeSlotsFinder = () => {
  const timeSlotStore = useRef(useTimeSlotMergedStore());
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async () => {
    setIsLoading(() => true);
    const timeSlotFinder = TimeSlotFinder({
      timeSlotRepository: NestJSTimeSlotRepository(),
      timeSlotStore: timeSlotStore.current,
    });

    await timeSlotFinder.execute();

    setIsLoading(() => false);
  }, []);

  useEffect(() => {
    return () => setIsLoading(() => false);
  }, []);

  return {
    isLoading,
    run,
  };
};
