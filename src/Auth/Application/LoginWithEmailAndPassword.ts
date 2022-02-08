import { AuthRepository, Credentials } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { Customer } from '@Customers/Domain/Customer';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';

export const LoginWithEmailAndPassword = ({
  authRepository,
  authStore,
}: {
  authRepository: AuthRepository;
  authStore: AuthStore;
}): UseCase<Promise<void>, Credentials> => {
  return {
    execute: async (credentials) => {
      const loginResult = await authRepository.login(credentials);

      if (loginResult.status !== ResultStatus.SUCCESS) {
        throw new Error('Login failed.');
      }

      const userInfoResult = await authRepository.userInfo();

      if (userInfoResult.status !== ResultStatus.SUCCESS) {
        throw new Error('User info failed.');
      }

      authStore.updateCustomer(
        Customer.fromPlain({ ...userInfoResult.data.user, isLoggedIn: true })
      );
    },
  };
};
