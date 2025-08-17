import { create } from 'zustand';

const useStore = create((set, get) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export default useStore;
