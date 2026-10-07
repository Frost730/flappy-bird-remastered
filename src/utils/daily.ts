import type { DailyChallenge } from '../types/game';

export const DAILY_REROLL_COST = 25;
export const MAX_DAILY_REROLLS = 3;

interface MissionTemplate {
  description: string;
  type: 'score' | 'coins' | 'pipes' | 'games' | 'time';
  target: number;
  reward: number;
  rarity: 'easy' | 'medium' | 'hard' | 'legendary';
}

const EASY_POOL: MissionTemplate[] = [
  { description: 'Score at least 8 in a single flight', type: 'score', target: 8, reward: 30, rarity: 'easy' },
  { description: 'Collect 6 coins in a single run', type: 'coins', target: 6, reward: 30, rarity: 'easy' },
  { description: 'Complete 3 flight attempts today', type: 'games', target: 3, reward: 25, rarity: 'easy' },
  { description: 'Pass 15 pipes across flights today', type: 'pipes', target: 15, reward: 35, rarity: 'easy' },
  { description: 'Stay airborne for 30 total seconds today', type: 'time', target: 30, reward: 30, rarity: 'easy' },
];

const MEDIUM_POOL: MissionTemplate[] = [
  { description: 'Reach a score of 16 in a single flight', type: 'score', target: 16, reward: 55, rarity: 'medium' },
  { description: 'Collect 12 coins in a single run', type: 'coins', target: 12, reward: 60, rarity: 'medium' },
  { description: 'Clear 40 total pipes across runs today', type: 'pipes', target: 40, reward: 65, rarity: 'medium' },
  { description: 'Fly for 90 seconds total today', type: 'time', target: 90, reward: 55, rarity: 'medium' },
  { description: 'Complete 6 flight attempts today', type: 'games', target: 6, reward: 50, rarity: 'medium' },
  { description: 'Score 20 points in a single flight', type: 'score', target: 20, reward: 75, rarity: 'medium' },
];

const HARD_POOL: MissionTemplate[] = [
  { description: 'Score 28 points in a single flight', type: 'score', target: 28, reward: 110, rarity: 'hard' },
  { description: 'Snag 20 coins in a single run', type: 'coins', target: 20, reward: 100, rarity: 'hard' },
  { description: 'Pass 75 total pipes across your runs', type: 'pipes', target: 75, reward: 120, rarity: 'hard' },
  { description: 'Accumulate 180 seconds of flight time today', type: 'time', target: 180, reward: 110, rarity: 'hard' },
  { description: 'Complete 10 flights in a single day', type: 'games', target: 10, reward: 95, rarity: 'hard' },
];

const LEGENDARY_POOL: MissionTemplate[] = [
  { description: 'Achieve an elite score of 38 in one flight', type: 'score', target: 38, reward: 200, rarity: 'legendary' },
  { description: 'Collect a massive 28 coins in a single flight', type: 'coins', target: 28, reward: 190, rarity: 'legendary' },
  { description: 'Clear 120 total pipes today', type: 'pipes', target: 120, reward: 220, rarity: 'legendary' },
  { description: 'Survive for 300 seconds (5 minutes) total flight time', type: 'time', target: 300, reward: 210, rarity: 'legendary' },
];

export function generateDailyChallenges(forceRandom = false): DailyChallenge[] {
  const dateStr = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed << 5) - seed + dateStr.charCodeAt(i);
    seed |= 0;
  }

  const pick = (arr: MissionTemplate[], salt: number): MissionTemplate => {
    if (forceRandom) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    const idx = Math.abs((seed + salt * 37) % arr.length);
    return arr[idx];
  };

  const selected = [
    pick(EASY_POOL, 1),
    pick(MEDIUM_POOL, 2),
    pick(HARD_POOL, 3),
    pick(LEGENDARY_POOL, 4)
  ];

  return selected.map((tpl, i) => ({
    id: `daily_${tpl.type}_${tpl.target}_${i}_${forceRandom ? Date.now() : Math.abs(seed)}`,
    description: tpl.description,
    type: tpl.type,
    target: tpl.target,
    reward: tpl.reward,
    progress: 0,
    completed: false,
    rarity: tpl.rarity
  }));
}

export function checkDailyReset(
  lastDateStr: string | null,
  currentChallenges: DailyChallenge[],
  currentRerolls = 0
): { reset: boolean; challenges: DailyChallenge[]; rerollsUsed: number } {
  const todayStr = new Date().toDateString();

  if (!lastDateStr || lastDateStr !== todayStr || currentChallenges.length === 0) {
    return {
      reset: true,
      challenges: generateDailyChallenges(),
      rerollsUsed: 0
    };
  }

  return {
    reset: false,
    challenges: currentChallenges,
    rerollsUsed: currentRerolls
  };
}
