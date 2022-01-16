import { Customer } from "./Customer";

export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>;
}
