import {
  FindAllResponse,
  TimeSlotRepository,
} from '@TimeSlots/Domain/TimeSlotRepository';
import { JsTokenCookieService } from '@Auth/Infrastructure/JsTokenCookieService';
import { TimeSlotApiRoute } from '@TimeSlots/Infrastructure/timeSlot.routes';

export const NestJSTimeSlotRepository: () => TimeSlotRepository = () => {
  const tokenService = JsTokenCookieService();

  return {
    findAll: async (): Promise<FindAllResponse> => {
      const response = await fetch(TimeSlotApiRoute.timeSlot, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenService.read()}`,
        },
      });
      const result = (await response.json()) as FindAllResponse;
      return result;
    },
  };
};
