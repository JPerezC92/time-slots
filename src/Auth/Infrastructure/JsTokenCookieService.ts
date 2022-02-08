import Cookies from 'js-cookie';

import { TokenCookieService } from '@Auth/Domain/TokenCookieService';

export const JsTokenCookieService: () => TokenCookieService = () => {
  const TOKEN_COOKIE_NAME = 'access_token';

  return {
    write: (value: string): void => {
      Cookies.set(TOKEN_COOKIE_NAME, value, {
        secure: false,
        path: '/',
        expires: 3600 * 9,
        sameSite: 'strict',
      });
    },

    read: (): string | undefined => {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      return token;
    },

    delete: (): void => {
      Cookies.remove(TOKEN_COOKIE_NAME);
    },
  };
};
