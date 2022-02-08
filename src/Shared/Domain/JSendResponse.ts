import { ResultStatus } from './ResultStatus';

export interface JSendSuccess<Type = unknown> {
  status: ResultStatus.SUCCESS;
  data: Type;
}

export interface JSendError {
  status: ResultStatus.ERROR;
  message: string;
}

export interface JSendFailure {
  status: ResultStatus.FAIL;
  data: Record<string, string> | string;
}

export type JSendResponse<Type = unknown> =
  | JSendSuccess<Type>
  | JSendError
  | JSendFailure;
