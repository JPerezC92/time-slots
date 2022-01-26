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
import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';

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
    customer: Customer;
    timeSlot: TimeSlot;
  }): Promise<Booking> {
    const collRef = collection(DB, this._path);
    const queryResult = query(
      collRef,
      where('customerId', '==', props.customer.id),
      where('timeSlotId', '==', props.timeSlot.id)
    );
    const docs = (await getDocs(queryResult)).docs;
    const bookings = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0] as BookingPersistence;

    return BookingMapper.toDomain(bookings);
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

    await deleteDoc(
      doc(DB, this._path, (await getDocs(queryResult)).docs[0].id)
    );
  }
}
