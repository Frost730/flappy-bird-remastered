import React from 'react';
import type { LeaderboardEntry } from '../types/game';
import { Trophy, Medal, Calendar } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  // Sort entries by score descending and take top 10
  const sortedEntries = [...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-bold text-slate-500 w-5 text-center text-sm">{rank + 1}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 0) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200';
    if (rank === 1) return 'bg-slate-300/10 border-slate-300/30 text-slate-200';
    if (rank === 2) return 'bg-amber-600/10 border-amber-600/30 text-amber-200';
    return 'bg-slate-900/30 border-slate-800/40 text-slate-300';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pb-6 border-b border-slate-700/40">
        <h2 className="text-3xl font-extrabold text-white">Local Leaderboard</h2>
        <p className="text-slate-400 text-sm mt-1">Track the top 10 runs recorded on this device.</p>
      </div>

      {sortedEntries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-white text-lg font-bold">No runs recorded yet</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xs leading-relaxed">
            Take flight and setting some high scores to compete on the local leaderboard!
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto mt-6 pr-1 pb-6">
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-20">Rank</th>
                    <th className="py-4 px-6">Player</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {sortedEntries.map((entry, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-slate-800/20 transition-colors ${
                        index === 0 ? 'bg-yellow-500/5' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg border text-center ${getRankBg(index)}`}>
                          {getRankIcon(index)}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white text-sm sm:text-base">
                        {entry.name}
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {entry.date}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                        {entry.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Leaderboard;
