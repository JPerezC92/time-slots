import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclist';
import { MotorcyclistApiRoute } from '@Motorcyclists/Infrastructure/motorcyclist.routes';
import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { MotorcyclistPlain } from '@Motorcyclists/Domain/MotorcyclistPlain';

export const NestJSMotorcyclistRepository: () => MotorcyclistRepository =
  () => {
    return {
      findAll: async (): Promise<
        JSendResponse<{ motorcyclists: MotorcyclistPlain[] }>
      > => {
        const response = await fetch(MotorcyclistApiRoute.Motorcyclists);

        const result = (await response.json()) as JSendResponse<{
          motorcyclists: Motorcyclist[];
        }>;

        return result;
      },
    };
  };
