import { addDoc, collection } from 'firebase/firestore';
import { Booking } from '../Domain/Booking';
import { BookingMapper } from './mappers/BookingMapper';
import { BookingRepository } from '../Domain/BookingRepository';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/DB/connection';

export class FirestoreBookingRepository implements BookingRepository {
  private readonly _path = `${DB_NAME}-bookings`;

  async save(booking: Booking): Promise<void> {
    await addDoc(
      collection(DB, this._path),
      BookingMapper.toPersistence(booking)
    );
  }
}
