import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import { CustomerPersistence } from '../../Domain/CustomerPersistence';
import { IsLoggedIn } from 'src/Customers/Domain/IsLoggedIn';

export const CustomerMapper = {
  toDomain(customerPlain: CustomerPersistence): Customer {
    return new Customer({
      customerId: new CustomerId(customerPlain.id),
      customerName: new CustomerName(customerPlain.name),
      isLoggedIn: new IsLoggedIn(true),
    });
  },

  toPlain(customer: Customer): CustomerPersistence {
    return {
      id: customer.id,
      name: customer.name,
    };
  },
};
