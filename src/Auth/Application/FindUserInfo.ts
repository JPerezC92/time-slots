import { AuthRepository } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { BookingFinder } from '@Bookings/Application/BookingFinder';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { Customer } from '@Customers/Domain/Customer';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const FindUserInfo: (props: {
  authRepository: AuthRepository;
  authStore: AuthStore;
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
}) => UseCase<Promise<void>> = ({
  authRepository,
  authStore,
  bookingRepository,
  bookingStore,
}) => {
  const bookingFinder = BookingFinder({ bookingRepository, bookingStore });

  return {
    execute: async () => {
      const userInfoResult = await authRepository.userInfo();

      if (userInfoResult.status !== ResultStatus.SUCCESS) {
        return authStore.removeAccessToken();
      }

      authStore.login(
        Customer.fromPlain({ ...userInfoResult.data.user, isLoggedIn: true })
      );

      await bookingFinder.execute();
    },
  };
};
