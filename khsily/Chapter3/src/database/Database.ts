import { RecordState } from '../recordState';
import { ITable } from './TableBuilder';

export class Database<T extends RecordState> {
  private readonly indexDb: IDBFactory;
  private database: IDBDatabase | null = null;
  private readonly table: ITable;

  private ready: boolean = false;
  private onReadyHandler?: (database: this) => void;

  constructor(table: ITable) {
    this.indexDb = window.indexedDB;
    this.table = table;
    this.openDatabase();
  }

  private openDatabase(): void {
    const open = this.indexDb.open(this.table.database(), this.table.version());
    open.onupgradeneeded = () => {
      this.upgradeDatabase(open.result);
    };
    open.onsuccess = () => {
      this.database = open.result;
      this.ready = true;
      this.onReadyHandler?.(this);
    };
  }

  private upgradeDatabase(database: IDBDatabase): void {
    this.database = database;
    this.table.build(this.database);
  }

  private getObjectStore(): IDBObjectStore | null {
    try {
      const transaction = this.database!.transaction(this.table.tableName(), 'readwrite');
      const dbStore = transaction.objectStore(this.table.tableName());
      return dbStore;
    } catch (Error) {
      return null;
    }
  }

  create(state: T): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore();
      const innerRequest = dbStore!.add(state);
      innerRequest.onsuccess = () => resolve();
    });
  }

  read(): Promise<T[]> {
    return new Promise((response) => {
      const dbStore = this.getObjectStore();
      const items: T[] = new Array<T>();
      const request = dbStore!.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const result: T = cursor.value;
          if (result.isActive) items.push(result);
          cursor.continue();
        } else {
          response(items);
        }
      };
    });
  }

  update(state: T): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore();
      const innerRequest = dbStore!.put(state);
      innerRequest.onsuccess = () => resolve();
    });
  }

  delete(idx: number | string): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore();
      const innerRequest = dbStore!.delete(idx.toString());
      innerRequest.onsuccess = () => resolve();
    });
  }

  onReady(handler: (database: Database<T>) => void): void {
    this.onReadyHandler = handler;
    if (this.ready) this.onReadyHandler!(this);
  }
}
