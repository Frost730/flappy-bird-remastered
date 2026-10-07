import type { BirdSkin, PipeSkin, ThemeSkin, Achievement } from '../types/game';

export const BIRD_SKINS: BirdSkin[] = [
  {
    id: 'classic',
    name: 'Classic Yellow',
    cost: 0,
    unlocked: true,
    color: '#fde047',      // bright sunny yellow 300
    wingColor: '#eab308',  // golden yellow 500
    beakColor: '#f97316',  // orange 500
    eyeColor: '#0f172a',
    special: 'classic',
    description: 'The original iconic retro flapper with rosy cheeks.'
  },
  {
    id: 'red',
    name: 'Crimson Phoenix',
    cost: 50,
    unlocked: false,
    color: '#ef4444',      // fiery red 500
    wingColor: '#b91c1c',  // deep ember red 700
    beakColor: '#fb923c',  // flame orange 400
    eyeColor: '#facc15',   // piercing gold eye
    special: 'fire',
    description: 'A blazing firebird with flame crest plumage.'
  },
  {
    id: 'blue',
    name: 'Cyber Mecha',
    cost: 100,
    unlocked: false,
    color: '#38bdf8',      // cyan titanium 400
    wingColor: '#0284c7',  // steel blue 600
    beakColor: '#e2e8f0',  // chrome beak
    eyeColor: '#00f5ff',   // neon laser visor
    special: 'mecha',
    description: 'Robotic bird equipped with an antenna and glowing cyber visor.'
  },
  {
    id: 'golden',
    name: 'Royal Sovereign',
    cost: 250,
    unlocked: false,
    color: '#fbbf24',      // pure glittering gold
    wingColor: '#9333ea',  // imperial purple velvet wing
    beakColor: '#f59e0b',  // gold beak
    eyeColor: '#38bdf8',   // sapphire glowing gem eye
    special: 'crown',
    description: 'Adorned with a ruby-encrusted royal crown and purple velvet wing.'
  },
  {
    id: 'ninja',
    name: 'Shadow Shinobi',
    cost: 150,
    unlocked: false,
    color: '#334155',      // slate 700 ninja suit
    wingColor: '#0f172a',  // midnight black wing
    beakColor: '#94a3b8',  // kunai steel beak
    eyeColor: '#ffffff',   // glowing white ninja eye
    special: 'ninja',
    description: 'Stealth night bird wearing a red headband with fluttering ties.'
  },
  {
    id: 'toxic',
    name: 'Neon Dragon',
    cost: 200,
    unlocked: false,
    color: '#22c55e',      // radioactive lime green
    wingColor: '#15803d',  // emerald scale wing
    beakColor: '#a3e635',  // acid lime beak
    eyeColor: '#facc15',   // reptilian slit eye
    special: 'toxic',
    description: 'Draconic flyer with neon horns and razor scales.'
  },
  {
    id: 'cosmic',
    name: 'Astral Voyager',
    cost: 300,
    unlocked: false,
    color: '#6366f1',      // deep nebula indigo
    wingColor: '#ec4899',  // starlight pink wing
    beakColor: '#fde047',  // star yellow beak
    eyeColor: '#38bdf8',   // galactic cyan
    special: 'cosmic',
    description: 'Celestial voyager crowned with a floating astral aura.'
  },
  {
    id: 'random',
    name: '🎲 Random Skin',
    cost: 0,
    unlocked: true,
    color: '#ec4899',
    wingColor: '#8b5cf6',
    beakColor: '#eab308',
    eyeColor: '#06b6d4',
    special: 'random',
    description: 'Surprise! Selects a random bird skin from your unlocked collection each run.'
  }
];

export const PIPE_SKINS: PipeSkin[] = [
  {
    id: 'classic',
    name: 'Classic Green',
    cost: 0,
    unlocked: true,
    primaryColor: '#22c55e', // green 500
    accentColor: '#4ade80'   // green 400
  },
  {
    id: 'night',
    name: 'Midnight Neon',
    cost: 100,
    unlocked: false,
    primaryColor: '#4f46e5', // indigo 600
    accentColor: '#818cf8'   // indigo 400
  },
  {
    id: 'cyberpunk',
    name: 'Cyber Grid',
    cost: 200,
    unlocked: false,
    primaryColor: '#1e1b4b', // dark indigo
    accentColor: '#ec4899',  // pink 500
    glowColor: '#06b6d4'     // cyan 500
  },
  {
    id: 'military',
    name: 'Steel Camo',
    cost: 150,
    unlocked: false,
    primaryColor: '#4b5563', // gray 600
    accentColor: '#9ca3af'   // gray 400
  }
];

export const THEMES: ThemeSkin[] = [
  {
    id: 'classic',
    name: 'Day Valley',
    cost: 0,
    unlocked: true,
    skyColor: '#4ec0ca',
    groundColor: '#ddd896',
    obstacleColor: 'classic',
    description: 'Fly over a beautiful, sunny cartoon valley with clouds.'
  },
  {
    id: 'night',
    name: 'Midnight City',
    cost: 100,
    unlocked: false,
    skyColor: '#0f0c1b',
    groundColor: '#1c152a',
    obstacleColor: 'night',
    description: 'A serene nighttime metropolis with glowing golden windows.'
  },
  {
    id: 'cyberpunk',
    name: 'Neon Grid',
    cost: 200,
    unlocked: false,
    skyColor: '#09090e',
    groundColor: '#06060c',
    obstacleColor: 'cyberpunk',
    description: 'An advanced retro-futurist cyberspace lined with neon grids.'
  },
  {
    id: 'military',
    name: 'Desert Dunes',
    cost: 300,
    unlocked: false,
    skyColor: '#7c8672',
    groundColor: '#7a705e',
    obstacleColor: 'military',
    description: 'A camouflage desert dune terrain with structures.'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_flight',
    title: 'First Flight',
    description: 'Start your very first game of Flappy Bird Pro.',
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'score_10',
    title: 'Double Digits',
    description: 'Reach a score of 10 in a single run.',
    progress: 0,
    target: 10,
    unlocked: false
  },
  {
    id: 'score_25',
    title: 'Skilled Pilot',
    description: 'Reach a score of 25 in a single run.',
    progress: 0,
    target: 25,
    unlocked: false
  },
  {
    id: 'score_50',
    title: 'Pro Aviator',
    description: 'Reach a score of 50 in a single run.',
    progress: 0,
    target: 50,
    unlocked: false
  },
  {
    id: 'score_100',
    title: 'Flappy God',
    description: 'Reach a score of 100 in a single run.',
    progress: 0,
    target: 100,
    unlocked: false
  },
  {
    id: 'coin_100',
    title: 'Coin Collector',
    description: 'Collect 100 coins in total.',
    progress: 0,
    target: 100,
    unlocked: false
  },
  {
    id: 'coin_500',
    title: 'Rich Bird',
    description: 'Accumulate a total of 500 coins.',
    progress: 0,
    target: 500,
    unlocked: false
  },
  {
    id: 'skins_all',
    title: 'Wardrobe Complete',
    description: 'Unlock all 4 bird skins in the shop.',
    progress: 1, // Start with 1 unlocked
    target: 4,
    unlocked: false
  },
  {
    id: 'time_300',
    title: 'Frequent Flyer',
    description: 'Fly for a total of 5 minutes (300 seconds) across all games.',
    progress: 0,
    target: 300,
    unlocked: false
  }
];
