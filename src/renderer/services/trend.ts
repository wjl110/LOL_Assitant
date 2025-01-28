import { dbManager } from '@main/database/sqlite';
import { MatchData } from '@shared/types';

export const trendService = {
  async getWinRateTrend(summonerId: string, period: 'week' | 'month' | 'year'): Promise<{
    date: string;
    winRate: number;
    gamesPlayed: number;
  }[]> {
    const timeRange = this.getTimeRange(period);
    const matches = await dbManager.all<{data: string}>(
      `SELECT data FROM matches 
       WHERE timestamp >= ? 
       AND JSON_EXTRACT(data, '$.participants[*].summonerId') LIKE ?
       ORDER BY timestamp ASC`,
      [timeRange, `%${summonerId}%`]
    );

    return this.calculateTrend(matches.map(m => JSON.parse(m.data)), period);
  },

  private getTimeRange(period: 'week' | 'month' | 'year'): number {
    const now = Date.now();
    switch (period) {
      case 'week':
        return now - 7 * 24 * 60 * 60 * 1000;
      case 'month':
        return now - 30 * 24 * 60 * 60 * 1000;
      case 'year':
        return now - 365 * 24 * 60 * 60 * 1000;
    }
  },

  private calculateTrend(matches: MatchData[], period: 'week' | 'month' | 'year') {
    // 实现趋势计算逻辑
    return [];
  }
}; 