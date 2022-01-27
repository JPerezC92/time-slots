import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/firebase';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { Motorcyclist } from '../Domain/Motorcyclists';
import { MotorcyclistMapper } from './mappers/MotorcyclistMapper';
import { MotorcyclistPersistence } from '../Domain/MotorcyclistPersistence';
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';

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
      // limit(1)
      // orderBy('timeSlotAssigned', 'asc'),
      where('timeSlotAssigned.length', '>', 3)
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

  async addTimeSlotAssigned({
    motorcyclistId,
    timeSlotId,
  }: {
    motorcyclistId: Motorcyclist['id'];
    timeSlotId: TimeSlot['id'];
  }): Promise<void> {
    await updateDoc(doc(collection(DB, this._path), motorcyclistId), {
      timeSlotAssigned: arrayUnion(timeSlotId),
    });
  }

  async removeTimeSlotAssigned({
    motorcyclistId,
    timeSlotId,
  }: {
    motorcyclistId: Motorcyclist['id'];
    timeSlotId: TimeSlot['id'];
  }): Promise<void> {
    await updateDoc(doc(collection(DB, this._path), motorcyclistId), {
      timeSlotAssigned: arrayRemove(timeSlotId),
    });
  }
}
