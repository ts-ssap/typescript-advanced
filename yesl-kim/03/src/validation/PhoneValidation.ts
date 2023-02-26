import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator'

export class PhoneValidation implements Validation {
  private readonly regExpValidator = new RegularExpressionValidator(
    'A(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-.]?(?:[0-9]{3})[-. ]?(?:[0-9]{4})$'
  )
  private readonly minLengthValidator = new MinLengthValidator(1)

  public validate(state: IPersonState, errors: string[]): void {
    if (!this.minLengthValidator.isValid(state.phoneNumber)) {
      errors.push('You must enter a phone number')
    } else if (!this.regExpValidator.isValid(state.phoneNumber)) {
      errors.push('The phone number format is invalid')
    }
  }
}
