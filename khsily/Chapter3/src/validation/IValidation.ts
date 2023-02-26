import { IPersonState } from '../state';

export interface IValidation {
  validate(state: IPersonState): string[];
}
