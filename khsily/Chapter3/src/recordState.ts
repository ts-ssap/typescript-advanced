import { IPersonState } from './state';

export interface IRecordState {
  isActive?: boolean;
}

export class RecordState implements IRecordState {
  isActive?: boolean;
}

export type PersonRecord = RecordState & IPersonState;
