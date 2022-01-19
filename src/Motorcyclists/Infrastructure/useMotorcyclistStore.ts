import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { MotorcyclistStore } from '../Domain/MotorcyclistStore';

interface MotorcyclistViewStore {
  count: number;
}

const useMotorcyclistMergedStore = create<
  MotorcyclistViewStore & MotorcyclistStore
>((set) => ({
  count: 0,
  updateCount: (number) => set({ count: number }),
}));

export const useMotorcyclistViewStore: () => MotorcyclistViewStore = () => {
  const motorcyclisViewtStore =
    useMotorcyclistMergedStore<MotorcyclistViewStore>(
      useCallback((state) => ({ count: state.count }), []),
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
