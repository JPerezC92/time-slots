import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/firebase';
import { TimeSlot } from '../Domain/TimeSlot';
import { TimeSlotRepository } from '../Domain/TimeSlotRepository';
import { TimeSlotMapper } from './mappers/TimeSlotMapper';
import { TimeSlotPersistence } from './TimeSlotPersistence';

export class FirestoreTimeSlotRepository implements TimeSlotRepository {
  private readonly _path = `${DB_NAME}-timeslots`;

  async findAll(): Promise<TimeSlot[]> {
    const { docs } = await getDocs(
      query(collection(DB, this._path), orderBy('order'))
    );
    const timeSlots = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TimeSlotPersistence[];

    return timeSlots.map(TimeSlotMapper.toDomain) || [];
  }

  async findById(timeSlot: TimeSlot): Promise<TimeSlot> {
    const docRef = doc(DB, this._path, timeSlot.id);

    const timeSlotPersistence = {
      id: (await getDoc(docRef)).id,
      ...(await getDoc(docRef)).data(),
    } as TimeSlotPersistence;

    return TimeSlotMapper.toDomain(timeSlotPersistence);
  }

  async update(timeSlot: TimeSlot): Promise<void> {
    await updateDoc(doc(collection(DB, this._path), timeSlot.id), {
      isBooked: timeSlot.isBooked,
    });
  }
}
