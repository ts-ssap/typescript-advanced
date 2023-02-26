import { IPersonState } from '../state';
import { MinLengthValidator } from '../validators/MinLengthValidator';
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator';
import { IValidation } from './IValidation';

export class AddressValidation implements IValidation {
  private readonly minLengthValidator = new MinLengthValidator(5);
  private readonly zipCodeValidator = new RegularExpressionValidator('^[0-9]{5}(?:-[0-9]{4})?$');

  validate(state: IPersonState): string[] {
    const errors: string[] = [];

    if (!this.minLengthValidator.isValid(state.address1)) {
      errors.push('Address line 1 must be greater than 5 characters');
    }
    if (!this.minLengthValidator.isValid(state.town)) {
      errors.push('Town must be greater than 5 characters');
    }
    if (!this.minLengthValidator.isValid(state.county)) {
      errors.push('County must be greater than 5 character');
    }
    if (!this.zipCodeValidator.isValid(state.postcode)) {
      errors.push('The postal/zip code is invalid');
    }

    return errors;
  }
}
