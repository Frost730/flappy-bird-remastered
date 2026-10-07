import React, { useState } from 'react';
import type { Achievement } from '../types/game';
import {
  Award,
  Lock,
  CheckCircle2,
  Clock,
  Feather,
  Target,
  Trophy,
  Flame,
  Crown,
  Coins,
  Gem,
  Shield,
  Compass,
  Zap,
  Dices,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

type FilterCategory = 'all' | 'milestone' | 'skill' | 'collection' | 'secret';

function renderBadgeIcon(iconName?: string, unlocked = false) {
  const iconProps = { className: 'w-6 h-6' };
  switch (iconName) {
    case 'feather':
      return <Feather {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'trophy':
      return <Trophy {...iconProps} />;
    case 'flame':
      return <Flame {...iconProps} />;
    case 'crown':
      return <Crown {...iconProps} />;
    case 'coins':
      return <Coins {...iconProps} />;
    case 'gem':
      return <Gem {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'dices':
      return <Dices {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    default:
      return unlocked ? <Award {...iconProps} /> : <Lock {...iconProps} />;
  }
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const filteredAchievements = achievements.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.category === activeFilter;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/40 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Badges & Achievements</h2>
          <p className="text-slate-400 text-sm mt-1">Unlock badges, uncover secret challenges, and earn coin bonuses.</p>
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

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 my-5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/60 w-full sm:w-fit">
        {(['all', 'milestone', 'skill', 'collection', 'secret'] as FilterCategory[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 capitalize ${
              activeFilter === cat
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {cat === 'all' ? 'All Badges' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1 pb-6">
        {filteredAchievements.map((achievement) => {
          const isSecretLocked = achievement.isSecret && !achievement.unlocked;
          const progressPercent = Math.min(
            100,
            Math.max(0, (achievement.progress / achievement.target) * 100)
          );

          const rarityColor =
            achievement.rarity === 'diamond'
              ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
              : achievement.rarity === 'gold'
              ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
              : achievement.rarity === 'silver'
              ? 'border-slate-400/40 text-slate-300 bg-slate-400/10'
              : 'border-orange-600/40 text-orange-400 bg-orange-600/10';

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
                {isSecretLocked ? (
                  <HelpCircle className="w-6 h-6 text-slate-600" />
                ) : (
                  renderBadgeIcon(achievement.icon, achievement.unlocked)
                )}
              </div>

              {/* Contents */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white text-base font-bold truncate">
                      {isSecretLocked ? '??? Secret Badge' : achievement.title}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {achievement.rarity && (
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${rarityColor}`}>
                          {achievement.rarity}
                        </span>
                      )}
                      {achievement.unlocked && (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {isSecretLocked ? 'Achieve a mysterious secret gameplay feat to unlock!' : achievement.description}
                  </p>
                </div>

                {/* Reward & Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold mb-1">
                    <span className="text-amber-400/90 font-bold">
                      {achievement.reward ? `+${achievement.reward} Coins Reward` : 'Badge'}
                    </span>
                    <span>
                      {isSecretLocked ? '? / ?' : `${Math.floor(achievement.progress)} / ${achievement.target}`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                          : 'bg-gradient-to-r from-violet-600 to-indigo-500'
                      }`}
                      style={{ width: `${isSecretLocked ? 0 : progressPercent}%` }}
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
