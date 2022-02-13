import { AuthRepository, Credentials } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { FindUserInfo } from '@Auth/Application/FindUserInfo';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const Login: (props: {
  authRepository: AuthRepository;
  authStore: AuthStore;
  tokenCookieService: TokenCookieService;
}) => UseCase<Promise<void>, Credentials> = ({
  authRepository,
  authStore,
  tokenCookieService,
}) => {
  const findUserInfo = FindUserInfo({
    authRepository,
    authStore,
    tokenCookieService,
  });

  return {
    execute: async (credentials) => {
      const loginResult = await authRepository.login(credentials);

      if (loginResult.status !== ResultStatus.SUCCESS) {
        return;
      }

      await findUserInfo.execute();
    },
  };
};
