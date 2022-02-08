import { ChangeEventHandler, useCallback, useRef, useState } from 'react';

import { Credentials } from '@Auth/Domain/AuthRepository';
import { LoginWithEmailAndPassword } from '@Auth/Application/LoginWithEmailAndPassword';
import { NestJSAuthRepository } from '@Auth/Infrastructure/NestJSAuthRepository';
import { useAuthMergedStore } from '@Auth/Infrastructure/ZustandAuthStore';

export const useLoginWithEmailAndPassword = () => {
  const zustandAuthStore = useRef(useAuthMergedStore());

  const [credentials, setCredentials] = useState<Credentials>({
    email: 'usuario01@gmail.com',
    password: '123456789',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const value = e.target.value;
    const name = e.target.name;

    setCredentials((s) => ({ ...s, [name]: value }));
  }, []);

  return {
    credentials,
    onChange,
    run: useCallback(() => {
      const loginWithEmailAndPassword = LoginWithEmailAndPassword({
        authRepository: NestJSAuthRepository(),
        authStore: zustandAuthStore.current,
      });

      loginWithEmailAndPassword.execute(credentials);
    }, [credentials]),
  };
};
