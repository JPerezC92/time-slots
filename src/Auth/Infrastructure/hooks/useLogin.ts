import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Credentials } from '@Auth/Domain/AuthRepository';
import { Login } from '@Auth/Application/Login';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';
import { JsTokenCookieService } from '../JsTokenCookieService';

export const useLogin = () => {
  const zustandAuthStore = useRef(useAuthMergedStore());

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
        authStore: zustandAuthStore.current,
        tokenCookieService: JsTokenCookieService(),
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
