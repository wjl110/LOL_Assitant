import { dbManager } from '@main/database/sqlite';
import { MatchData } from '@shared/types';

export const analysisService = {
  async analyzeMatch(matchData: MatchData) {
    const analysis = {
      teamStats: this.analyzeTeamStats(matchData),
      playerPerformance: this.analyzePlayerPerformance(matchData),
      objectives: this.analyzeObjectives(matchData),
      keyEvents: this.analyzeKeyEvents(matchData)
    };

    // 保存分析结果
    await dbManager.run(
      'INSERT OR REPLACE INTO analysis (id, type, data, timestamp) VALUES (?, ?, ?, ?)',
      [matchData.gameId, 'match', JSON.stringify(analysis), Date.now()]
    );

    return analysis;
  },

  private analyzeTeamStats(match: MatchData) {
    const teams = {
      blue: {
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
        towers: 0,
        dragons: 0,
        barons: 0,
        visionScore: 0,
        winProbability: 0
      },
      red: {
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
        towers: 0,
        dragons: 0,
        barons: 0,
        visionScore: 0,
        winProbability: 0
      }
    };

    match.participants.forEach(p => {
      const team = p.teamId === 100 ? 'blue' : 'red';
      teams[team].kills += p.stats.kills;
      teams[team].deaths += p.stats.deaths;
      teams[team].assists += p.stats.assists;
      teams[team].gold += p.stats.goldEarned;
      teams[team].visionScore += p.stats.visionScore;
    });

    // 计算胜率概率
    const blueAdvantage = this.calculateTeamAdvantage(teams.blue, teams.red);
    teams.blue.winProbability = this.calculateWinProbability(blueAdvantage);
    teams.red.winProbability = 1 - teams.blue.winProbability;

    return teams;
  },

  private calculateTeamAdvantage(team1: any, team2: any) {
    const goldWeight = 0.4;
    const killsWeight = 0.3;
    const visionWeight = 0.3;

    const goldAdvantage = (team1.gold - team2.gold) / (team1.gold + team2.gold);
    const killsAdvantage = (team1.kills - team2.kills) / Math.max(1, team1.kills + team2.kills);
    const visionAdvantage = (team1.visionScore - team2.visionScore) / (team1.visionScore + team2.visionScore);

    return (
      goldAdvantage * goldWeight +
      killsAdvantage * killsWeight +
      visionAdvantage * visionWeight
    );
  },

  private calculateWinProbability(advantage: number): number {
    // 使用 sigmoid 函数将优势转换为胜率
    return 1 / (1 + Math.exp(-5 * advantage));
  },

  private analyzePlayerPerformance(match: MatchData) {
    return match.participants.map(p => ({
      participantId: p.participantId,
      championId: p.championId,
      teamId: p.teamId,
      stats: {
        kda: (p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths),
        killParticipation: this.calculateKillParticipation(p, match),
        damageShare: this.calculateDamageShare(p, match),
        goldShare: this.calculateGoldShare(p, match),
        visionScore: p.stats.visionScore,
        csPerMinute: this.calculateCSPerMinute(p, match),
        damagePerGold: p.stats.totalDamageDealtToChampions / Math.max(1, p.stats.goldEarned),
        performanceScore: 0 // 将在下面计算
      }
    }));
  },

  private calculateKillParticipation(player: any, match: MatchData): number {
    const teamKills = match.participants
      .filter(p => p.teamId === player.teamId)
      .reduce((sum, p) => sum + p.stats.kills, 0);
    return teamKills === 0 ? 0 : (player.stats.kills + player.stats.assists) / teamKills;
  },

  private calculateDamageShare(player: any, match: MatchData): number {
    const teamDamage = match.participants
      .filter(p => p.teamId === player.teamId)
      .reduce((sum, p) => sum + p.stats.totalDamageDealtToChampions, 0);
    return teamDamage === 0 ? 0 : player.stats.totalDamageDealtToChampions / teamDamage;
  },

  private calculateGoldShare(player: any, match: MatchData): number {
    const teamGold = match.participants
      .filter(p => p.teamId === player.teamId)
      .reduce((sum, p) => sum + p.stats.goldEarned, 0);
    return teamGold === 0 ? 0 : player.stats.goldEarned / teamGold;
  },

  private calculateCSPerMinute(player: any, match: MatchData): number {
    return player.stats.totalMinionsKilled / (match.gameDuration / 60);
  },

  private analyzeObjectives(match: MatchData) {
    // 分析大龙、小龙、防御塔等目标的控制
    return {
      // 实现目标分析逻辑
    };
  },

  private analyzeKeyEvents(match: MatchData) {
    // 分析关键事件（一血、团战等）
    return {
      // 实现关键事件分析逻辑
    };
  }
}; 