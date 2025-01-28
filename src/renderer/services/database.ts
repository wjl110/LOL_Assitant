import { dbManager } from '@main/database/sqlite';
import { idbManager } from '@renderer/database/indexedDB';
import { MatchData, ChampionData } from '@shared/types';

export const matchDataService = {
  async saveMatch(match: MatchData): Promise<void> {
    // 保存到 SQLite
    await dbManager.run(
      'INSERT OR REPLACE INTO matches (id, gameId, timestamp, duration, data) VALUES (?, ?, ?, ?, ?)',
      [match.id, match.gameId, Date.now(), match.gameDuration, JSON.stringify(match)]
    );

    // 缓存到 IndexedDB
    await idbManager.set('matchCache', {
      id: match.gameId,
      data: match,
      timestamp: Date.now()
    });
  },

  async getMatch(gameId: string): Promise<MatchData | null> {
    // 先从缓存获取
    const cached = await idbManager.get<{data: MatchData}>('matchCache', gameId);
    if (cached) return cached.data;

    // 从 SQLite 获取
    const match = await dbManager.get<{data: string}>(
      'SELECT data FROM matches WHERE gameId = ?',
      [gameId]
    );

    return match ? JSON.parse(match.data) : null;
  },

  async getRecentMatches(limit: number = 20): Promise<MatchData[]> {
    const matches = await dbManager.all<{data: string}>(
      'SELECT data FROM matches ORDER BY timestamp DESC LIMIT ?',
      [limit]
    );

    return matches.map(match => JSON.parse(match.data));
  }
}; 