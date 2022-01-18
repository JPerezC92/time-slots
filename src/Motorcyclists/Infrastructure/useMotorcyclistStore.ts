import create from 'zustand';
import shallow from 'zustand/shallow';

import { MotorcyclistStore } from '../Domain/MotorcyclistState';

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
      (state) => ({ count: state.count }),
      shallow
    );
  return motorcyclisViewtStore;
};

export const useZustandMotorcyclistStore: () => MotorcyclistStore = () => {
  const motorcyclistStore = useMotorcyclistMergedStore<MotorcyclistStore>(
    (state) => ({ updateCount: state.updateCount }),
    shallow
  );
  return motorcyclistStore;
};
