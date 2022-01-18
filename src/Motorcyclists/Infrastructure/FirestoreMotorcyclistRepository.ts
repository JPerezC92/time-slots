import {
  collection,
  doc,
  getDoc,
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
import { MotorcyclistPlain } from './mappers/MotorcyclistPlain';

export class FirestoreMotorcyclistRepository implements MotorcyclistRepository {
  private readonly path = `${DB_NAME}-motorcyclists`;

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
    } as MotorcyclistPlain;

    return MotorcyclistMapper.toDomain(motorcyclistPlain);
  }

  async findAll(): Promise<Motorcyclist[]> {
    const { docs } = await getDocs(collection(DB, this.path));
    const motorcyclists = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MotorcyclistPlain[];
    return motorcyclists.map(MotorcyclistMapper.toDomain) || [];
  }

  async update(motorcyclist: Motorcyclist): Promise<void> {
    const motorcyclistPlain = MotorcyclistMapper.toPlain(motorcyclist);

    updateDoc(doc(collection(DB, this.path), motorcyclist.id), {
      isAvailable: motorcyclistPlain.isAvailable,
    });
  }
}
