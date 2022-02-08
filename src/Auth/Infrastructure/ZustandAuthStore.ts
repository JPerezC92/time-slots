import { useCallback } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { AuthStore } from '@Auth/Domain/AuthStore';
import { Customer } from '@Customers/Domain/Customer';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { FirstName } from '@Customers/Domain/FirstName';
import {
  googleAuth,
  googleAuthProvider,
} from '@Shared/Infrastructure/firebase';
import { IsLoggedIn } from '@Customers/Domain/IsLoggedIn';
import { LastName } from '@Customers/Domain/LastName';

export interface AuthViewStore {
  customer: Customer;
}

const guest = new Customer({
  customerId: new CustomerId(''),
  firstName: new FirstName('Guest'),
  lastName: new LastName(''),
  isLoggedIn: new IsLoggedIn(false),
});

export const useAuthMergedStore = create<AuthStore & AuthViewStore>((set) => ({
  customer: guest,
  updateCustomer: (customer) => set({ customer: customer }),
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
        updateCustomer: state.updateCustomer,
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
