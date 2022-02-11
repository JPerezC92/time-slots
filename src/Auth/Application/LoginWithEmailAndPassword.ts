import { AuthRepository, Credentials } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';
import { FindUserInfo } from './FindUserInfo';

export const LoginWithEmailAndPassword = ({
  authRepository,
  authStore,
}: {
  authRepository: AuthRepository;
  authStore: AuthStore;
}): UseCase<Promise<void>, Credentials> => {
  const findUserInfo = FindUserInfo({ authRepository, authStore });

  return {
    execute: async (credentials) => {
      const loginResult = await authRepository.login(credentials);

      if (loginResult.status !== ResultStatus.SUCCESS) {
        throw new Error('Login failed.');
      }

      await findUserInfo.execute();
      // const userInfoResult = await authRepository.userInfo();

      // if (userInfoResult.status !== ResultStatus.SUCCESS) {
      //   throw new Error('User info failed.');
      // }

      // authStore.updateCustomer(
      //   Customer.fromPlain({ ...userInfoResult.data.user, isLoggedIn: true })
      // );
    },
  };
};
