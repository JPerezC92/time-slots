import { AuthRepository } from '@Auth/Domain/AuthRepository';
import { AuthStore } from '@Auth/Domain/AuthStore';
import { Customer } from '@Customers/Domain/Customer';
import { ResultStatus } from '@Shared/Domain/ResultStatus';
import { UseCase } from '@Shared/Domain/UseCase';

export const FindUserInfo: (props: {
  authRepository: AuthRepository;
  authStore: AuthStore;
}) => UseCase<Promise<void>> = ({ authRepository, authStore }) => {
  return {
    execute: async () => {
      const userInfoResult = await authRepository.userInfo();

      if (userInfoResult.status !== ResultStatus.SUCCESS) {
        authStore.logout();
        throw new Error('User info failed.');
      }

      authStore.login(
        Customer.fromPlain({ ...userInfoResult.data.user, isLoggedIn: true })
      );
    },
  };
};
