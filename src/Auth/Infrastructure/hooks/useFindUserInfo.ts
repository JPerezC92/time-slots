import { useCallback, useRef, useState } from 'react';

import { FindUserInfo } from '@Auth/Application/FindUserInfo';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';

export const useFindUserInfo = () => {
  const authStore = useRef(useAuthMergedStore());
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async () => {
    setIsLoading(() => true);

    const findUserInfo = FindUserInfo({
      authRepository: NestJSAuthRepository(),
      authStore: authStore.current,
    });

    await findUserInfo.execute();

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
