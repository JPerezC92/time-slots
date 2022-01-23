import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import { signInWithPopup, signOut } from 'firebase/auth';

import { AuthStore } from '../Domain/AuthStore';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import {
  googleAuth,
  googleAuthProvider,
} from 'src/Shared/Infrastructure/firebase';
import { IsLoggedIn } from 'src/Customers/Domain/IsLoggedIn';

interface AuthViewStore {
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
    signInWithPopup(googleAuth, googleAuthProvider);
    // .then((result) => {
    //   const { user } = result;
    //   const credential = GoogleAuthProvider.credentialFromResult(result);

    //   const token = credential?.accessToken;
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(
    //     error as FirebaseError
    //   );
    // });
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
