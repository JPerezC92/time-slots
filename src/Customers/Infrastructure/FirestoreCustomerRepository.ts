import { doc, getDoc } from 'firebase/firestore';

import { Customer } from '../Domain/Customer';
import { CustomerId } from '../Domain/CustomerId';
import { CustomerRepository } from '../Domain/CustomerRepository';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/DB/connection';
import { CustomerPersistence } from './CustomerPersistence';
import { CustomerMapper } from './mappers/CustomerMapper';

export class FirestoreCustomerRepository implements CustomerRepository {
  private readonly _path = `${DB_NAME}-customers`;

  async findById(id: string): Promise<Customer> {
    const docRef = doc(DB, this._path, id);
    const customer = {
      id: (await getDoc(docRef)).id,
      ...(await getDoc(docRef)).data(),
    } as CustomerPersistence;

    return CustomerMapper.toDomain(customer);
  }
}
