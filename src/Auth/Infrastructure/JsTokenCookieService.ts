import Cookies from 'js-cookie';

import { TokenCookieService } from '@Auth/Domain/TokenCookieService';

const hourInMiliseconds = 1000 * 60 * 60;
const validTime = hourInMiliseconds * 4;

export const JsTokenCookieService: () => TokenCookieService = () => {
  const TOKEN_COOKIE_NAME = 'access_token';

  return {
    write: (value: string): void => {
      Cookies.set(TOKEN_COOKIE_NAME, value, {
        secure: false,
        path: '/',
        expires: new Date(new Date().getTime() + 60000),
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
