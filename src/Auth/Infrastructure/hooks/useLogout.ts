import { useCallback, useRef, useState } from 'react';

import { JsTokenCookieService } from '@Auth/Infrastructure/JsTokenCookieService';
import { Logout } from '@Auth/Application/Logout';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authStore = useRef(useAuthMergedStore());

  const run = useCallback(() => {
    setIsLoading(() => true);

    const logout = Logout({ authStore: authStore.current });

    logout.execute();

    setIsLoading(() => false);
  }, []);

  return {
    isLoading,
    run,
  };
};
