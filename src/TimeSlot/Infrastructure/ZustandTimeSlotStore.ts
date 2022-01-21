import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import { TimeSlot } from '../Domain/TimeSlot';
import { TimeSlotStore } from '../Domain/TimeSlotStore';

interface TimeSlotViewStore {
  timeSlotCollection: TimeSlot[];
}

const useTimeSlotMergedStore = create<TimeSlotViewStore & TimeSlotStore>(
  (set) => ({
    timeSlotCollection: [],
    setTimeSlotCollection: (timeSlotCollection: TimeSlot[]) =>
      set({ timeSlotCollection }),
  })
);

export const useZustandTimeSlotStore: () => TimeSlotStore = () => {
  const timeSlotStore = useTimeSlotMergedStore<TimeSlotStore>(
    useCallback(
      (state) => ({ setTimeSlotCollection: state.setTimeSlotCollection }),
      []
    ),
    shallow
  );
  return timeSlotStore;
};

export const useTimeSlotViewStore: () => TimeSlotViewStore = () => {
  const timeSlotViewStore = useTimeSlotMergedStore<TimeSlotViewStore>(
    useCallback(
      (state) => ({ timeSlotCollection: state.timeSlotCollection }),
      []
    ),
    shallow
  );
  return timeSlotViewStore;
};
