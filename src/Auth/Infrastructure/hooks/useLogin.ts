import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Credentials } from '@Auth/Domain/AuthRepository';
import { Login } from '@Auth/Application/Login';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';
import { NestJSBookingRepository } from '@Bookings/Infrastructure/NestJSBookingRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';
import { useBookingMergerStore } from '@Bookings/Infrastructure/ZustandBookingStore';

export const useLogin = () => {
  const authStore = useRef(useAuthMergedStore());
  const bookingStore = useRef(useBookingMergerStore());

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '123456789',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const value = e.target.value;
    const name = e.target.name;

    setCredentials((s) => ({ ...s, [name]: value }));
  }, []);

  const run: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const login = Login({
        authRepository: NestJSAuthRepository(),
        authStore: authStore.current,
        bookingRepository: NestJSBookingRepository(),
        bookingStore: bookingStore.current,
      });

      await login.execute(credentials);
    },
    [credentials]
  );

  return {
    credentials,
    onChange,
    run,
  };
};
