import { AuthStore } from '@Auth/Domain/AuthStore';
import { UseCase } from '@Shared/Domain/UseCase';

export const Logout: (props: { authStore: AuthStore }) => UseCase<void> = ({
  authStore,
}) => {
  return {
    execute: () => {
      authStore.logout();
    },
  };
};
