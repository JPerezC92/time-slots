import create from 'zustand';
import { MotorcyclistState } from '../Domain/MotorcyclistState';

export const useZustandMotorcyclistState = create<MotorcyclistState>((set) => ({
  count: 0,
  updateCount: (number) => set({ count: number }),
}));
