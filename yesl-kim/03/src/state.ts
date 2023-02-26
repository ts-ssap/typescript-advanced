import { StringOrNull } from './types'

export interface IPersonState {
  firstName: string
  lastName: string
  address1: string
  address2: StringOrNull
  town: string
  county: string
  phoneNumber: string
  postcode: string
  dateOfBirth: StringOrNull
  personId: string
}

export interface IRecordState {
  isActive: boolean
}

export class RecordState implements IRecordState {
  public isActive: boolean

  constructor(initialState = false) {
    this.isActive = initialState
  }
}
