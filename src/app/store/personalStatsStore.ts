import { create } from 'zustand';

interface IPersonalStatsStore {
  previousWeight: number;
  currentWeight: { weight: number; weightDiff: number | null };
  hasFetched: boolean;
  setPreviousWeight: (weight: number) => void;
  setCurrentWeight: (curr: { weight: number; weightDiff: number }) => void;
  setHasFetched: (val: boolean) => void;
}

export const usePersonalStatsStore = create<IPersonalStatsStore>((set) => ({
  previousWeight: 0,
  currentWeight: { weight: 0, weightDiff: 0 },
  hasFetched: false,
  setPreviousWeight: (weight) => set({ previousWeight: weight }),
  setCurrentWeight: (curr) =>
    set({
      currentWeight: { weight: curr.weight, weightDiff: curr.weightDiff },
    }),
  setHasFetched: (val) => set({ hasFetched: val }),
}));
