import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { Booking } from '../Domain/Booking';
import { BookingMapper } from './mappers/BookingMapper';
import { BookingPersistence } from '../Domain/BookingPersistence';
import { BookingRepository } from '../Domain/BookingRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/firebase';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';

export class FirestoreBookingRepository implements BookingRepository {
  private readonly _path = `${DB_NAME}-bookings`;

  async findAllByCustomer(customer: Customer): Promise<Booking[]> {
    const collRef = collection(DB, this._path);
    const queryResult = query(collRef, where('customerId', '==', customer.id));
    const docs = (await getDocs(queryResult)).docs;
    const bookings = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BookingPersistence[];

    return bookings.map(BookingMapper.toDomain);
  }

  async findByCustomerAndTimeSlot(props: {
    customerId: string;
    timeSlotId: string;
  }): Promise<Booking | undefined> {
    const collRef = collection(DB, this._path);
    const queryResult = query(
      collRef,
      where('customerId', '==', props.customerId),
      where('timeSlotId', '==', props.timeSlotId)
    );
    const docs = (await getDocs(queryResult)).docs;
    const booking = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0] as BookingPersistence | undefined;

    if (booking) {
      return BookingMapper.toDomain(booking);
    }
  }

  async save(booking: Booking): Promise<void> {
    const bookingPersistence = BookingMapper.toPersistence(booking);
    await addDoc(collection(DB, this._path), {
      customerId: bookingPersistence.customerId,
      motorcyclistId: bookingPersistence.motorcyclistId,
      timeSlotId: bookingPersistence.timeSlotId,
    });
  }

  async deleteByCustomerAndTimeSlot({
    customer,
    timeSlot,
  }: {
    customer: string;
    timeSlot: string;
  }): Promise<void> {
    const collRef = collection(DB, this._path);
    const queryResult = query(
      collRef,
      where('customerId', '==', customer),
      where('timeSlotId', '==', timeSlot),
      limit(1)
    );

    const docRef = (await getDocs(queryResult)).docs;

    if (docRef.length > 0) {
      await deleteDoc(doc(DB, this._path, docRef[0].id));
    }
  }
}
