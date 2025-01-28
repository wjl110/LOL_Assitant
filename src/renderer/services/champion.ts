import { dbManager } from '@main/database/sqlite';
import { idbManager } from '@renderer/database/indexedDB';
import { ChampionData } from '@shared/types';

export const championService = {
  async getAllChampions(): Promise<ChampionData[]> {
    const champions = await dbManager.all<{data: string}>(
      'SELECT data FROM champions'
    );
    return champions.map(c => JSON.parse(c.data));
  },

  async getChampionById(id: number): Promise<ChampionData | null> {
    // 先从缓存获取
    const cached = await idbManager.get<{data: ChampionData}>('championCache', id.toString());
    if (cached) return cached.data;

    // 从数据库获取
    const champion = await dbManager.get<{data: string}>(
      'SELECT data FROM champions WHERE id = ?',
      [id]
    );
    return champion ? JSON.parse(champion.data) : null;
  },

  async getCounters(championId: number): Promise<{
    champion: ChampionData;
    winRate: number;
    difficulty: number;
    description: string;
  }[]> {
    // 从分析表获取克制数据
    const counters = await dbManager.all<{data: string}>(
      `SELECT data FROM analysis 
       WHERE type = 'counter' AND id LIKE ?`,
      [`${championId}_%`]
    );

    const result = [];
    for (const counter of counters) {
      const data = JSON.parse(counter.data);
      const champion = await this.getChampionById(data.counterId);
      if (champion) {
        result.push({
          champion,
          winRate: data.winRate,
          difficulty: data.difficulty,
          description: data.description
        });
      }
    }

    return result;
  }
}; 