// 计算 KDA
export const calculateKDA = (kills: number, deaths: number, assists: number): number => {
  return deaths === 0 ? kills + assists : (kills + assists) / deaths;
};

// 格式化时间
export const formatGameDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 本地存储工具
export const storage = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}; 