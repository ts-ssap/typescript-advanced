import { StringOrNull } from './types';

export interface IPersonState {
  firstName: string;
  lastName: string;
  address1: string;
  address2: StringOrNull;
  town: string;
  county: string;
  phoneNumber: string;
  postcode: string;
  dateOfBirth: StringOrNull;
  personId: string;
}
