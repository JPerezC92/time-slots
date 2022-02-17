import React, { FC } from 'react';

import { Button, chakra, Input } from '@chakra-ui/react';
import { useLogin } from '@Auth/Infrastructure/hooks/useLogin';

export const LoginForm: FC = () => {
  const { credentials, onChange, run } = useLogin();

  return (
    <chakra.form
      onSubmit={run}
      alignItems="center"
      display="flex"
      gap="1rem"
      justifyContent="flex-end"
    >
      <Input
        list="emails"
        id="email"
        name="email"
        onChange={onChange}
        type="email"
        value={credentials.email}
      />
      <datalist id="emails">
        <option value="usuario01@gmail.com" />
        <option value="usuario02@gmail.com" />
      </datalist>

      <Input
        id="password"
        name="password"
        onChange={onChange}
        type="password"
        value={credentials.password}
      />

      <Button bg="blue.500" type="submit" minW="4rem">
        Login
      </Button>
    </chakra.form>
  );
};
