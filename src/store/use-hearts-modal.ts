import { create } from "zustand";

type HeartsModalState = {
  isOpen: boolean;
};

type HeartsModalActions = {
  open: () => void;
  close: () => void;
};

type HeartsModalStore = HeartsModalState & HeartsModalActions;

const useHeartsModal = create<HeartsModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export { useHeartsModal };
