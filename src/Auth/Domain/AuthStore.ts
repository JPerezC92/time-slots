export interface AuthStore {
  login: () => void;
  logout: () => void;
  updateCredentials: (props: { username: string; id: string }) => void;
}
