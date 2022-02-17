import { useCallback } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';

import { AuthStore } from '@Auth/Domain/AuthStore';
import { Customer } from '@Customers/Domain/Customer';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { FirstName } from '@Customers/Domain/FirstName';
import { IsLoggedIn } from '@Customers/Domain/IsLoggedIn';
import { JsTokenCookieService } from './JsTokenCookieService';
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

const jsTokenCookieService = JsTokenCookieService();

export const useAuthMergedStore = create<AuthStore & AuthViewStore>(
  (set, get) => ({
    customer: guest,
    tokenExists: () => !!jsTokenCookieService.read(),
    removeAccessToken: () => jsTokenCookieService.delete(),
    login: (customer) => set({ customer: customer }),
    logout: () => {
      set({ customer: guest });
      get().removeAccessToken();
    },
  })
);

export const useAuthViewStore: () => AuthViewStore = () => {
  const authViewStore = useAuthMergedStore(
    useCallback(
      (state) => ({ customer: state.customer, tokenExists: state.tokenExists }),
      []
    ),
    shallow
  );
  return authViewStore;
};
