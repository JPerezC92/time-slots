import { AuthApiRoute } from '@Auth/Infrastructure/auth.routes';
import { AuthRepository, Credentials } from '@Auth/Domain/AuthRepository';
import { CustomerPlain } from '@Customers/Domain/CustomerPlain';
import { JSendResponse } from '@Shared/Domain/JSendResponse';
import { JsTokenCookieService } from '@Auth/Infrastructure/JsTokenCookieService';
import { ResultStatus } from '@Shared/Domain/ResultStatus';

export const NestJSAuthRepository: () => AuthRepository = () => {
  const tokenCookieService = JsTokenCookieService();

  return {
    login: async (
      credentials: Credentials
    ): Promise<JSendResponse<{ accessToken: string }>> => {
      const resp = await fetch(AuthApiRoute.LOGIN, {
        body: JSON.stringify(credentials),
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
      });

      const result = (await resp.json()) as JSendResponse<{
        accessToken: string;
      }>;

      if (result.status === ResultStatus.SUCCESS) {
        tokenCookieService.write(result.data.accessToken);
      }

      return result;
    },

    register: async (): Promise<JSendResponse<{ accessToken: string }>> => {
      throw new Error('Function not implemented.');
    },

    userInfo: async (): Promise<JSendResponse<{ user: CustomerPlain }>> => {
      const token = tokenCookieService.read();
      const resp = await fetch(AuthApiRoute.INFO, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      const result = await resp.json();

      return result as JSendResponse<{
        user: CustomerPlain;
      }>;
    },
  };
};
