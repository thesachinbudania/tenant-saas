import { create } from 'zustand';

type User = {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}
type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))

export default useUserStore;