import React, { useState } from 'react';
import { BIRD_SKINS, PIPE_SKINS, THEMES } from '../utils/constants';
import type { GameSettings } from '../types/game';
import { Coins, Lock, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface ShopProps {
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
}

type ShopTab = 'birds' | 'pipes' | 'themes';

export const Shop: React.FC<ShopProps> = ({
  coins,
  setCoins,
  unlockedBirds,
  setUnlockedBirds,
  unlockedPipes,
  setUnlockedPipes,
  unlockedThemes,
  setUnlockedThemes,
  settings,
  setSettings
}) => {
  const [activeTab, setActiveTab] = useState<ShopTab>('birds');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const buyItem = (type: ShopTab, id: string, cost: number) => {
    if (coins < cost) {
      setErrorMsg('Not enough coins!');
      sound.playHit(); // buzz sound fallback
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }

    sound.playCoin(); // Play metallic chime on purchase!
    setCoins((prev) => prev - cost);

    if (type === 'birds') {
      const newList = [...unlockedBirds, id];
      setUnlockedBirds(newList);
      setSettings({ ...settings, currentBird: id });
    } else if (type === 'pipes') {
      const newList = [...unlockedPipes, id];
      setUnlockedPipes(newList);
      setSettings({ ...settings, currentPipe: id });
    } else if (type === 'themes') {
      const newList = [...unlockedThemes, id];
      setUnlockedThemes(newList);
      setSettings({ ...settings, currentTheme: id });
      sound.updateTheme(id);
    }
  };

  const equipItem = (type: ShopTab, id: string) => {
    sound.playFlap(); // small tick/flap sound feedback
    if (type === 'birds') {
      setSettings({ ...settings, currentBird: id });
    } else if (type === 'pipes') {
      setSettings({ ...settings, currentPipe: id });
    } else if (type === 'themes') {
      setSettings({ ...settings, currentTheme: id });
      sound.updateTheme(id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Shop Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/40 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Item Shop</h2>
          <p className="text-slate-400 text-sm mt-1">Unlock rare bird skins, customized pipes, and parallax environments.</p>
        </div>
        {/* Balance */}
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full w-fit">
          <Coins className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="font-extrabold text-amber-300 text-lg">{coins}</span>
          <span className="text-amber-400/70 text-xs font-medium uppercase tracking-wider">Coins</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-2 my-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/60 w-full sm:w-fit self-center sm:self-start">
        {(['birds', 'pipes', 'themes'] as ShopTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 capitalize flex-1 sm:flex-none ${
              activeTab === tab
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab === 'birds' ? 'Bird Skins' : tab === 'pipes' ? 'Pipes' : 'Themes'}
          </button>
        ))}
      </div>

      {/* Error Message toast */}
      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-center font-semibold text-sm mb-4 animate-bounce">
          {errorMsg}
        </div>
      )}

      {/* Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-1 flex-1 pb-6">
        {/* 1. BIRD SKINS TAB */}
        {activeTab === 'birds' &&
          BIRD_SKINS.map((bird) => {
            const isUnlocked = unlockedBirds.includes(bird.id);
            const isActive = settings.currentBird === bird.id;
            return (
              <div
                key={bird.id}
                className={`glass-panel p-5 rounded-2xl flex flex-col justify-between border transition-all duration-300 hover:scale-[1.02] ${
                  isActive ? 'border-violet-500 shadow-md shadow-violet-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Bird Preview (Procedural Visual Box) */}
                  <div className="w-24 h-24 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-center relative mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-radial-gradient from-violet-500/5 to-transparent"></div>
                    {/* Tiny animated SVG preview */}
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      {/* Tail */}
                      <path d="M 10 24 Q 0 16 2 24 Q 0 32 10 28 Z" fill={bird.wingColor} />
                      {/* Body */}
                      <circle cx="24" cy="24" r="14" fill={bird.color} stroke="#1e293b" strokeWidth="2" />
                      {/* Eye */}
                      <circle cx="29" cy="20" r="5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
                      <circle cx="30.5" cy="20" r="2" fill={bird.eyeColor} />
                      {/* Beak */}
                      <path d="M 36 22 L 44 25 L 34 29 Z" fill={bird.beakColor} stroke="#1e293b" strokeWidth="1.5" />
                      {/* Wing */}
                      <ellipse cx="20" cy="25" rx="7" ry="5" fill={bird.wingColor} stroke="#1e293b" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-bold">{bird.name}</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    {bird.cost === 0 ? 'Starter skin' : `Unlocks for ${bird.cost} coins`}
                  </p>
                </div>

                <div className="mt-6">
                  {isActive ? (
                    <button className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1 cursor-default text-sm">
                      <Check className="w-4 h-4" /> Equipped
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => equipItem('birds', bird.id)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      Equip
                    </button>
                  ) : (
                    <button
                      onClick={() => buyItem('birds', bird.id, bird.cost)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <Lock className="w-4 h-4" /> Buy for {bird.cost}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {/* 2. PIPE SKINS TAB */}
        {activeTab === 'pipes' &&
          PIPE_SKINS.map((pipe) => {
            const isUnlocked = unlockedPipes.includes(pipe.id);
            const isActive = settings.currentPipe === pipe.id;
            return (
              <div
                key={pipe.id}
                className={`glass-panel p-5 rounded-2xl flex flex-col justify-between border transition-all duration-300 hover:scale-[1.02] ${
                  isActive ? 'border-violet-500 shadow-md shadow-violet-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Pipe Preview */}
                  <div className="w-24 h-24 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-center relative mb-4 overflow-hidden">
                    {/* Visual representation of pipes */}
                    <div className="flex flex-col gap-6 items-center">
                      <div
                        className="w-10 h-8 rounded-b border border-slate-800"
                        style={{
                          background: `linear-gradient(90deg, ${pipe.primaryColor}, ${pipe.accentColor}, ${pipe.primaryColor})`,
                          boxShadow: pipe.glowColor ? `0 0 10px ${pipe.glowColor}` : 'none'
                        }}
                      ></div>
                      <div
                        className="w-10 h-8 rounded-t border border-slate-800"
                        style={{
                          background: `linear-gradient(90deg, ${pipe.primaryColor}, ${pipe.accentColor}, ${pipe.primaryColor})`,
                          boxShadow: pipe.glowColor ? `0 0 10px ${pipe.glowColor}` : 'none'
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="text-white text-lg font-bold">{pipe.name}</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    {pipe.cost === 0 ? 'Default pipes' : `Unlocks for ${pipe.cost} coins`}
                  </p>
                </div>

                <div className="mt-6">
                  {isActive ? (
                    <button className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1 cursor-default text-sm">
                      <Check className="w-4 h-4" /> Equipped
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => equipItem('pipes', pipe.id)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      Equip
                    </button>
                  ) : (
                    <button
                      onClick={() => buyItem('pipes', pipe.id, pipe.cost)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <Lock className="w-4 h-4" /> Buy for {pipe.cost}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {/* 3. THEMES TAB */}
        {activeTab === 'themes' &&
          THEMES.map((theme) => {
            const isUnlocked = unlockedThemes.includes(theme.id);
            const isActive = settings.currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                className={`glass-panel p-5 rounded-2xl flex flex-col justify-between border transition-all duration-300 hover:scale-[1.02] ${
                  isActive ? 'border-violet-500 shadow-md shadow-violet-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Theme Preview */}
                  <div
                    className="w-full h-24 rounded-xl border border-slate-800 mb-4 overflow-hidden relative"
                    style={{ background: theme.skyColor }}
                  >
                    {/* Tiny visual elements representing themes */}
                    {theme.id === 'classic' && (
                      <div className="absolute bottom-0 w-full h-6 bg-[#ddd896] border-t border-slate-800">
                        <div className="absolute -top-3 left-4 w-6 h-6 bg-[#55b04c] rounded-full"></div>
                        <div className="absolute -top-4 left-8 w-8 h-8 bg-[#55b04c] rounded-full"></div>
                      </div>
                    )}
                    {theme.id === 'night' && (
                      <>
                        <div className="absolute top-2 right-4 w-4 h-4 bg-amber-100 rounded-full"></div>
                        <div className="absolute bottom-0 w-full h-6 bg-[#1c152a] border-t border-indigo-950">
                          <div className="absolute -top-4 left-6 w-3 h-5 bg-[#151026]"></div>
                          <div className="absolute -top-6 left-10 w-4 h-7 bg-[#151026]"></div>
                        </div>
                      </>
                    )}
                    {theme.id === 'cyberpunk' && (
                      <>
                        <div className="absolute bottom-0 w-full h-6 bg-[#06060c] border-t border-pink-500">
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_50%,rgba(6,182,212,0.5)_50%),linear-gradient(rgba(6,182,212,0.5)_50%,transparent_50%)] bg-[size:10px_10px]"></div>
                        </div>
                      </>
                    )}
                    {theme.id === 'military' && (
                      <div className="absolute bottom-0 w-full h-6 bg-[#7a705e] border-t border-[#3f392f]">
                        <div className="absolute -top-3 left-3 w-6 h-4 bg-[#6d755e] rounded-t-full"></div>
                        <div className="absolute -top-4 left-8 w-7 h-5 bg-[#6d755e] rounded-t-full"></div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-lg font-bold">{theme.name}</h3>
                  <p className="text-slate-400 text-xs text-center mt-2 px-2 leading-relaxed">{theme.description}</p>
                  <p className="text-slate-400 text-xs mt-3 font-semibold">
                    {theme.cost === 0 ? 'Free starter theme' : `Unlocks for ${theme.cost} coins`}
                  </p>
                </div>

                <div className="mt-6">
                  {isActive ? (
                    <button className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1 cursor-default text-sm">
                      <Check className="w-4 h-4" /> Active
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => equipItem('themes', theme.id)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => buyItem('themes', theme.id, theme.cost)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <Lock className="w-4 h-4" /> Buy for {theme.cost}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Shop;
