import { Input } from 'reactstrap'
import { StringOrNull, Validator } from '../types'

export class RegularExpressionValidator implements Validator<StringOrNull> {
  private regExp: RegExp
  constructor(expression: string) {
    this.regExp = new RegExp(expression)
  }

  public isValid(input: StringOrNull): boolean {
    if (!input) {
      return false
    }
    return this.regExp.test(input)
  }
}
