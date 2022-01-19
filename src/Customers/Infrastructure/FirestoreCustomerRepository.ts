import { doc, getDoc } from 'firebase/firestore';

import { Customer } from '../Domain/Customer';
import { CustomerId } from '../Domain/CustomerId';
import { CustomerRepository } from '../Domain/CustomerRepository';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/DB/connection';
import { CustomerPlain } from './CustomerPlain';
import { CustomerMapper } from './mappers/CustomerMapper';

export class FirestoreCustomerRepository implements CustomerRepository {
  private readonly _path = `${DB_NAME}-customers`;

  async findById(id: CustomerId): Promise<Customer> {
    const docRef = doc(DB, this._path, id.value);
    const customer = {
      id: (await getDoc(docRef)).id,
      ...(await getDoc(docRef)).data(),
    } as CustomerPlain;

    return CustomerMapper.toDomain(customer);
  }
}
