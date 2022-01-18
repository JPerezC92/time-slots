import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerName } from 'src/Customers/Domain/CustomerName';
import { CustomerPlain } from '../CustomerPlain';

export const CustomerMapper = {
  toDomain(customerPlain: CustomerPlain): Customer {
    return new Customer({
      customerId: new CustomerId(customerPlain.id),
      customerName: new CustomerName(customerPlain.name),
    });
  },

  toPlain(customer: Customer): CustomerPlain {
    return {
      id: customer.id,
      name: customer.name,
    };
  },
};
