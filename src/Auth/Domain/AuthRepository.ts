import { CustomerPlain } from '@Customers/Domain/CustomerPlain';
import { JSendResponse } from '@Shared/Infrastructure/JSendResponse';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(
    credentials: Credentials
  ): Promise<JSendResponse<{ accessToken: string }>>;
  register(): Promise<JSendResponse<{ accessToken: string }>>;
  userInfo(): Promise<JSendResponse<{ user: CustomerPlain }>>;
}
