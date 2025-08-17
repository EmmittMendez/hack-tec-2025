import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  registerUser: (data) =>
    set(() => ({
      user: {
        id: null,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        state: "",
        educationLevel: "",
      },
    })),

  // Simulación de login (puedes adaptarlo a tu backend)
  loginUser: (email, password) =>
    set((state) => {
      if (
        state.user &&
        state.user.email === email &&
        state.user.password === password
      ) {
        return { isAuthenticated: true };
      }
      return { isAuthenticated: false };
    }),

  logoutUser: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),

  setLoading: (loading) => {
    set(() => ({
      loading: true,
    }));
  },
}));

export default useUserStore;
