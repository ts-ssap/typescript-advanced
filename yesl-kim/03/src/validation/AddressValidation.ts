import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator'

export class AddressValidation implements Validation {
  private readonly minLengthValidator: MinLengthValidator =
    new MinLengthValidator(5)
  private readonly zipCodeValidator: RegularExpressionValidator =
    new RegularExpressionValidator('^[0-9]{5}(?:-[0-9]{4})?$')

  public validate(state: IPersonState, errors: string[]): void {
    if (!this.minLengthValidator.isValid(state.address1)) {
      errors.push('Address line 1 must be greater than 5 characters')
    }
    if (!this.minLengthValidator.isValid(state.town)) {
      errors.push('Town must be greater than 5 characters')
    }
    if (!this.minLengthValidator.isValid(state.county)) {
      errors.push('County must be greater than 5 characters')
    }
    if (!this.zipCodeValidator.isValid(state.postcode)) {
      errors.push('The postal/zip code is invalid')
    }
  }
}
