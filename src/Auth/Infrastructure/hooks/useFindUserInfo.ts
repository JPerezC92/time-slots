import { useCallback, useRef, useState } from 'react';

import { FindUserInfo } from '@Auth/Application/FindUserInfo';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';
import { useBookingMergerStore } from '@Bookings/Infrastructure/ZustandBookingStore';

export const useFindUserInfo = () => {
  const authStore = useRef(useAuthMergedStore());
  const bookingStore = useRef(useBookingMergerStore());
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async () => {
    setIsLoading(() => true);

    const findUserInfo = FindUserInfo({
      authRepository: NestJSAuthRepository(),
      authStore: authStore.current,
      bookingRepository: NestJSBookingRepository(),
      bookingStore: bookingStore.current,
    });

    await findUserInfo.execute();

    setIsLoading(() => false);
  }, []);

  return {
    run,
    isLoading,
  };
};
