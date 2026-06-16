# 🐦 Flappy Bird Pro

A modern, highly polished, mobile-friendly browser game built with **React**, **TypeScript**, **Tailwind CSS**, and **HTML5 Canvas**. 

The game features difficulty scaling, a Web Audio API procedural sound engine, a coin and shop inventory system (with custom skins and themes), persistent statistics, and a local leaderboard.

## ✨ Features

- **🎮 Core Gameplay & Physics**: Clean 60 FPS HTML5 Canvas engine with responsive bird physics, flapping animations, rotational pitching (tilting on dive/climb), and forgiving collision boundaries.
- **📱 Responsive Mobile-First Design**: Auto-scaling canvas that preserves its aspect ratio on all mobile and tablet resolutions. Tapping *anywhere* on screen serves as a touch controller. On desktop, players can use the spacebar or mouse clicks.
- **🎨 Custom Visual Themes**: Switch between 4 distinct scrollable environments:
  - **Day Valley (Classic)**: Bright cartoon sky, scrolling clouds, hills, and green grass.
  - **Midnight City**: Starry sky with shining stars, city skyline, and lit window tiles.
  - **Neon Grid (Cyberpunk)**: Dark cyberpunk coding space with neon glowing magenta and cyan grid towers.
  - **Desert Dunes (Military)**: Sand dune hills and camouflage base structures.
- **🛒 Coin & Shop Inventory System**: Earn coins by playing the game or completing daily missions. Unlock:
  - **4 Bird Skins**: Classic Yellow, Crimson Fury, Sky Swooper, and Golden Legend (with blue glowing eyes).
  - **4 Pipe Styles**: Classic Green, Midnight Neon, Cyber Grid, and Steel Camo.
  - **4 Background Themes**: Each theme transforms the entire gameplay canvas and arpeggiator track.
- **🎵 Retro Audio Synthesis (Web Audio API)**: Sound effects (flap, point, hit, coin) and loopable arpeggiated music generated *procedurally* in the browser. Zero asset loading latency, fully offline compatible, and adjustable volume levels.
- **🏆 Local Leaderboard & Stats**: Tracks top 10 runs with username submission. Includes a detailed dashboard displaying games played, average score, lifetime flight time, and an animated CSS bar chart showing score history.
- **📅 Daily Missions**: 3 daily challenges (Score, Coins, total Pipes) generated deterministically each calendar day with rewarding coin payouts.
- **🎖️ Badge Achievements**: 9 unlockable achievements showing progress bars and a sliding toast alert when unlocked in-game.

## 🛠️ Tech Stack

- **React 19** & **TypeScript**
- **Vite** (Bundler & HMR)
- **Tailwind CSS v4** (Modern utility styles)
- **HTML5 Canvas API** (Gameplay render engine)
- **Web Audio API** (Sound effects and looping synthesizer)
- **Lucide React** (Icons)
- **Local Storage** (Permanent save states)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download the project to your computer.
2. Open your terminal in the project directory (`flappy-bird-pro`).
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to play the game!

### Building for Production

To build the static assets into the `dist` folder:
```bash
npm run build
```

---

## 📦 Deploying to GitHub Pages

The project has been configured with relative asset paths (`base: './'`) in Vite and includes the `gh-pages` deployment tool. Follow these simple steps to deploy:

1. **Create a GitHub Repository**: Initialize a Git repository, commit your code, and push it to your GitHub profile.
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Flappy Bird Pro"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```
2. **Deploy with One Command**: Run the deployment script:
   ```bash
   npm run deploy
   ```
   This will automatically build the production package and push it to a new branch called `gh-pages`.
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on the **Settings** tab.
   - Select **Pages** from the left-hand menu.
   - Under **Build and deployment**, ensure the **Source** is set to "Deploy from a branch" and select the **Branch** as `gh-pages` (folder `/root`).
   - Save the settings. Your game will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` shortly!
