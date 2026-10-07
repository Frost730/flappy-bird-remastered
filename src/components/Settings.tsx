import React, { useState } from 'react';
import { GameSettings, DifficultyMode } from '../types/game';
import { Volume2, VolumeX, RotateCcw, AlertTriangle, Check, Gauge } from 'lucide-react';
import { sound } from '../utils/sound';

interface SettingsProps {
  settings: GameSettings;
  setSettings: (val: GameSettings) => void;
  onResetAll: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, setSettings, onResetAll }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleBGMVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setSettings({ ...settings, bgmVolume: vol });
    sound.setBGMVolume(vol);
  };

  const handleSFXVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setSettings({ ...settings, sfxVolume: vol });
    sound.setSFXVolume(vol);
    // Play a tiny flap tick on change to preview the volume!
    sound.playFlap();
  };

  const executeReset = () => {
    onResetAll();
    setShowConfirm(false);
    setResetSuccess(true);
    sound.playHit();
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pb-6 border-b border-slate-700/40">
        <h2 className="text-3xl font-extrabold text-white">Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Adjust game audio levels and manage local profiles.</p>
      </div>

      <div className="flex-1 mt-6 space-y-8 max-w-xl pb-6 overflow-y-auto pr-1">
        {/* Audio controls */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-white font-bold text-lg border-b border-slate-800 pb-3 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-violet-400" /> Audio Settings
          </h3>

          {/* BGM Volume */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Background Music (BGM)</span>
              <span className="text-violet-400 font-extrabold">{Math.round(settings.bgmVolume * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX className="w-4 h-4 text-slate-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.bgmVolume}
                onChange={handleBGMVolumeChange}
                className="flex-1 h-2 bg-slate-950 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <Volume2 className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* SFX Volume */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Sound Effects (SFX)</span>
              <span className="text-violet-400 font-extrabold">{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX className="w-4 h-4 text-slate-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={handleSFXVolumeChange}
                className="flex-1 h-2 bg-slate-950 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <Volume2 className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Difficulty Controls */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-white font-bold text-lg border-b border-slate-800 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-indigo-400" /> Game Difficulty
            </span>
            <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {settings.difficulty === 'easy' ? '🌱 Easy' : settings.difficulty === 'medium' ? '⚡ Medium' : settings.difficulty === 'hard' ? '🔥 Hard' : '🚀 Dynamic'}
            </span>
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Choose how pipe spacing, clearance gap size, and speed scale during flights. All modes are mathematically calibrated to ensure pipes are always physically passable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              {
                id: 'dynamic',
                name: '🚀 Dynamic (Recommended)',
                badge: 'Progression',
                badgeColor: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
                desc: 'Starts Easy (0-19), escalates to Medium (20-49), and hits Hard (50+). Coins scale from rare up to an abundant bounty!'
              },
              {
                id: 'easy',
                name: '🌱 Easy Mode',
                badge: 'Casual (Rare Coins)',
                badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
                desc: 'Generous 182px pipe gaps and gentle flight speed. Coins are rare (~22% spawn) to keep progression balanced.'
              },
              {
                id: 'medium',
                name: '⚡ Medium Mode',
                badge: 'Classic (Balanced)',
                badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
                desc: 'Standard authentic Flappy Bird challenge with 156px gaps and balanced coin spawns (~50%).'
              },
              {
                id: 'hard',
                name: '🔥 Hard Mode',
                badge: 'Expert (Coin Bounty)',
                badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
                desc: 'Fast adrenaline-fueled flight with tight 138px gaps. High-stakes rich coin bounty (~85% spawn)!'
              }
            ].map((d) => {
              const isSelected = (settings.difficulty || 'dynamic') === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setSettings({ ...settings, difficulty: d.id as DifficultyMode });
                    sound.playCoin();
                  }}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-sm text-white">{d.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${d.badgeColor}`}>
                      {d.badge}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Maintenance */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-white font-bold text-lg border-b border-slate-800 pb-3 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-red-400" /> Reset Profile
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            This will permanently delete all high scores, coins, unlocked skins, statistics, and reset achievements to zero. This action is irreversible.
          </p>

          {resetSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-1.5 animate-pulse">
              <Check className="w-4 h-4" /> Game data successfully reset!
            </div>
          )}

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-500/10 border border-red-500/35 hover:bg-red-600 hover:text-white text-red-400 font-bold py-2.5 px-5 rounded-xl transition-all text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset All Data
            </button>
          ) : (
            <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl space-y-4">
              <div className="flex gap-2 items-start text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-sm text-red-200">Are you absolutely sure?</div>
                  <div className="text-xs text-red-400/80 mt-0.5">All of your score progress, purchased skins, and badges will be deleted forever!</div>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={executeReset}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Settings;
