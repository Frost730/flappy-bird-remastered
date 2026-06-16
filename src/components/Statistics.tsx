import React from 'react';
import { PlayerStats } from '../types/game';
import { BarChart3, Trophy, Gamepad2, Hourglass, Coins } from 'lucide-react';

interface StatisticsProps {
  stats: PlayerStats;
  scoreHistory: number[]; // Array of recent game scores
}

export const Statistics: React.FC<StatisticsProps> = ({ stats, scoreHistory }) => {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.floor(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  // Safe division for average score
  const averageScore = stats.gamesPlayed > 0 
    ? (stats.totalScoreSum / stats.gamesPlayed).toFixed(1) 
    : '0.0';

  // Last 10 scores
  const recentScores = scoreHistory.slice(-10);
  const maxScore = Math.max(...recentScores, 5); // Fallback to 5 to keep height relative

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pb-6 border-b border-slate-700/40">
        <h2 className="text-3xl font-extrabold text-white">Player Stats</h2>
        <p className="text-slate-400 text-sm mt-1">Detailed dashboard showing your performance history.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1: High Score */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 rounded-lg text-yellow-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">High Score</div>
            <div className="text-white text-xl sm:text-2xl font-black mt-0.5">{stats.highScore}</div>
          </div>
        </div>

        {/* Card 2: Games Played */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 rounded-lg text-violet-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Games Played</div>
            <div className="text-white text-xl sm:text-2xl font-black mt-0.5">{stats.gamesPlayed}</div>
          </div>
        </div>

        {/* Card 3: Avg Score */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Avg Score</div>
            <div className="text-white text-xl sm:text-2xl font-black mt-0.5">{averageScore}</div>
          </div>
        </div>

        {/* Card 4: Flight Time */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Flight Time</div>
            <div className="text-white text-xl sm:text-2xl font-black mt-0.5">{formatTime(stats.totalFlightTime)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 flex-1 pb-6 overflow-y-auto pr-1">
        {/* Left Column: Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 lg:col-span-2 flex flex-col min-h-[280px]">
          <h3 className="text-white font-bold text-base flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-violet-400" /> Score History (Last 10 Games)
          </h3>
          
          {recentScores.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
              No games played yet. Play a game to see your history chart!
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-end">
              {/* Bars container */}
              <div className="flex items-end justify-between h-44 gap-2 border-b border-slate-800/80 px-2 pb-1.5">
                {recentScores.map((score, index) => {
                  const heightPercent = `${(score / maxScore) * 100}%`;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip */}
                      <div className="absolute -top-8 bg-slate-950 text-white border border-slate-800 text-[10px] py-1 px-2 rounded-md font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap shadow-lg">
                        Game #{scoreHistory.length - recentScores.length + index + 1}: {score} pts
                      </div>
                      {/* Bar */}
                      <div
                        className="w-full bg-gradient-to-t from-violet-600 to-indigo-400 hover:from-pink-500 hover:to-violet-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                        style={{ height: heightPercent }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              {/* X Axis labels */}
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-2 mt-2">
                {recentScores.map((_, index) => (
                  <span key={index} className="flex-1 text-center">
                    G{scoreHistory.length - recentScores.length + index + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Other Stats info */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-base flex items-center gap-2 mb-4">
              <Gamepad2 className="w-4 h-4 text-cyan-400" /> Milestone Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Pipes Passed</span>
                <span className="text-white font-extrabold text-base">{stats.totalPipesPassed}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Total Coins Earned</span>
                <span className="text-white font-extrabold text-base flex items-center gap-1">
                  <Coins className="w-4 h-4 text-amber-400" />
                  {stats.totalCoins}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Points Accumulated</span>
                <span className="text-white font-extrabold text-base">{stats.totalScoreSum}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/60 p-3 rounded-xl flex gap-2 items-start mt-4">
            <Hourglass className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-slate-400 text-xs leading-relaxed">
              Coin and point rewards scale as you play. Unlocking and equipping new skins helps you conquer daily challenges!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
