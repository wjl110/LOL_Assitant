import { DB_VERSION } from '@shared/database/config';

class IndexedDBManager {
  private dbName = 'lol-analysis-cache';
  private db: IDBDatabase | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 创建对象仓库
        if (!db.objectStoreNames.contains('matchCache')) {
          db.createObjectStore('matchCache', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('championCache')) {
          db.createObjectStore('championCache', { keyPath: 'id' });
        }
      };
    });
  }

  async set(store: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'));
        return;
      }

      const transaction = this.db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get<T>(store: string, key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'));
        return;
      }

      const transaction = this.db.transaction(store, 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(store: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'));
        return;
      }

      const transaction = this.db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const idbManager = new IndexedDBManager(); 