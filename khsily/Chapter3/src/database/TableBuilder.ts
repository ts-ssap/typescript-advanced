import { StringOrNull } from '../types';

export interface ITableBuilder {
  withDatabase(databaseName: string): ITableBuilder;
  withVersion(version: number): ITableBuilder;
  withTableName(tableName: string): ITableBuilder;
  withPrimaryField(primaryField: string): ITableBuilder;
  withIndexName(indexName: string): ITableBuilder;
}

export interface ITable {
  database(): string;
  version(): number;
  tableName(): string;
  indexName(): string;
  build(database: IDBDatabase): void;
}

export class TableBuilder implements ITableBuilder, ITable {
  private _database: StringOrNull = null;
  private _tableName: StringOrNull = null;
  private _primaryField: StringOrNull = null;
  private _indexName: StringOrNull = null;
  private _version: number = 1;

  withDatabase(databaseName: string): ITableBuilder {
    this._database = databaseName;
    return this;
  }

  withVersion(versionNumber: number): ITableBuilder {
    this._version = versionNumber;
    return this;
  }

  withTableName(tableName: string): ITableBuilder {
    this._tableName = tableName;
    return this;
  }

  withPrimaryField(primaryField: string): ITableBuilder {
    this._primaryField = primaryField;
    return this;
  }

  withIndexName(indexName: string): ITableBuilder {
    this._indexName = indexName;
    return this;
  }

  database(): string {
    if (!this._database) throw new Error('You must give a database name');
    return this._database;
  }

  version(): number {
    return this._version;
  }

  tableName(): string {
    if (!this._tableName) throw new Error('You must give a table name');
    return this._tableName;
  }

  indexName(): string {
    if (!this._indexName) throw new Error('You must specify an index name');
    return this._indexName;
  }

  build(database: IDBDatabase): void {
    const parameters: IDBObjectStoreParameters = { keyPath: this._primaryField };
    const objectStore = database.createObjectStore(this._tableName!, parameters);
    objectStore.createIndex(this._indexName!, this._primaryField!);
  }
}
