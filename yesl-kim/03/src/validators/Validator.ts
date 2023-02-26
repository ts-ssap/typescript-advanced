import { StringOrNull } from '../types'

export const Validator = {
  minLengthValidator: (minLength: number) => (input: StringOrNull) => {
    if (!input) {
      return false
    }
    return input.length >= minLength
  },
  regularExpressionValidator: (expression: string) => {
    const regExp = new RegExp(expression)

    const isValid = (input: StringOrNull) => {
      if (!input) {
        return false
      }
      return regExp.test(input)
    }

    return isValid
  },
}
