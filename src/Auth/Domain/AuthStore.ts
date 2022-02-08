import { Customer } from '@Customers/Domain/Customer';

export interface AuthStore {
  login: () => void;
  logout: () => void;
  updateCustomer: (custome: Customer) => void;
}
