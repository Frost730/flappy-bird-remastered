import React, { useState } from 'react';
import type { GameSettings, PlayerStats, LeaderboardEntry, Achievement, DailyChallenge } from '../types/game';
import { Shop } from './Shop';
import { Leaderboard } from './Leaderboard';
import { Statistics } from './Statistics';
import { Achievements } from './Achievements';
import { Settings } from './Settings';
import {
  Play,
  ShoppingBag,
  Trophy,
  Award,
  BarChart3,
  Settings as SettingsIcon,
  Coins,
  ShieldCheck,
  CheckCircle,
  Circle
} from 'lucide-react';
import { BIRD_SKINS } from '../utils/constants';

interface DashboardProps {
  stats: PlayerStats;
  coins: number;
  setCoins: (val: number | ((c: number) => number)) => void;
  unlockedBirds: string[];
  setUnlockedBirds: (val: string[]) => void;
  unlockedPipes: string[];
  setUnlockedPipes: (val: string[]) => void;
  unlockedThemes: string[];
  setUnlockedThemes: (val: string[]) => void;
  settings: GameSettings;
  setSettings: (val: GameSettings) => void;
  leaderboard: LeaderboardEntry[];
  achievements: Achievement[];
  dailyChallenges: DailyChallenge[];
  scoreHistory: number[];
  onResetAll: () => void;
  onStartGame: () => void;
}

type TabType = 'play' | 'shop' | 'leaderboard' | 'achievements' | 'stats' | 'settings';

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  coins,
  setCoins,
  unlockedBirds,
  setUnlockedBirds,
  unlockedPipes,
  setUnlockedPipes,
  unlockedThemes,
  setUnlockedThemes,
  settings,
  setSettings,
  leaderboard,
  achievements,
  dailyChallenges,
  scoreHistory,
  onResetAll,
  onStartGame
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('play');

  const activeBird = BIRD_SKINS.find((b) => b.id === settings.currentBird) || BIRD_SKINS[0];

  const menuItems = [
    { id: 'play', label: 'Flight Deck', icon: Play },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, count: coins },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Badges', icon: Award, progress: `${achievements.filter(a => a.unlocked).length}/${achievements.length}` },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto h-[100dvh] lg:h-[80vh] glass-panel rounded-none lg:rounded-3xl border-0 lg:border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* 1. SIDEBAR (Desktop) / HEADER (Mobile) */}
      <div className="flex flex-row lg:flex-col lg:w-64 bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-800/50 justify-between items-center lg:items-stretch p-4 lg:p-6 shrink-0 z-10">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 lg:mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="20" height="20" viewBox="0 0 48 48" className="animate-float">
              <circle cx="24" cy="24" r="14" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="20" cy="25" rx="7" ry="5" fill="#d97706" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300 tracking-wider">
              FLAPPY PRO
            </h1>
            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest hidden lg:block">
              Arcade Dashboard
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items (Hidden on Mobile) */}
        <nav className="hidden lg:flex flex-col gap-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {item.label}
                </span>
                
                {/* Secondary indicators */}
                {item.id === 'shop' && item.count !== undefined && (
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <Coins className="w-3 h-3 shrink-0" />
                    {item.count}
                  </span>
                )}
                {item.id === 'achievements' && item.progress !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {item.progress}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Header Stats (Visible only on Mobile) */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/20 py-1 px-3 rounded-full text-amber-300 text-sm font-black">
            <Coins className="w-3.5 h-3.5" />
            {coins}
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/20 py-1 px-3 rounded-full text-indigo-300 text-sm font-black">
            <Trophy className="w-3.5 h-3.5" />
            {stats.highScore}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-950/20 min-h-0 pb-24 lg:pb-10">
        {/* PLAY TAB (MAIN MENU) */}
        {activeTab === 'play' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-full">
            {/* Left: Fly preview box & Button */}
            <div className="flex flex-col items-center text-center glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Flight Simulator Preview */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-sky-400/90 to-sky-200/90 border border-slate-300 flex items-center justify-center relative shadow-inner overflow-hidden mb-6">
                {/* Scrolling Clouds Effect inside preview */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent"></div>
                <div className="absolute w-24 h-12 bg-white/60 rounded-full blur-[1px] animate-float left-4 top-6"></div>
                <div className="absolute w-32 h-16 bg-white/50 rounded-full blur-[2px] right-6 bottom-12" style={{ animationDelay: '1.5s' }}></div>

                {/* Animated Floating Bird Preview */}
                <div className="animate-float z-10 flex flex-col items-center">
                  <svg width="64" height="64" viewBox="0 0 48 48">
                    {/* Tail */}
                    <path d="M 10 24 Q 0 16 2 24 Q 0 32 10 28 Z" fill={activeBird.wingColor} />
                    {/* Body */}
                    <circle cx="24" cy="24" r="14" fill={activeBird.color} stroke="#1e293b" strokeWidth="2.5" />
                    {/* Eye */}
                    <circle cx="29" cy="20" r="5.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
                    <circle cx="30.5" cy="20" r="2.2" fill={activeBird.eyeColor} />
                    {/* Beak */}
                    <path d="M 36 22 L 44 25 L 34 29 Z" fill={activeBird.beakColor} stroke="#1e293b" strokeWidth="1.8" />
                    {/* Wing */}
                    <ellipse cx="20" cy="25" rx="7.5" ry="5.5" fill={activeBird.wingColor} stroke="#1e293b" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>

              {/* Start Flight button */}
              <button
                onClick={onStartGame}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-lg tracking-wider rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-98 transition-all flex items-center justify-center gap-3 animate-pulse-glow"
              >
                <Play className="w-5 h-5 fill-white" /> START FLIGHT
              </button>

              {/* Quick stats panel */}
              <div className="flex justify-between items-center w-full mt-6 px-2 text-xs border-t border-slate-800/80 pt-4 text-slate-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Device Verified</span>
                <span>Version 1.0.4</span>
              </div>
            </div>

            {/* Right: Daily challenges checklist */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800/80">
              <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-indigo-400" /> Daily Missions
              </h3>
              
              <div className="space-y-4">
                {dailyChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-2xl border transition-colors flex gap-3.5 ${
                      challenge.completed
                        ? 'bg-emerald-500/5 border-emerald-500/30'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-800'
                    }`}
                  >
                    {/* Check icon */}
                    <div className="mt-0.5 shrink-0">
                      {challenge.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </div>

                    {/* Progress details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`text-sm font-bold truncate ${
                          challenge.completed ? 'text-slate-400 line-through' : 'text-white'
                        }`}>
                          {challenge.description}
                        </h4>
                        <span className="text-amber-400 font-extrabold text-xs shrink-0 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          +{challenge.reward} coins
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-1">
                          <span>Target progress</span>
                          <span>{challenge.progress} / {challenge.target}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              challenge.completed ? 'bg-emerald-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${Math.min(100, (challenge.progress / challenge.target) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SHOP TAB */}
        {activeTab === 'shop' && (
          <Shop
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
          />
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <Leaderboard entries={leaderboard} />
        )}

        {/* BADGES TAB */}
        {activeTab === 'achievements' && (
          <Achievements achievements={achievements} />
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <Statistics stats={stats} scoreHistory={scoreHistory} />
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <Settings
            settings={settings}
            setSettings={setSettings}
            onResetAll={onResetAll}
          />
        )}
      </div>

      {/* 3. BOTTOM TAB NAVIGATION (Mobile Only) */}
      <div className="flex lg:hidden fixed bottom-0 inset-x-0 bg-slate-950/90 border-t border-slate-800/60 backdrop-blur-md justify-between items-center py-2 px-3 z-15">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl flex-1 text-center transition-all ${
                isActive ? 'text-violet-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 shrink-0" />
                {/* Tiny badge count */}
                {item.id === 'shop' && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[8px] h-3 px-1 rounded-full flex items-center justify-center">
                    $
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate w-14 text-center">
                {item.label === 'Flight Deck' ? 'Fly' : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
