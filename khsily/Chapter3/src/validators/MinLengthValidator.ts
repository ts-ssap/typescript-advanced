import { StringOrNull } from '../types';
import { IValidator } from './IValidator';

export class MinLengthValidator implements IValidator<StringOrNull> {
  private minLength: number;

  constructor(minLength: number) {
    this.minLength = minLength;
  }

  isValid(input: StringOrNull): boolean {
    if (!input) return false;
    return input.length >= this.minLength;
  }
}
