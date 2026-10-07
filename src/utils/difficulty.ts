import type { DifficultyMode } from '../types/game';

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  speed: number;
  gapSize: number;
  pipeSpacing: number;
  maxDeltaY: number;
  tier: DifficultyTier;
  tierLabel: string;
  tierEmoji: string;
}

export const DYNAMIC_EASY_THRESHOLD = 20;   // Easy: 0 - 19
export const DYNAMIC_MEDIUM_THRESHOLD = 50; // Medium: 20 - 49, Hard: 50+

export function getDifficultyConfig(score: number, mode: DifficultyMode = 'dynamic'): DifficultyConfig {
  if (mode === 'easy') {
    return {
      speed: 1.6,
      gapSize: 182,
      pipeSpacing: 290,
      maxDeltaY: 95,
      tier: 'easy',
      tierLabel: 'Easy',
      tierEmoji: '🌱'
    };
  }

  if (mode === 'medium') {
    return {
      speed: 1.95,
      gapSize: 156,
      pipeSpacing: 250,
      maxDeltaY: 120,
      tier: 'medium',
      tierLabel: 'Medium',
      tierEmoji: '⚡'
    };
  }

  if (mode === 'hard') {
    return {
      speed: 2.38,
      gapSize: 138,
      pipeSpacing: 220,
      maxDeltaY: 138,
      tier: 'hard',
      tierLabel: 'Hard',
      tierEmoji: '🔥'
    };
  }

  // Dynamic Mode: Easy (0-19) -> Medium (20-49) -> Hard (50+)
  // Extended durations so each difficulty stays longer and feels substantial
  if (score < DYNAMIC_EASY_THRESHOLD) {
    const p = score / DYNAMIC_EASY_THRESHOLD;
    return {
      speed: 1.55 + p * 0.22, // 1.55 -> 1.77
      gapSize: Math.round(186 - p * 16), // 186 -> 170
      pipeSpacing: Math.round(295 - p * 25), // 295 -> 270
      maxDeltaY: 90 + p * 18, // 90 -> 108
      tier: 'easy',
      tierLabel: 'Easy',
      tierEmoji: '🌱'
    };
  } else if (score < DYNAMIC_MEDIUM_THRESHOLD) {
    const p = (score - DYNAMIC_EASY_THRESHOLD) / (DYNAMIC_MEDIUM_THRESHOLD - DYNAMIC_EASY_THRESHOLD);
    return {
      speed: 1.82 + p * 0.32, // 1.82 -> 2.14
      gapSize: Math.round(166 - p * 18), // 166 -> 148
      pipeSpacing: Math.round(265 - p * 25), // 265 -> 240
      maxDeltaY: 110 + p * 18, // 110 -> 128
      tier: 'medium',
      tierLabel: 'Medium',
      tierEmoji: '⚡'
    };
  } else {
    // Hard Tier - "NOT IMPOSSIBLE"
    // Capped strictly so gaps are never narrower than 136px (more than 5.5x the bird's 24px height!)
    // Speed never exceeds 2.45
    // Horizontal spacing never below 215px
    // maxDeltaY capped at 140px (guaranteed reachable in a jump arc)
    const p = Math.min(1, (score - DYNAMIC_MEDIUM_THRESHOLD) / 30);
    return {
      speed: 2.18 + p * 0.27, // 2.18 -> max 2.45
      gapSize: Math.round(145 - p * 9), // 145 -> min 136
      pipeSpacing: Math.round(235 - p * 20), // 235 -> min 215
      maxDeltaY: Math.round(130 + p * 10), // 130 -> max 140
      tier: 'hard',
      tierLabel: 'Hard',
      tierEmoji: '🔥'
    };
  }
}
