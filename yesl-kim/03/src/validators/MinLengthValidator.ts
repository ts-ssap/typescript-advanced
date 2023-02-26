import { StringOrNull, Validator } from '../types'

export class MinLengthValidator implements Validator<StringOrNull> {
  private minLength: number
  constructor(minLength: number) {
    this.minLength = minLength
  }
  public isValid(input: StringOrNull): boolean {
    if (!input) {
      return false
    }
    return input.length >= this.minLength
  }
}
