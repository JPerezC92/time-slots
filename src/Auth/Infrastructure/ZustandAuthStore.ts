import { signInWithPopup, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { AuthStore } from '../Domain/AuthStore';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import {
  googleAuth,
  googleAuthProvider,
} from 'src/Shared/Infrastructure/firebase';
import { IsLoggedIn } from 'src/Customers/Domain/IsLoggedIn';

export interface AuthViewStore {
  customer: Customer;
}

const guest = new Customer({
  customerId: new CustomerId(''),
  customerName: new CustomerName('Guest'),
  isLoggedIn: new IsLoggedIn(false),
});

export const useAuthMergedStore = create<AuthStore & AuthViewStore>((set) => ({
  customer: guest,
  updateCredentials: ({ id, username }) =>
    set({
      customer: new Customer({
        customerId: new CustomerId(id),
        customerName: new CustomerName(username),
        isLoggedIn: new IsLoggedIn(true),
      }),
    }),
  logout: () => signOut(googleAuth).then(() => set({ customer: guest })),
  login: async () => {
    signInWithPopup(googleAuth, googleAuthProvider).catch(() =>
      console.log('login error')
    );
  },
}));

export const useZustandAuthStore: () => AuthStore = () => {
  const authStore = useAuthMergedStore(
    useCallback(
      (state) => ({
        login: state.login,
        logout: state.logout,
        updateCredentials: state.updateCredentials,
      }),
      []
    ),
    shallow
  );
  return authStore;
};

export const useAuthViewStore: () => AuthViewStore = () => {
  const authViewStore = useAuthMergedStore(
    useCallback((state) => ({ customer: state.customer }), []),
    shallow
  );
  return authViewStore;
};
