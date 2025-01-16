import { atom, useAtom } from 'jotai';

const modalOpenAtom = atom(true);

export function useModalStore() {
  const [isOpen, setIsOpen] = useAtom(modalOpenAtom);

  const closeAllModals = () => {
    setIsOpen(false);
  };

  const openModals = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    closeAllModals,
    openModals,
  };
}