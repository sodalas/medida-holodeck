import { create } from 'zustand';

interface SessionState {
  isConnected: boolean;
  setConnected: (value: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isConnected: false,
  setConnected: (value) => set({ isConnected: value }),
}));
