import { atom, useAtom } from 'jotai';
import type { StoreData } from '../types';

const selectedStoreAtom = atom<StoreData | null>(null);

export function useStoreSelection() {
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  return {
    selectedStore,
    setSelectedStore,
  };
}