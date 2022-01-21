import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import { CustomerPersistence } from '../CustomerPersistence';

export const CustomerMapper = {
  toDomain(customerPlain: CustomerPersistence): Customer {
    return new Customer({
      customerId: new CustomerId(customerPlain.id),
      customerName: new CustomerName(customerPlain.name),
    });
  },

  toPlain(customer: Customer): CustomerPersistence {
    return {
      id: customer.id,
      name: customer.name,
    };
  },
};
