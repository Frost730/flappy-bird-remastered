import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { GameView } from './components/GameView';
import { sound } from './utils/sound';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateDailyChallenges, checkDailyReset } from './utils/daily';
import { INITIAL_ACHIEVEMENTS } from './utils/constants';
import type { GameSettings, PlayerStats, LeaderboardEntry, Achievement, DailyChallenge } from './types/game';
import { Award, X } from 'lucide-react';

const DEFAULT_SETTINGS: GameSettings = {
  bgmVolume: 0.3,
  sfxVolume: 0.5,
  currentTheme: 'classic',
  currentBird: 'classic',
  currentPipe: 'classic',
};

const DEFAULT_STATS: PlayerStats = {
  highScore: 0,
  gamesPlayed: 0,
  totalCoins: 0,
  totalFlightTime: 0,
  totalPipesPassed: 0,
  totalScoreSum: 0,
  averageScore: 0,
};

function App() {
  // 1. Persistent State variables
  const [coins, setCoins] = useLocalStorage<number>('fbp_coins', 0);
  const [unlockedBirds, setUnlockedBirds] = useLocalStorage<string[]>('fbp_unlocked_birds', ['classic']);
  const [unlockedPipes, setUnlockedPipes] = useLocalStorage<string[]>('fbp_unlocked_pipes', ['classic']);
  const [unlockedThemes, setUnlockedThemes] = useLocalStorage<string[]>('fbp_unlocked_themes', ['classic']);
  const [settings, setSettings] = useLocalStorage<GameSettings>('fbp_settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage<PlayerStats>('fbp_stats', DEFAULT_STATS);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('fbp_leaderboard', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('fbp_achievements', INITIAL_ACHIEVEMENTS);
  const [dailyChallenges, setDailyChallenges] = useLocalStorage<DailyChallenge[]>('fbp_daily_challenges', []);
  const [lastChallengeDate, setLastChallengeDate] = useLocalStorage<string | null>('fbp_last_challenge_date', null);
  const [scoreHistory, setScoreHistory] = useLocalStorage<number[]>('fbp_score_history', []);

  // 2. Client UI States
  const [activeView, setActiveView] = useState<'DASHBOARD' | 'GAME'>('DASHBOARD');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Initialize Sound Volume levels on startup
  useEffect(() => {
    sound.setBGMVolume(settings.bgmVolume);
    sound.setSFXVolume(settings.sfxVolume);
    sound.updateTheme(settings.currentTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Daily Challenge Generation check
  useEffect(() => {
    const { reset, challenges } = checkDailyReset(lastChallengeDate, dailyChallenges);
    if (reset) {
      setDailyChallenges(challenges);
      setLastChallengeDate(new Date().toDateString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show a slide-down toast when achievement unlocks
  const triggerAchievementToast = (title: string) => {
    setActiveToast(title);
    sound.playPoint(); // retro sound cue
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  // Check if a score is leaderboard-worthy
  const isLeaderboardWorthy = (score: number) => {
    if (score <= 0) return false;
    if (leaderboard.length < 10) return true;
    return score > Math.min(...leaderboard.map((e) => e.score));
  };

  // Submit and save new score to leaderboard
  const handleSaveLeaderboard = (name: string, score: number) => {
    const newEntry: LeaderboardEntry = {
      name,
      score,
      date: new Date().toLocaleDateString()
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
  };

  // Core gameplay result handler
  const handleGameOver = (score: number, coinsCollected: number, flightSeconds: number) => {
    // A. Update Statistics
    const nextGamesPlayed = stats.gamesPlayed + 1;
    const nextScoreSum = stats.totalScoreSum + score;
    const nextHighScore = Math.max(stats.highScore, score);
    const nextCoins = coins + coinsCollected;
    const nextPipesPassed = stats.totalPipesPassed + score;
    const nextFlightTime = stats.totalFlightTime + flightSeconds;

    const updatedStats: PlayerStats = {
      highScore: nextHighScore,
      gamesPlayed: nextGamesPlayed,
      totalCoins: nextCoins,
      totalFlightTime: nextFlightTime,
      totalPipesPassed: nextPipesPassed,
      totalScoreSum: nextScoreSum,
      averageScore: parseFloat((nextScoreSum / nextGamesPlayed).toFixed(1))
    };
    setStats(updatedStats);
    setCoins(nextCoins);

    // Save recent score history
    const nextHistory = [...scoreHistory, score];
    setScoreHistory(nextHistory);

    // B. Progress Daily Challenges
    const updatedChallenges = dailyChallenges.map((challenge) => {
      if (challenge.completed) return challenge;
      let progress = challenge.progress;
      if (challenge.type === 'score') {
        progress = Math.max(progress, score);
      } else if (challenge.type === 'coins') {
        progress = Math.max(progress, coinsCollected);
      } else if (challenge.type === 'pipes') {
        progress += score;
      }

      const completed = progress >= challenge.target;
      if (completed && !challenge.completed) {
        // Award bonus coins for finishing a daily mission!
        setCoins((prev) => prev + challenge.reward);
      }

      return { ...challenge, progress, completed };
    });
    setDailyChallenges(updatedChallenges);

    // C. Update Achievements progress
    const updatedAchievements = achievements.map((achievement) => {
      if (achievement.unlocked) return achievement;

      let progress = achievement.progress;

      if (achievement.id === 'first_flight') {
        progress = 1;
      } else if (achievement.id === 'score_10') {
        progress = Math.max(progress, score);
      } else if (achievement.id === 'score_25') {
        progress = Math.max(progress, score);
      } else if (achievement.id === 'score_50') {
        progress = Math.max(progress, score);
      } else if (achievement.id === 'score_100') {
        progress = Math.max(progress, score);
      } else if (achievement.id === 'coin_100') {
        progress = nextCoins;
      } else if (achievement.id === 'coin_500') {
        progress = nextCoins;
      } else if (achievement.id === 'skins_all') {
        progress = unlockedBirds.length;
      } else if (achievement.id === 'time_300') {
        progress = nextFlightTime;
      }

      const unlocked = progress >= achievement.target;
      let unlockedAt = achievement.unlockedAt;

      if (unlocked && !achievement.unlocked) {
        unlockedAt = new Date().toLocaleDateString();
        // Fire celebration toast
        triggerAchievementToast(achievement.title);
      }

      return { ...achievement, progress, unlocked, unlockedAt };
    });
    setAchievements(updatedAchievements);
  };

  // Reset entire Profile
  const handleResetAll = () => {
    window.localStorage.clear();
    setCoins(0);
    setUnlockedBirds(['classic']);
    setUnlockedPipes(['classic']);
    setUnlockedThemes(['classic']);
    setSettings(DEFAULT_SETTINGS);
    setStats(DEFAULT_STATS);
    setLeaderboard([]);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setDailyChallenges(generateDailyChallenges());
    setLastChallengeDate(new Date().toDateString());
    setScoreHistory([]);
    
    // reset sound context settings
    sound.updateTheme('classic');
    sound.setBGMVolume(DEFAULT_SETTINGS.bgmVolume);
    sound.setSFXVolume(DEFAULT_SETTINGS.sfxVolume);
  };

  return (
    <main className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:p-4 text-slate-100 relative">
      {/* Dynamic View Swapper */}
      {activeView === 'DASHBOARD' ? (
        <Dashboard
          stats={stats}
          coins={coins}
          setCoins={setCoins}
          unlockedBirds={unlockedBirds}
          setUnlockedBirds={setUnlockedBirds}
          unlockedPipes={unlockedPipes}
          setUnlockedPipes={setUnlockedPipes}
          unlockedThemes={unlockedThemes}
          setUnlockedThemes={setUnlockedThemes}
          settings={settings}
          setSettings={setSettings}
          leaderboard={leaderboard}
          achievements={achievements}
          dailyChallenges={dailyChallenges}
          scoreHistory={scoreHistory}
          onResetAll={handleResetAll}
          onStartGame={() => setActiveView('GAME')}
        />
      ) : (
        <GameView
          themeId={settings.currentTheme}
          birdSkinId={settings.currentBird}
          pipeSkinId={settings.currentPipe}
          currentHighScore={stats.highScore}
          isLeaderboardWorthy={isLeaderboardWorthy}
          onSaveLeaderboard={handleSaveLeaderboard}
          onGameOver={handleGameOver}
          onBackToMenu={() => setActiveView('DASHBOARD')}
        />
      )}

      {/* Achievement unlocked toast alert overlay */}
      {activeToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 glass-panel p-4 rounded-2xl border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center gap-3.5 z-50 animate-bounce max-w-[90%] w-[320px]">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Achievement Unlocked!</div>
            <div className="text-white font-extrabold text-sm truncate mt-0.5">{activeToast}</div>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
