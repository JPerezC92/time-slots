import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { FirstName } from 'src/Customers/Domain/FirstName';
import { IsLoggedIn } from 'src/Customers/Domain/IsLoggedIn';
import { CustomerPlain } from 'src/Customers/Domain/CustomerPlain';
import { LastName } from 'src/Customers/Domain/LastName';

export const CustomerMapper = {
  toDomain({
    id,
    firstName: firstname,
    lastName: lastname,
  }: CustomerPlain): Customer {
    return new Customer({
      customerId: new CustomerId(id),
      firstName: new FirstName(firstname),
      lastName: new LastName(lastname),
      isLoggedIn: new IsLoggedIn(true),
    });
  },

  toPlain({ id, firstName, lastName }: Customer): CustomerPlain {
    return {
      id: id,
      firstName: firstName,
      lastName: lastName,
    };
  },
};
