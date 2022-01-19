import { CustomerPlain } from 'src/Customers/Infrastructure/CustomerPlain';
import { MotorcyclistPlain } from 'src/Motorcyclists/Infrastructure/mappers/MotorcyclistPlain';
import { TimeSlotPersistence } from 'src/TimeSlot/Infrastructure/TimeSlotPersistence';

export interface BookingPersistence {
  id: string;
  timeSlot: TimeSlotPersistence;
  motorcyclist: MotorcyclistPlain;
  customer: CustomerPlain;
}
