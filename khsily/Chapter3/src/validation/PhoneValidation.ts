import { IPersonState } from '../state';
import { IValidation } from './IValidation';
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator';
import { MinLengthValidator } from '../validators/MinLengthValidator';

export class PhoneValidation implements IValidation {
  private readonly regexValidator = new RegularExpressionValidator(
    '^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-.]?(?:[0-9]{3})[-.]?(?:[0-9]{4})$'
  );
  private readonly minLengthValidator = new MinLengthValidator(1);

  validate(state: IPersonState): string[] {
    const errors: string[] = [];

    if (!this.minLengthValidator.isValid(state.phoneNumber)) {
      errors.push('You must enter a phone number');
    }
    if (!this.regexValidator.isValid(state.phoneNumber)) {
      errors.push('The phone number format is invalid');
    }

    return errors;
  }
}
