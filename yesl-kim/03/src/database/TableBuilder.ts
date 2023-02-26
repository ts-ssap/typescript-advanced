import { ITable, ITableBuilder, StringOrNull } from '../types'

export class TableBuilder implements ITableBuilder, ITable {
  private _database: StringOrNull
  private _tableName: StringOrNull
  private _primaryField: StringOrNull
  private _indexName: StringOrNull
  private _version: number = 1

  public withDatabase(databaseName: string): ITableBuilder {
    this._database = databaseName
    return this
  }

  public withTableName(tableName: string): ITableBuilder {
    this._tableName = tableName
    return this
  }

  public withPrimaryField(primaryField: string): ITableBuilder {
    this._primaryField = primaryField
    return this
  }

  public withIndexName(indexName: string): ITableBuilder {
    this._indexName = indexName
    return this
  }

  public withVersion(version: number): ITableBuilder {
    this._version = version
    return this
  }

  public database(): string {
    if (!this._database) {
      throw new Error('You must gibe a database name')
    }
    return this._database
  }

  public version(): number {
    return this._version
  }

  public tableName(): string {
    if (!this._tableName) {
      throw new Error('You must gibe a table name')
    }
    return this._tableName
  }

  public indexName(): string {
    if (!this._indexName) {
      throw new Error('You must specify an index name')
    }
    return this._indexName
  }

  public build(database: IDBDatabase): void {
    if (!this._tableName) {
      throw new Error('You must specify the table name')
    }
    if (!this._primaryField) {
      throw new Error('You must specify a primary field')
    }
    if (!this._indexName) {
      throw new Error('You must specify the index name')
    }

    const parameters: IDBObjectStoreParameters = { keyPath: this._primaryField }
    const objectStore = database.createObjectStore(this._tableName, parameters)
    objectStore.createIndex(this._indexName, this._primaryField)
  }
}
