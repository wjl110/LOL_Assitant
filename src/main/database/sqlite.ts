import sqlite3 from 'sqlite3';
import { DB_PATH } from './config';

class DatabaseManager {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('数据库连接失败:', err);
      } else {
        console.log('数据库连接成功');
        this.initTables();
      }
    });
  }

  private async initTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        gameId TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        data TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS champions (
        id INTEGER PRIMARY KEY,
        key TEXT NOT NULL,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        data TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS summoners (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        level INTEGER NOT NULL,
        lastUpdate INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS analysis (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        data TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )`
    ];

    for (const table of tables) {
      await this.run(table);
    }
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async get<T>(sql: string, params: any[] = []): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row as T);
      });
    });
  }

  async all<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export const dbManager = new DatabaseManager(); 