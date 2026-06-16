import type { DailyChallenge } from '../types/game';

export function generateDailyChallenges(): DailyChallenge[] {
  // Generate three distinct challenges based on difficulty
  return [
    {
      id: 'daily_score_15',
      description: 'Reach a score of 15 in a single run',
      type: 'score',
      target: 15,
      reward: 30,
      progress: 0,
      completed: false
    },
    {
      id: 'daily_coins_10',
      description: 'Collect 10 coins in a single run',
      type: 'coins',
      target: 10,
      reward: 40,
      progress: 0,
      completed: false
    },
    {
      id: 'daily_pipes_30',
      description: 'Pass 30 total pipes today',
      type: 'pipes',
      target: 30,
      reward: 50,
      progress: 0,
      completed: false
    }
  ];
}

export function checkDailyReset(
  lastDateStr: string | null,
  currentChallenges: DailyChallenge[]
): { reset: boolean; challenges: DailyChallenge[] } {
  const todayStr = new Date().toDateString();
  
  if (!lastDateStr || lastDateStr !== todayStr || currentChallenges.length === 0) {
    return {
      reset: true,
      challenges: generateDailyChallenges()
    };
  }
  
  return {
    reset: false,
    challenges: currentChallenges
  };
}
