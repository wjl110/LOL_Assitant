import path from 'path';
import { app } from 'electron';

// Mac 上的数据存储路径
export const DB_PATH = path.join(
  app.getPath('userData'),
  'lol-analysis.db'
);

export const TABLES = {
  MATCHES: 'matches',
  CHAMPIONS: 'champions',
  SUMMONERS: 'summoners',
  ANALYSIS: 'analysis'
} as const;

export const DB_VERSION = 1; 