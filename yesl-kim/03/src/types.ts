import { IPersonState, IRecordState, RecordState } from './state'

export type StringOrNull = string | null

export interface Validator<T> {
  isValid: (input: T) => boolean
}

export interface Validation {
  validate: (state: IPersonState, errors: string[]) => void
}

// 테이블 생성
export interface ITableBuilder {
  withDatabase(databaseName: string): ITableBuilder
  withVersion(version: number): ITableBuilder
  withTableName(tableName: string): ITableBuilder
  withPrimaryField(primaryField: string): ITableBuilder
  withIndexName(indexName: string): ITableBuilder
}

// 테이블에서 값 조회
export interface ITable {
  database(): string
  version(): number
  tableName(): string
  indexName(): string
  build(database: IDBDatabase): void
}

export type PersonRecord = RecordState & IPersonState
