import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { MotorcyclistStore } from '@Motorcyclists/Domain/MotorcyclistStore';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';

interface MotorcyclistViewStore {
  motorcyclistList: Motorcyclist[];
  available: number;
}

export const useMotorcyclistMergedStore = create<
  MotorcyclistViewStore & MotorcyclistStore
>((set) => ({
  motorcyclistList: [],
  available: 0,
  updateCount: (number) => set({ available: number }),
  save: (motorcyclistList) => set({ motorcyclistList }),
}));

export const useMotorcyclistViewStore: () => MotorcyclistViewStore = () => {
  const motorcyclisViewtStore =
    useMotorcyclistMergedStore<MotorcyclistViewStore>(
      useCallback(
        (state) => ({
          available: state.available,
          motorcyclistList: state.motorcyclistList,
        }),
        []
      ),
      shallow
    );
  return motorcyclisViewtStore;
};
