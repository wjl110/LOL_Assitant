// 对局数据接口
export interface MatchData {
  gameId: string;
  gameDuration: number;
  participants: Participant[];
  teams: Team[];
  timeline: TimelineEvent[];
}

// 玩家数据接口
export interface Participant {
  participantId: number;
  summonerName: string;
  championId: number;
  teamId: number;
  stats: ParticipantStats;
}

// 玩家统计数据
export interface ParticipantStats {
  kills: number;
  deaths: number;
  assists: number;
  goldEarned: number;
  totalDamageDealtToChampions: number;
  visionScore: number;
  totalMinionsKilled: number;
}

// API 响应接口
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface Team {
  teamId: number;
  win: boolean;
  objectives: {
    dragon: number;
    baron: number;
    tower: number;
  };
}

export interface TimelineEvent {
  timestamp: number;
  type: 'CHAMPION_KILL' | 'BUILDING_KILL' | 'ELITE_MONSTER_KILL';
  position: { x: number; y: number };
  killerId: number;
  victimId?: number;
  assistingParticipantIds?: number[];
}

// 分析结果类型
export interface TeamAnalysis {
  teamStats: {
    blue: TeamStats;
    red: TeamStats;
  };
  playerPerformance: PlayerPerformance[];
  timeline: MatchTimeline[];
  keyEvents: KeyEvent[];
}

export interface TeamStats {
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
  towers: number;
  dragons: number;
  barons: number;
  visionScore: number;
  winProbability: number;
}

export interface PlayerPerformance {
  participantId: number;
  summonerName: string;
  championId: number;
  teamId: number;
  stats: {
    kda: number;
    killParticipation: number;
    damageShare: number;
    goldShare: number;
    visionScore: number;
    csPerMinute: number;
    damagePerGold: number;
    performanceScore: number;
  };
}

export interface MatchTimeline {
  timestamp: number;
  blueTeam: {
    totalGold: number;
    totalKills: number;
    totalObjectives: number;
  };
  redTeam: {
    totalGold: number;
    totalKills: number;
    totalObjectives: number;
  };
}

export interface KeyEvent {
  time: number;
  type: string;
  description: string;
  importance: number;
} 