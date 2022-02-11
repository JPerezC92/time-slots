import { JsTokenCookieService } from '@Auth/Infrastructure/JsTokenCookieService';
import { Booking } from '@Bookings/Domain/Booking';
import { BookingPlain } from '@Bookings/Domain/BookingPlain';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { BookingApiRoute } from './bookings.routes';

const jsTokenCookieService = JsTokenCookieService();

export const NestJSBookingRepository: () => BookingRepository = () => {
  return {
    findAllByCustomer: async (): Promise<
      JSendResponse<{ bookings: BookingPlain[] }>
    > => {
      const response = await fetch(BookingApiRoute.BOOKINGS, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jsTokenCookieService.read()}`,
        },
      });

      const result = (await response.json()) as JSendResponse<{
        bookings: BookingPlain[];
      }>;

      return result;
    },
    save: async ({
      timeSlotId,
    }: {
      timeSlotId: TimeSlot['id'];
    }): Promise<JSendResponse<null>> => {
      const response = await fetch(BookingApiRoute.BOOKINGS, {
        body: JSON.stringify({ timeSlotId }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jsTokenCookieService.read()}`,
        },
      });

      const result = (await response.json()) as JSendResponse<null>;

      return result;
    },

    delete: async (bookingId: Booking['id']): Promise<JSendResponse<null>> => {
      const response = await fetch(BookingApiRoute.BOOKINGS, {
        body: JSON.stringify({ bookingId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jsTokenCookieService.read()}`,
        },
        method: 'DELETE',
      });

      const result = (await response.json()) as JSendResponse<null>;

      return result;
    },
  };
};
