import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'

export class NameValidation implements Validation {
  private readonly firstNameValidator = new MinLengthValidator(1)
  private readonly lastNameValidator = new MinLengthValidator(2)

  public validate(state: IPersonState, errors: string[]): void {
    if (!this.firstNameValidator.isValid(state.firstName)) {
      errors.push('The first name is a minimum of 1 character')
    }

    if (!this.lastNameValidator.isValid(state.lastName)) {
      errors.push('The last name is a minimum of 2 characters')
    }
  }
}
