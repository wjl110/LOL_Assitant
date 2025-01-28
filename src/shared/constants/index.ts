export const API_BASE_URL = 'https://riot-api.com/api/v1';

export const GAME_REGIONS = {
  NA: 'na1',
  EUW: 'euw1',
  KR: 'kr',
  CN: 'cn1'
} as const;

export const QUEUE_TYPES = {
  RANKED_SOLO: 420,
  RANKED_FLEX: 440,
  NORMAL_DRAFT: 400,
  NORMAL_BLIND: 430
} as const;

export const LOCAL_STORAGE_KEYS = {
  API_KEY: 'riot_api_key',
  USER_SETTINGS: 'user_settings',
  MATCH_HISTORY: 'match_history'
} as const; 