import { useCallback, useRef, useState } from 'react';

import { FindUserInfo } from '@Auth/Application/FindUserInfo';
import { JsTokenCookieService } from '../JsTokenCookieService';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';

export const useFindUserInfo = () => {
  const authStore = useRef(useAuthMergedStore());
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async () => {
    setIsLoading(() => true);

    const findUserInfo = FindUserInfo({
      authRepository: NestJSAuthRepository(),
      authStore: authStore.current,
      tokenCookieService: JsTokenCookieService(),
    });

    await findUserInfo.execute();

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
