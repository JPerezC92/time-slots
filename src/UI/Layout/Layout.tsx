import { FC, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import { googleAuth } from 'src/Shared/Infrastructure/firebase';
import {
  AuthViewStore,
  useAuthMergedStore,
} from 'src/Auth/Infrastructure/ZustandAuthStore';
import { AuthStore } from 'src/Auth/Domain/AuthStore';

const selectUpdateCredentials = (state: AuthStore) => state.updateCredentials;
const selectLogout = (state: AuthStore) => state.logout;
const selectLogin = (state: AuthStore) => state.login;
const selectCustomer = (state: AuthViewStore) => state.customer;

export const Layout: FC = ({ children }) => {
  const customer = useAuthMergedStore(selectCustomer);
  const login = useAuthMergedStore(selectLogin);
  const logout = useAuthMergedStore(selectLogout);
  const updateCredentials = useAuthMergedStore(selectUpdateCredentials);

  useEffect(() => {
    onAuthStateChanged(googleAuth, (user) => {
      if (user) {
        updateCredentials({ id: user.uid, username: user.displayName || '' });
      }
    });
  }, [updateCredentials]);

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
        <h1>{customer.isLoggedIn && customer.name}</h1>
        {!customer.isLoggedIn ? (
          <Button type="button" bg="blue.500" onClick={login}>
            Login
          </Button>
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
