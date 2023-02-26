import { IPersonState } from '../state';
import { MinLengthValidator } from '../validators/MinLengthValidator';
import { IValidation } from './IValidation';

export class PersonValidation implements IValidation {
  private readonly firstNameValidator = new MinLengthValidator(1);
  private readonly lastNameValidator = new MinLengthValidator(2);

  validate(state: IPersonState): string[] {
    const errors: string[] = [];

    if (!this.firstNameValidator.isValid(state.firstName)) {
      errors.push('The first name is a minimum of 1 character');
    }
    if (!this.lastNameValidator.isValid(state.lastName)) {
      errors.push('The last name is a minimum of 2 characters');
    }

    return errors;
  }
}
