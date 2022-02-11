import { Customer } from '@Customers/Domain/Customer';

export interface AuthStore {
  logout: () => void;
  login: (customer: Customer) => void;
}
