import { atom, useAtom } from 'jotai';

interface AppState {
  isLoggedIn: boolean;
  showPreload: boolean;
  useDemoData: boolean | null;
}

const appStateAtom = atom<AppState>({
  isLoggedIn: false,
  showPreload: false,
  useDemoData: null,
});

export function useAppState() {
  const [state, setState] = useAtom(appStateAtom);

  const setLoggedIn = (value: boolean) => {
    setState(prev => ({ ...prev, isLoggedIn: value }));
  };

  const setShowPreload = (value: boolean) => {
    setState(prev => ({ ...prev, showPreload: value }));
  };

  const setUseDemoData = (value: boolean) => {
    setState(prev => ({ ...prev, useDemoData: value }));
  };

  return {
    ...state,
    setLoggedIn,
    setShowPreload,
    setUseDemoData,
  };
}