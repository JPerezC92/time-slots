import { FC } from 'react';
import { Box, Button, Divider } from '@chakra-ui/react';

import {
  AuthViewStore,
  useAuthMergedStore,
} from '@Auth/Infrastructure/ZustandAuthStore';
import { LoginForm } from '@Auth/Infrastructure/components/LoginForm';
import { useLogout } from '@Auth/Infrastructure/hooks/useLogout';

const selectCustomer = (state: AuthViewStore) => state.customer;

export const Layout: FC = ({ children }) => {
  const customer = useAuthMergedStore(selectCustomer);
  const { run: logoutRun } = useLogout();

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
        alignItems="center"
        display="flex"
        gap="1rem"
        justifyContent="flex-end"
        padding="0.5rem"
      >
        {customer.isLoggedIn ? (
          <>
            <h1>{customer.firstName}</h1>
            <Button type="button" bg="red.500" onClick={logoutRun}>
              Logout
            </Button>
          </>
        ) : (
          <LoginForm />
        )}
      </Box>

      <Divider />

      {children}
    </Box>
  );
};
