import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'

export class NameValidation implements Validation {
  private readonly firstNameValidator = new MinLengthValidator(1)
  private readonly lastNameValidator = new MinLengthValidator(2)

  public validate(state: IPersonState): string | undefined {
    if (!this.firstNameValidator.isValid(state.firstName)) {
      return 'The first name is a minimum of 1 character'
    }

    if (!this.lastNameValidator.isValid(state.lastName)) {
      return 'The last name is a minimum of 2 characters'
    }
  }
}
