import { RecordState } from '../state'
import { ITable } from '../types'

export class Database<T extends RecordState> {
  private readonly indexDb: IDBFactory
  private database: IDBDatabase | null = null
  private readonly table: ITable

  constructor(table: ITable) {
    this.indexDb = window.indexedDB
    this.table = table
    this.openDatabase()
  }

  private openDatabase(): void {
    const open = this.indexDb.open(this.table.database(), this.table.version())
    open.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      this.upgradeDatabase(open.result)
    }
    open.onsuccess = () => {
      this.database = open.result
    }
  }

  private upgradeDatabase(database: IDBDatabase) {
    this.database = database
    this.table.build(this.database)
  }

  private getObjectStore(): IDBObjectStore | null {
    try {
      // TODO:  !. 을 쓰는건 에러가 나도 catch로 잡기 때문일까?
      // throw error 하지 않아도 되나? 시기적으로 database가 없을 일이 없어서?
      const transaction: IDBTransaction = this.database!.transaction(
        this.table.tableName(),
        'readwrite'
      )
      const dbStore: IDBObjectStore = transaction.objectStore(
        this.table.tableName()
      )
      return dbStore
    } catch (error) {
      return null
    }
  }

  public create(state: T): void {
    const dbStore = this.getObjectStore()
    dbStore!.add(state)
    // TODO: dbStore?.put(state) 이 둘의 차이는?
  }

  // 원본. 콜백을 사용할 때 (onsuccess는 이벤트 핸들러이며 비동기로 호출된다)
  // public read(callback: (value: T[]) => void) {
  //   const dbStore = this.getObjectStore()
  //   const items: T[] = new Array<T>()

  //   const request = dbStore!.openCursor()
  //   request.onsuccess = (e: any) => {
  //     const cursor: IDBCursorWithValue = e.target.result
  //     if(cursor) {
  //       const result: T = cursor.value
  //       if(result.isActive) {
  //         items.push(result)
  //       }
  //       cursor.continue()
  //     } else {
  //       callback(items)
  //     }
  //   }
  // }

  // 프로미스를 사용하면 콜백 함수를 인자로 전달받지 않아도 된다.
  public read(): Promise<T[]> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore()
      const items: T[] = []
      const request = dbStore!.openCursor()
      // 데이터베이스 접근하는 게 비동기 통신이 아니라
      // 이벤트 핸들러로 처리된다는 게 생소함
      request.onsuccess = (e: any) => {
        const cursor: IDBCursorWithValue = e.target.result
        if (cursor) {
          const result = cursor.value
          if (result.isActive) {
            items.push(result)
          }
          cursor.continue
        } else {
          resolve(items)
        }
      }
    })
  }

  public update(state: T): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore()
      const innerRequest: IDBRequest = dbStore!.put(state)
      innerRequest.onsuccess = () => {
        resolve()
      }
    })
  }

  public delete(idx: number | string): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.getObjectStore()
      const innerRequest = dbStore!.delete(idx.toString())
      innerRequest.onsuccess = () => {
        resolve()
      }
    })
  }
}
