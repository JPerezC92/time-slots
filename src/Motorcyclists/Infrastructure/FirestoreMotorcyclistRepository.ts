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
import { DB, DB_NAME } from 'src/Shared/Infrastructure/firebase';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { Motorcyclist } from '../Domain/Motorcyclists';
import { MotorcyclistMapper } from './mappers/MotorcyclistMapper';
import { MotorcyclistPersistence } from '../Domain/MotorcyclistPersistence';

export class FirestoreMotorcyclistRepository implements MotorcyclistRepository {
  private readonly _path = `${DB_NAME}-motorcyclists`;

  async findById(motorcyclistId: string): Promise<Motorcyclist> {
    const docRef = doc(DB, this._path, motorcyclistId);

    const timeSlotPersistence = {
      id: (await getDoc(docRef)).id,
      ...(await getDoc(docRef)).data(),
    } as MotorcyclistPersistence;

    return MotorcyclistMapper.toDomain(timeSlotPersistence);
  }

  async findOneAvailable(): Promise<Motorcyclist> {
    const collRef = collection(DB, this._path);
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
    const { docs } = await getDocs(collection(DB, this._path));
    const motorcyclists = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timeSlotAssigned: doc.data().timeSlotAssigned || [],
    })) as MotorcyclistPersistence[];
    return motorcyclists.map(MotorcyclistMapper.toDomain) || [];
  }

  async update(motorcyclist: Motorcyclist): Promise<void> {
    const motorcyclistPlain = MotorcyclistMapper.toPersistence(motorcyclist);

    await updateDoc(doc(collection(DB, this._path), motorcyclist.id), {
      timeSlotAssigned: motorcyclistPlain.timeSlotAssigned,
    });
  }
}
