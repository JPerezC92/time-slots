import { AuthRepository, Credentials } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { BookingStore } from '@Bookings/Domain/BookingStore';
import { FindUserInfo } from '@Auth/Application/FindUserInfo';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const Login: (props: {
  authRepository: AuthRepository;
  authStore: AuthStore;
  bookingRepository: BookingRepository;
  bookingStore: BookingStore;
  tokenCookieService: TokenCookieService;
}) => UseCase<Promise<void>, Credentials> = ({
  authRepository,
  authStore,
  bookingRepository,
  bookingStore,
  tokenCookieService,
}) => {
  const findUserInfo = FindUserInfo({
    authRepository,
    authStore,
    bookingRepository,
    bookingStore,
    tokenCookieService,
  });

  return {
    execute: async (credentials) => {
      const loginResult = await authRepository.login(credentials);

      if (loginResult.status !== ResultStatus.SUCCESS) return;

      await findUserInfo.execute();
    },
  };
};
