import { collection, getDocs } from 'firebase/firestore';
import { DB, DB_NAME } from 'src/Shared/Infrastructure/DB/connection';
import { MotorcyclistRepository } from '../Domain/MotorcyclistRepository';
import { Motorcyclist } from '../Domain/Motorcyclists';
import { MotorcyclistMapper } from './mappers/MotorcyclistMapper';
import { MotorcyclistPlain } from './mappers/MotorcyclistPlain';

export class FirestoreMotorcyclistRepository implements MotorcyclistRepository {
  private readonly path = `${DB_NAME}-motorcyclists`;

  findOneAvailable(): Promise<Motorcyclist> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Motorcyclist[]> {
    const { docs } = await getDocs(collection(DB, this.path));
    const motorcyclists = docs.map((doc) => doc.data()) as MotorcyclistPlain[];
    return motorcyclists.map(MotorcyclistMapper.toDomain) || [];
  }
}
