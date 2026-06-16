import React from 'react';
import type { Achievement } from '../types/game';
import { Award, Lock, CheckCircle2, Clock } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/40 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Achievements</h2>
          <p className="text-slate-400 text-sm mt-1">Unlock custom badges by reaching milestones in the game.</p>
        </div>
        {/* Progress Summary */}
        <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 px-4 py-2 rounded-full w-fit">
          <Award className="w-5 h-5 text-violet-400" />
          <span className="font-extrabold text-violet-300 text-lg">
            {unlockedCount} / {achievements.length}
          </span>
          <span className="text-violet-400/70 text-xs font-medium uppercase tracking-wider">Unlocked</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 overflow-y-auto pr-1 flex-1 pb-6">
        {achievements.map((achievement) => {
          const progressPercent = Math.min(
            100,
            Math.max(0, (achievement.progress / achievement.target) * 100)
          );

          return (
            <div
              key={achievement.id}
              className={`glass-panel p-5 rounded-2xl border flex gap-4 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 to-slate-900/60 shadow-md shadow-yellow-500/5'
                  : 'border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  achievement.unlocked
                    ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400 animate-pulse'
                    : 'bg-slate-950/80 border-slate-800 text-slate-500'
                }`}
              >
                {achievement.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
              </div>

              {/* Contents */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white text-base font-bold truncate">{achievement.title}</h3>
                    {achievement.unlocked && (
                      <span className="text-emerald-400 shrink-0 flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{achievement.description}</p>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold mb-1">
                    <span>Progress</span>
                    <span>
                      {Math.floor(achievement.progress)} / {achievement.target}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                          : 'bg-gradient-to-r from-violet-600 to-indigo-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {achievement.unlockedAt && (
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 italic">
                    <Clock className="w-3 h-3 opacity-60" />
                    Unlocked: {achievement.unlockedAt}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Achievements;
