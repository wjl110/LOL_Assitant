import { ApiResponse, MatchData } from '../../shared/types';
import { API_BASE_URL } from '../../shared/constants';

export const matchService = {
  async getCurrentMatch(summonerName: string): Promise<ApiResponse<MatchData>> {
    try {
      const response = await fetch(`${API_BASE_URL}/match/current/${summonerName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('获取对局数据失败');
    }
  },

  async getMatchHistory(summonerName: string, count: number = 20): Promise<ApiResponse<MatchData[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/match/history/${summonerName}?count=${count}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('获取历史对局失败');
    }
  }
}; 