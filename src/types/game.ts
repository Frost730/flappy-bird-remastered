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
  special?: 'classic' | 'fire' | 'mecha' | 'crown' | 'ninja' | 'toxic' | 'cosmic' | 'random';
  description?: string;
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
  category?: 'milestone' | 'skill' | 'collection' | 'secret';
  rarity?: 'bronze' | 'silver' | 'gold' | 'diamond';
  icon?: string;
  reward?: number;
  isSecret?: boolean;
}

export interface DailyChallenge {
  id: string;
  description: string;
  type: 'score' | 'coins' | 'pipes' | 'games' | 'time';
  target: number;
  reward: number;
  progress: number;
  completed: boolean;
  rarity?: 'easy' | 'medium' | 'hard' | 'legendary';
}

export type DifficultyTier = 'easy' | 'medium' | 'hard';
export type DifficultyMode = 'dynamic' | 'easy' | 'medium' | 'hard';

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  difficulty?: DifficultyMode;
  difficultyTier?: DifficultyTier;
}

export interface GameSettings {
  bgmVolume: number;
  sfxVolume: number;
  currentTheme: string;
  currentBird: string;
  currentPipe: string;
  difficulty: DifficultyMode;
}
