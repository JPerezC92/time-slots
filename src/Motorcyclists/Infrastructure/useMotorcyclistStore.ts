import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';
import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { MotorcyclistStore } from '../Domain/MotorcyclistStore';

interface MotorcyclistViewStore {
  motorcyclistList: Motorcyclist[];
  count: number;
}

export const useMotorcyclistMergedStore = create<
  MotorcyclistViewStore & MotorcyclistStore
>((set) => ({
  motorcyclistList: [],
  count: 0,
  updateCount: (number) => set({ count: number }),
  save: (motorcyclistList) => set({ motorcyclistList }),
}));

export const useMotorcyclistViewStore: () => MotorcyclistViewStore = () => {
  const motorcyclisViewtStore =
    useMotorcyclistMergedStore<MotorcyclistViewStore>(
      useCallback(
        (state) => ({
          count: state.count,
          motorcyclistList: state.motorcyclistList,
        }),
        []
      ),
      shallow
    );
  return motorcyclisViewtStore;
};

export const useZustandMotorcyclistStore: () => MotorcyclistStore = () => {
  const motorcyclistStore = useMotorcyclistMergedStore<MotorcyclistStore>(
    useCallback((state) => ({ updateCount: state.updateCount }), []),
    shallow
  );
  return motorcyclistStore;
};
