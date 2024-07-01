import create from 'zustand';

interface AuthState {
  auth: {
    role: string | null;
  };
  setRole: (role: string) => void;
  clearRole: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  auth: {
    role: null, // Initial role can be null to signify no role set
  },
  setRole: (role) => set((state) => ({ auth: { ...state.auth, role } })),
  clearRole: () => set((state) => ({ auth: { ...state.auth, role: null } }))
}));

export default useAuthStore;
