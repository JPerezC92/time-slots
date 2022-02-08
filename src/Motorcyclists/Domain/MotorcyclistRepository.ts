import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { MotorcyclistPlain } from './MotorcyclistPlain';

export interface MotorcyclistRepository {
  findAll(): Promise<JSendResponse<{ motorcyclists: MotorcyclistPlain[] }>>;
}
