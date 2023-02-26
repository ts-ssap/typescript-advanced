export interface IValidator<T> {
  isValid(input: T): boolean;
}
