export interface TokenCookieService {
  write(value: string): void;
  read(): string | undefined;
  delete(): void;
}
