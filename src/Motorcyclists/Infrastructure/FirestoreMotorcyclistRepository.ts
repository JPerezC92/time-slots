import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/DB/connection';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { Motorcyclist } from '../Domain/Motorcyclists';
import { MotorcyclistMapper } from './mappers/MotorcyclistMapper';
import { MotorcyclistPersistence } from '../Domain/MotorcyclistPersistence';

export class FirestoreMotorcyclistRepository implements MotorcyclistRepository {
  private readonly path = `${DB_NAME}-motorcyclists`;

  // constructor() {}

  async findOneAvailable(): Promise<Motorcyclist> {
    const collRef = collection(DB, this.path);
    const queryResult = query(
      collRef,
      where('isAvailable', '==', true),
      limit(1)
    );

    const doc = (await getDocs(queryResult)).docs[0];

    const motorcyclistPlain = {
      id: doc.id,
      ...doc.data(),
    } as MotorcyclistPersistence;

    return MotorcyclistMapper.toDomain(motorcyclistPlain);
  }

  async findAll(): Promise<Motorcyclist[]> {
    const { docs } = await getDocs(collection(DB, this.path));
    const motorcyclists = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MotorcyclistPersistence[];
    return motorcyclists.map(MotorcyclistMapper.toDomain) || [];
  }

  async update(motorcyclist: Motorcyclist): Promise<void> {
    const motorcyclistPlain = MotorcyclistMapper.toPersistence(motorcyclist);

    await updateDoc(doc(collection(DB, this.path), motorcyclist.id), {
      isAvailable: motorcyclistPlain.isAvailable,
    });
  }
}
