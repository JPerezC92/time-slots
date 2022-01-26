import { doc, getDoc } from 'firebase/firestore';

import { Customer } from '../Domain/Customer';
import { CustomerMapper } from './mappers/CustomerMapper';
import { CustomerPersistence } from '../Domain/CustomerPersistence';
import { CustomerRepository } from '../Domain/CustomerRepository';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/firebase';

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
