import { FC, useEffect } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import { googleAuth } from 'src/Shared/Infrastructure/firebase';
import {
  AuthViewStore,
  useAuthMergedStore,
} from 'src/Auth/Infrastructure/ZustandAuthStore';
import { AuthStore } from 'src/Auth/Domain/AuthStore';
import { useLoginWithEmailAndPassword } from 'src/Auth/Infrastructure/hooks/useLoginWithEmailAndPassword';

const selectLogout = (state: AuthStore) => state.logout;

const selectCustomer = (state: AuthViewStore) => state.customer;

const LoginForm: FC = () => {
  const { credentials, onChange, run } = useLoginWithEmailAndPassword();

  return (
    <>
      <Input
        id="email"
        name="email"
        onChange={onChange}
        type="email"
        value={credentials.email}
      />
      <Input
        id="password"
        name="password"
        onChange={onChange}
        type="password"
        value={credentials.email}
      />
      <Button type="button" bg="blue.500" onClick={run}>
        Login
      </Button>
    </>
  );
};

export const Layout: FC = ({ children }) => {
  const customer = useAuthMergedStore(selectCustomer);

  const logout = useAuthMergedStore(selectLogout);

  return (
    <Box
      overflow="auto"
      height="100vh"
      width="100vw"
      maxWidth="1366px"
      marginInline="auto"
    >
      <Box
        as="nav"
        display="flex"
        // flexDirection="row-reverse"
        justifyContent="flex-end"
        alignItems="center"
        gap="1rem"
        padding="0.5rem"
      >
        <h1>{customer.isLoggedIn && customer.firstName}</h1>

        {!customer.isLoggedIn ? (
          <LoginForm />
        ) : (
          <Button type="button" bg="red.500" onClick={logout}>
            Logout
          </Button>
        )}
      </Box>
      {children}
    </Box>
  );
};