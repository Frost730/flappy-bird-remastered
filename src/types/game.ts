export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAMEOVER';

export interface BirdSkin {
  id: string;
  name: string;
  cost: number;
  unlocked: boolean;
  color: string;      // Body fill color (hex or CSS color)
  eyeColor: string;
  beakColor: string;
  wingColor: string;
}

export interface PipeSkin {
  id: string;
  name: string;
  cost: number;
  unlocked: boolean;
  primaryColor: string;
  accentColor: string;
  glowColor?: string;
}

export interface ThemeSkin {
  id: string;
  name: string;
  cost: number;
  unlocked: boolean;
  skyColor: string;
  groundColor: string;
  obstacleColor: string;
  description: string;
}

export interface PlayerStats {
  highScore: number;
  gamesPlayed: number;
  totalCoins: number;
  totalFlightTime: number; // in seconds
  totalPipesPassed: number;
  totalScoreSum: number; // used to compute average
  averageScore: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DailyChallenge {
  id: string;
  description: string;
  type: 'score' | 'coins' | 'pipes';
  target: number;
  reward: number;
  progress: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export interface GameSettings {
  bgmVolume: number;
  sfxVolume: number;
  currentTheme: string;
  currentBird: string;
  currentPipe: string;
}
