import { IPersonState } from '../state'
import { Validation } from '../types'
import { MinLengthValidator } from '../validators/MinLengthValidator'
import { RegularExpressionValidator } from '../validators/RegularExpressionValidator'

export class AddressValidation implements Validation {
  private readonly minLengthValidator: MinLengthValidator =
    new MinLengthValidator(5)
  private readonly zipCodeValidator: RegularExpressionValidator =
    new RegularExpressionValidator('^[0-9]{5}(?:-[0-9]{4})?$')

  public validate(state: IPersonState): string | undefined {
    if (!this.minLengthValidator.isValid(state.address1)) {
      return 'Address line 1 must be greater than 5 characters'
    }
    if (!this.minLengthValidator.isValid(state.town)) {
      return 'Town must be greater than 5 characters'
    }
    if (!this.minLengthValidator.isValid(state.county)) {
      return 'County must be greater than 5 characters'
    }
    if (!this.zipCodeValidator.isValid(state.postcode)) {
      return 'The postal/zip code is invalid'
    }
  }
}
