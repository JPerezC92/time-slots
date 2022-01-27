export abstract class DomainException extends Error {
  abstract readonly name: string;
  abstract readonly message: string;
  public readonly type = 'DOMAIN_EXCEPTION';

  static isDomainException(error: any): error is DomainException {
    return error instanceof DomainException;
  }
}
