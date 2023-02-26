import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator'

export class PhoneValidation implements Validation {
  private readonly regExpValidator = new RegularExpressionValidator(
    '^(?:((?:[0-9]{3}))|(?:[0-9]{3}))[-.]?(?:[0-9]{4})[-.]?(?:[0-9]{4})$'
  )
  private readonly minLengthValidator = new MinLengthValidator(1)

  public validate(state: IPersonState): string | undefined {
    if (!this.minLengthValidator.isValid(state.phoneNumber)) {
      return 'You must enter a phone number'
    } else if (!this.regExpValidator.isValid(state.phoneNumber)) {
      return 'The phone number format is invalid'
    }
  }
}
