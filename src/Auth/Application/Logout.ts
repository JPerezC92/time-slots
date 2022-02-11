import { AuthStore } from '@Auth/Domain/AuthStore';
import { TokenCookieService } from '@Auth/Domain/TokenCookieService';
import { UseCase } from '@Shared/Domain/UseCase';

export const Logout: (props: {
  authStore: AuthStore;
  tokenCookieService: TokenCookieService;
}) => UseCase<void> = ({ authStore, tokenCookieService }) => {
  return {
    execute: () => {
      authStore.logout();
      tokenCookieService.delete();
    },
  };
};
