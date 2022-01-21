import { CustomerPersistence } from 'src/Customers/Infrastructure/CustomerPersistence';
import { MotorcyclistPersistence } from 'src/Motorcyclists/Domain/MotorcyclistPersistence';
import { TimeSlotPersistence } from 'src/TimeSlot/Infrastructure/TimeSlotPersistence';

export interface BookingPersistence {
  id: string;
  timeSlot: TimeSlotPersistence;
  motorcyclist: MotorcyclistPersistence;
  customer: CustomerPersistence;
}
