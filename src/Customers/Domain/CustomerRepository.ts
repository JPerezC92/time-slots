import { Customer } from './Customer';
import { CustomerId } from './CustomerId';

export interface CustomerRepository {
  findById(id: CustomerId): Promise<Customer>;
}
