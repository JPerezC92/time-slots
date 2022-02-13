import { AuthRepository } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { Customer } from '@Customers/Domain/Customer';
import { Logout } from '@Auth/Application/Logout';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const FindUserInfo: (props: {
  authRepository: AuthRepository;
  authStore: AuthStore;
  tokenCookieService: TokenCookieService;
}) => UseCase<Promise<void>> = ({
  authRepository,
  authStore,
  tokenCookieService,
}) => {
  return {
    execute: async () => {
      const userInfoResult = await authRepository.userInfo();

      if (userInfoResult.status !== ResultStatus.SUCCESS) {
        return tokenCookieService.delete();
      }

      authStore.login(
        Customer.fromPlain({ ...userInfoResult.data.user, isLoggedIn: true })
      );
    },
  };
};
