import { BooleanValueObject } from 'src/Shared/Domain/BooleanValueObject';

export class IsBookedByCustomer extends BooleanValueObject {
  public itWas() {
    return new IsBookedByCustomer(true);
  }
}
