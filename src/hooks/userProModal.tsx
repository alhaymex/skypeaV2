import { create } from "zustand";

interface ProModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useProModal = create<ProModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default useProModal;
