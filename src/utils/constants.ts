import type { BirdSkin, PipeSkin, ThemeSkin, Achievement } from '../types/game';

export const BIRD_SKINS: BirdSkin[] = [
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
  },
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
  }
];

export const PIPE_SKINS: PipeSkin[] = [
  {
    id: 'random',
    name: '🎲 Random Pipes',
    cost: 0,
    unlocked: true,
    primaryColor: '#ec4899',
    accentColor: '#8b5cf6',
    glowColor: '#06b6d4'
  },
  {
    id: 'classic',
    name: 'Classic Green',
    cost: 0,
    unlocked: true,
    primaryColor: '#22c55e', // green 500
    accentColor: '#4ade80'   // green 400
  },
  {
    id: 'gold',
    name: 'Midas Gold',
    cost: 140,
    unlocked: false,
    primaryColor: '#d97706', // amber 600
    accentColor: '#fbbf24',  // amber 400
    glowColor: '#f59e0b'
  },
  {
    id: 'frost',
    name: 'Glacial Crystal',
    cost: 160,
    unlocked: false,
    primaryColor: '#0284c7', // sky 600
    accentColor: '#38bdf8',  // sky 400
    glowColor: '#7dd3fc'
  },
  {
    id: 'lava',
    name: 'Inferno Magma',
    cost: 200,
    unlocked: false,
    primaryColor: '#991b1b', // red 800
    accentColor: '#f97316',  // orange 500
    glowColor: '#ef4444'
  },
  {
    id: 'candy',
    name: 'Sugar Swirl',
    cost: 150,
    unlocked: false,
    primaryColor: '#e11d48', // rose 600
    accentColor: '#ffffff',  // pure white sugar stripe
    glowColor: '#fb7185'
  },
  {
    id: 'toxic',
    name: 'Toxic Slime',
    cost: 220,
    unlocked: false,
    primaryColor: '#4d7c0f', // lime 700
    accentColor: '#a3e635',  // lime 400
    glowColor: '#84cc16'
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
    id: 'random',
    name: '🎲 Random Theme',
    cost: 0,
    unlocked: true,
    skyColor: 'linear-gradient(135deg, #6366f1, #ec4899)',
    groundColor: '#1e1b4b',
    obstacleColor: 'random',
    description: 'Surprise environment! Randomly chooses from your unlocked themes on each flight.'
  },
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
    id: 'sunset',
    name: 'Sunset Coast',
    cost: 100,
    unlocked: false,
    skyColor: '#ea580c',
    groundColor: '#7c2d12',
    obstacleColor: 'sunset',
    description: 'Twilight purple-orange dusk with palm trees and ocean reflections.'
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
    id: 'candy',
    name: 'Candy Wonderland',
    cost: 180,
    unlocked: false,
    skyColor: '#f472b6',
    groundColor: '#db2777',
    obstacleColor: 'candy',
    description: 'Pastel dreamscape of sugary clouds, lollipop trees, and frosting.'
  },
  {
    id: 'matrix',
    name: 'Digital Matrix',
    cost: 220,
    unlocked: false,
    skyColor: '#020b05',
    groundColor: '#022c22',
    obstacleColor: 'matrix',
    description: 'Monochrome cyberspace terminal with raining green digital code.'
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
    id: 'inferno',
    name: 'Molten Peaks',
    cost: 250,
    unlocked: false,
    skyColor: '#1c1917',
    groundColor: '#18181b',
    obstacleColor: 'inferno',
    description: 'Dark volcanic skies over erupting magma mountains and ember fissures.'
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
  // --- BRONZE TIER ---
  {
    id: 'first_flight',
    title: 'First Flight',
    description: 'Start your very first flight in Flappy Bird Pro.',
    progress: 0,
    target: 1,
    unlocked: false,
    rarity: 'bronze',
    icon: 'feather',
    category: 'milestone',
    reward: 20
  },
  {
    id: 'score_10',
    title: 'Double Digits',
    description: 'Reach a score of 10 in a single flight.',
    progress: 0,
    target: 10,
    unlocked: false,
    rarity: 'bronze',
    icon: 'target',
    category: 'skill',
    reward: 25
  },
  {
    id: 'coin_50',
    title: 'Pocket Change',
    description: 'Collect 50 coins in total.',
    progress: 0,
    target: 50,
    unlocked: false,
    rarity: 'bronze',
    icon: 'coins',
    category: 'collection',
    reward: 30
  },
  {
    id: 'games_5',
    title: 'Rookie Flyer',
    description: 'Play 5 total flights.',
    progress: 0,
    target: 5,
    unlocked: false,
    rarity: 'bronze',
    icon: 'compass',
    category: 'milestone',
    reward: 25
  },
  {
    id: 'pipes_30',
    title: 'Pipe Hopper',
    description: 'Pass 30 total pipes across all runs.',
    progress: 0,
    target: 30,
    unlocked: false,
    rarity: 'bronze',
    icon: 'shield',
    category: 'skill',
    reward: 30
  },
  {
    id: 'time_60',
    title: 'One Minute Aviator',
    description: 'Accumulate 60 seconds of total flight time.',
    progress: 0,
    target: 60,
    unlocked: false,
    rarity: 'bronze',
    icon: 'clock',
    category: 'milestone',
    reward: 25
  },

  // --- SILVER TIER ---
  {
    id: 'score_25',
    title: 'Skilled Pilot',
    description: 'Reach a score of 25 in a single flight.',
    progress: 0,
    target: 25,
    unlocked: false,
    rarity: 'silver',
    icon: 'zap',
    category: 'skill',
    reward: 50
  },
  {
    id: 'coin_100',
    title: 'Coin Collector',
    description: 'Collect 100 coins in total.',
    progress: 0,
    target: 100,
    unlocked: false,
    rarity: 'silver',
    icon: 'coins',
    category: 'collection',
    reward: 50
  },
  {
    id: 'pipes_100',
    title: 'Gatekeeper',
    description: 'Pass 100 total pipes across all flights.',
    progress: 0,
    target: 100,
    unlocked: false,
    rarity: 'silver',
    icon: 'shield',
    category: 'skill',
    reward: 60
  },
  {
    id: 'games_20',
    title: 'Frequent Flyer',
    description: 'Complete 20 flight attempts.',
    progress: 0,
    target: 20,
    unlocked: false,
    rarity: 'silver',
    icon: 'compass',
    category: 'milestone',
    reward: 50
  },
  {
    id: 'time_300',
    title: 'Sky Nomad',
    description: 'Fly for a total of 5 minutes (300 seconds).',
    progress: 0,
    target: 300,
    unlocked: false,
    rarity: 'silver',
    icon: 'clock',
    category: 'milestone',
    reward: 60
  },
  {
    id: 'skins_3',
    title: 'Fashion Forward',
    description: 'Unlock at least 3 bird skins in the shop.',
    progress: 1,
    target: 3,
    unlocked: false,
    rarity: 'silver',
    icon: 'sparkles',
    category: 'collection',
    reward: 70
  },
  {
    id: 'random_pilot',
    title: 'Chaos Master',
    description: 'Score 15+ in a flight with the 🎲 Random Skin equipped.',
    progress: 0,
    target: 15,
    unlocked: false,
    rarity: 'silver',
    icon: 'dices',
    category: 'skill',
    reward: 75
  },

  // --- GOLD TIER ---
  {
    id: 'score_50',
    title: 'Pro Aviator',
    description: 'Reach a score of 50 in a single flight.',
    progress: 0,
    target: 50,
    unlocked: false,
    rarity: 'gold',
    icon: 'trophy',
    category: 'skill',
    reward: 100
  },
  {
    id: 'coin_500',
    title: 'Rich Bird',
    description: 'Accumulate a total of 500 coins.',
    progress: 0,
    target: 500,
    unlocked: false,
    rarity: 'gold',
    icon: 'gem',
    category: 'collection',
    reward: 100
  },
  {
    id: 'pipes_300',
    title: 'Centurion of Skies',
    description: 'Pass 300 total pipes across all runs.',
    progress: 0,
    target: 300,
    unlocked: false,
    rarity: 'gold',
    icon: 'shield',
    category: 'skill',
    reward: 120
  },
  {
    id: 'skins_all',
    title: 'Wardrobe Monarch',
    description: 'Unlock 6 different bird skins in the shop.',
    progress: 1,
    target: 6,
    unlocked: false,
    rarity: 'gold',
    icon: 'crown',
    category: 'collection',
    reward: 150
  },
  {
    id: 'time_600',
    title: 'Endurance Legend',
    description: 'Fly for a total of 10 minutes (600 seconds).',
    progress: 0,
    target: 600,
    unlocked: false,
    rarity: 'gold',
    icon: 'clock',
    category: 'milestone',
    reward: 125
  },

  // --- DIAMOND / SECRET TIER ---
  {
    id: 'score_100',
    title: 'Flappy God',
    description: 'Reach an unbelievable score of 100 in a single flight.',
    progress: 0,
    target: 100,
    unlocked: false,
    rarity: 'diamond',
    icon: 'flame',
    category: 'skill',
    reward: 300
  },
  {
    id: 'coin_1000',
    title: 'Midas Emperor',
    description: 'Accumulate a lifetime fortune of 1,000 coins.',
    progress: 0,
    target: 1000,
    unlocked: false,
    rarity: 'diamond',
    icon: 'gem',
    category: 'collection',
    reward: 250
  },
  {
    id: 'ninja_master',
    title: 'Shadow Ascendant',
    description: 'Score 20+ with the Shadow Shinobi skin.',
    progress: 0,
    target: 20,
    unlocked: false,
    rarity: 'diamond',
    icon: 'feather',
    category: 'secret',
    isSecret: true,
    reward: 150
  },
  {
    id: 'dragon_flight',
    title: 'Dragonlord',
    description: 'Score 25+ with the Neon Dragon skin.',
    progress: 0,
    target: 25,
    unlocked: false,
    rarity: 'diamond',
    icon: 'flame',
    category: 'secret',
    isSecret: true,
    reward: 200
  },
  {
    id: 'cyber_voyage',
    title: 'Grid Runner',
    description: 'Score 20+ in the Neon Grid cyberpunk theme.',
    progress: 0,
    target: 20,
    unlocked: false,
    rarity: 'gold',
    icon: 'zap',
    category: 'secret',
    isSecret: true,
    reward: 120
  },
  {
    id: 'night_owl',
    title: 'Nocturnal Ace',
    description: 'Score 20+ in the Midnight City theme.',
    progress: 0,
    target: 20,
    unlocked: false,
    rarity: 'gold',
    icon: 'compass',
    category: 'secret',
    isSecret: true,
    reward: 120
  },
  {
    id: 'reach_hard',
    title: 'Adrenaline Ace',
    description: 'Advance to Hard difficulty (Score 50+) in Dynamic mode.',
    progress: 0,
    target: 50,
    unlocked: false,
    rarity: 'gold',
    icon: 'flame',
    category: 'skill',
    reward: 120
  }
];
