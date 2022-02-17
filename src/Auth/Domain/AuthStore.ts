import { Customer } from '@Customers/Domain/Customer';

export interface AuthStore {
  logout: () => void;
  login: (customer: Customer) => void;
  tokenExists: () => boolean;
  // getToken: () => string | undefined;
  removeAccessToken: () => void;
}
