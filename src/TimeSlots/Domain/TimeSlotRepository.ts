import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { TimeSlotPlain } from './TimeSlotPlain';

export type FindAllResponse = JSendResponse<{ timeSlots: TimeSlotPlain[] }>;

export interface TimeSlotRepository {
  findAll(): Promise<FindAllResponse>;
}
