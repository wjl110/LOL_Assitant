export const mockMatchData: MatchData = {
  gameId: "TEST_GAME_1",
  gameDuration: 1800, // 30分钟
  participants: [
    {
      participantId: 1,
      summonerName: "测试玩家1",
      championId: 1,
      teamId: 100,
      stats: {
        kills: 5,
        deaths: 3,
        assists: 7,
        goldEarned: 12000,
        totalDamageDealtToChampions: 15000,
        visionScore: 25,
        totalMinionsKilled: 180
      }
    },
    // ... 添加更多玩家数据
  ],
  teams: [
    {
      teamId: 100,
      win: true,
      objectives: {
        dragon: 3,
        baron: 1,
        tower: 8
      }
    },
    {
      teamId: 200,
      win: false,
      objectives: {
        dragon: 1,
        baron: 0,
        tower: 4
      }
    }
  ],
  timeline: [
    {
      timestamp: 300000, // 5分钟
      type: "CHAMPION_KILL",
      position: { x: 1000, y: 1000 },
      killerId: 1,
      victimId: 6,
      assistingParticipantIds: [2, 3]
    },
    // ... 添加更多时间线事件
  ]
}; 