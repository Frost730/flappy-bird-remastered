import React, { useEffect, useRef, useState } from 'react';
import { GameState } from '../types/game';
import { sound } from '../utils/sound';
import { drawBackground, drawGround } from '../canvas/background';
import { drawBird } from '../canvas/bird';
import { drawPipes } from '../canvas/pipe';
import { drawCoin } from '../canvas/coin';
import {
  Particle,
  createFlapParticles,
  createCoinParticles,
  createHitParticles,
  updateParticles,
  drawParticles
} from '../canvas/particles';
import { BIRD_SKINS, PIPE_SKINS } from '../utils/constants';
import { Pause, Play, RotateCcw, Home, Award } from 'lucide-react';

interface GameViewProps {
  themeId: string;
  birdSkinId: string;
  pipeSkinId: string;
  currentHighScore: number;
  isLeaderboardWorthy: (score: number) => boolean;
  onSaveLeaderboard: (name: string, score: number) => void;
  onGameOver: (score: number, coinsCollected: number, flightSeconds: number) => void;
  onBackToMenu: () => void;
}

// Fixed virtual resolution
const V_WIDTH = 480;
const V_HEIGHT = 640;
const GROUND_Y = 528; // 640 - 112 ground height

interface PipeObstacle {
  x: number;
  top: number;
  bottom: number;
  width: number;
  passed: boolean;
  hasCoin: boolean;
  coinX: number;
  coinY: number;
  coinCollected: boolean;
}

export const GameView: React.FC<GameViewProps> = ({
  themeId,
  birdSkinId,
  pipeSkinId,
  currentHighScore,
  isLeaderboardWorthy,
  onSaveLeaderboard,
  onGameOver,
  onBackToMenu
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React States for overlays
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [score, setScore] = useState(0);
  const [runCoins, setRunCoins] = useState(0);
  const [showLeaderboardInput, setShowLeaderboardInput] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // References for mutable game loop state (avoids closure stale references)
  const stateRef = useRef({
    gameState: 'MENU' as GameState,
    birdY: 250,
    birdVelocity: 0,
    birdFlapTick: 0,
    pipes: [] as PipeObstacle[],
    particles: [] as Particle[],
    scrollX: 0,
    score: 0,
    coinsCollected: 0,
    lastFrameTime: 0,
    totalFlightSeconds: 0,
    activeAchievementsThisRun: [] as string[]
  });

  const birdSkin = BIRD_SKINS.find((b) => b.id === birdSkinId) || BIRD_SKINS[0];
  const pipeSkin = PIPE_SKINS.find((p) => p.id === pipeSkinId) || PIPE_SKINS[0];

  // Helper: Reset game variables
  const resetGame = () => {
    stateRef.current.birdY = 250;
    stateRef.current.birdVelocity = 0;
    stateRef.current.birdFlapTick = 0;
    stateRef.current.pipes = [];
    stateRef.current.particles = [];
    stateRef.current.scrollX = 0;
    stateRef.current.score = 0;
    stateRef.current.coinsCollected = 0;
    stateRef.current.totalFlightSeconds = 0;
    
    setScore(0);
    setRunCoins(0);
    setShowLeaderboardInput(false);
    setPlayerName('');
  };

  // 1. INPUT / FLAP HANDLER
  const handleJump = (e?: React.MouseEvent | React.TouchEvent | KeyboardEvent) => {
    if (e) {
      // Prevent browser zoom or scrolling on double tap
      if (e.cancelable) e.preventDefault();
    }

    const current = stateRef.current;
    
    if (current.gameState === 'MENU') {
      current.gameState = 'PLAYING';
      setGameState('PLAYING');
      sound.playFlap();
      // start looping BGM
      sound.startBGM(themeId);
      
      // Apply initial jump on start so the bird rises immediately
      current.birdVelocity = -3.3;
      const newFlaps = createFlapParticles(100, current.birdY, '#e2e8f0');
      current.particles.push(...newFlaps);
    } else if (current.gameState === 'PLAYING') {
      // Core flap impulse
      current.birdVelocity = -3.3;
      sound.playFlap();
      
      // Spawn white flap dust
      const newFlaps = createFlapParticles(100, current.birdY, '#e2e8f0');
      current.particles.push(...newFlaps);
    } else if (current.gameState === 'GAMEOVER') {
      // Do not jump on gameover screen clicks
    }
  };

  // Keyboard binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Pause / Resume controllers
  const togglePause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const current = stateRef.current;
    if (current.gameState === 'PLAYING') {
      current.gameState = 'PAUSED';
      setGameState('PAUSED');
      sound.stopBGM();
    } else if (current.gameState === 'PAUSED') {
      current.gameState = 'PLAYING';
      setGameState('PLAYING');
      sound.startBGM(themeId);
    }
  };

  const quitToDashboard = () => {
    sound.stopBGM();
    onBackToMenu();
  };

  const handleRestart = () => {
    resetGame();
    stateRef.current.gameState = 'MENU';
    setGameState('MENU');
  };

  const handleLeaderboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    onSaveLeaderboard(playerName.trim(), score);
    setShowLeaderboardInput(false);
  };

  // 2. CANVAS & PHYSICS ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    // Track flight time in seconds
    const flightTimeInterval = setInterval(() => {
      if (stateRef.current.gameState === 'PLAYING') {
        stateRef.current.totalFlightSeconds += 1;
      }
    }, 1000);

    const gameLoop = () => {
      const current = stateRef.current;

      // Draw background parallax
      drawBackground(ctx, V_WIDTH, V_HEIGHT, current.scrollX, themeId);

      // Handle game state updates
      if (current.gameState === 'PLAYING') {
        // Scroll speed increases with score (difficulty scaling)
        const currentSpeed = 1.6 + Math.min(2.0, current.score * 0.04);
        current.scrollX += currentSpeed;

        // Apply gravity to bird
        current.birdVelocity += 0.11; // gravity force
        current.birdY += current.birdVelocity;
        current.birdFlapTick += 1;

        // Keep bird in bounds of sky ceiling
        if (current.birdY < 16) {
          current.birdY = 16;
          current.birdVelocity = 0.5;
        }

        // Spawn / Scroll pipes
        // Dynamic pipe gap size and horizontal spacing (difficulty scaling)
        const gapSize = Math.max(125, 200 - Math.min(75, current.score * 0.8));
        const pipeSpacing = Math.max(200, 300 - Math.min(100, current.score * 1.5));

        if (
          current.pipes.length === 0 ||
          current.pipes[current.pipes.length - 1].x < V_WIDTH - pipeSpacing
        ) {
          const pipeWidth = 72;
          const minPipeH = 50;
          const maxPipeH = GROUND_Y - gapSize - minPipeH;
          const topH = minPipeH + Math.random() * (maxPipeH - minPipeH);
          const hasCoin = Math.random() < 0.65; // 65% spawn rate for coins

          current.pipes.push({
            x: V_WIDTH,
            top: topH,
            bottom: topH + gapSize,
            width: pipeWidth,
            passed: false,
            hasCoin: hasCoin,
            coinX: V_WIDTH + pipeWidth / 2,
            coinY: topH + gapSize / 2,
            coinCollected: false
          });
        }

        // Update Pipes
        current.pipes = current.pipes
          .map((pipe) => {
            const nextPipe = { ...pipe };
            nextPipe.x -= currentSpeed;
            nextPipe.coinX -= currentSpeed;

            // Collision Check (Circle vs Rectangle collision)
            const birdRadius = 12; // forgiving bounding circle
            
            // Check top pipe collision
            const collideTop = circleRectCollide(
              100, current.birdY, birdRadius,
              nextPipe.x, 0, nextPipe.width, nextPipe.top
            );

            // Check bottom pipe collision
            const collideBottom = circleRectCollide(
              100, current.birdY, birdRadius,
              nextPipe.x, nextPipe.bottom, nextPipe.width, V_HEIGHT - GROUND_Y - nextPipe.bottom
            );

            // Check ground collision
            const collideGround = current.birdY + birdRadius >= GROUND_Y;

            if (collideTop || collideBottom || collideGround) {
              handleGameOverTrigger();
            }

            // Coin collection check
            if (nextPipe.hasCoin && !nextPipe.coinCollected) {
              const dx = 100 - nextPipe.coinX;
              const dy = current.birdY - nextPipe.coinY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < birdRadius + 10) { // 10 is approximate coin radius
                nextPipe.coinCollected = true;
                current.coinsCollected += 1;
                setRunCoins(current.coinsCollected);
                sound.playCoin();

                // Spawn sparkles
                const sparkles = createCoinParticles(nextPipe.coinX, nextPipe.coinY, themeId);
                current.particles.push(...sparkles);
              }
            }

            // Score point check
            if (!nextPipe.passed && nextPipe.x + nextPipe.width < 100) {
              nextPipe.passed = true;
              current.score += 1;
              setScore(current.score);
              sound.playPoint();
            }

            return nextPipe;
          })
          .filter((p) => p.x + p.width > -20); // filter off screen pipes
      }

      // Draw Pipes
      current.pipes.forEach((p) => {
        drawPipes(ctx, p.x, p.top, p.bottom, p.width, V_HEIGHT, pipeSkin);
        
        // Draw Coin
        if (p.hasCoin && !p.coinCollected) {
          drawCoin(ctx, p.coinX, p.coinY, current.birdFlapTick, themeId);
        }
      });

      // Update & Draw Particles
      current.particles = updateParticles(current.particles);
      drawParticles(ctx, current.particles);

      // Draw Bird
      drawBird(ctx, 100, current.birdY, current.birdVelocity, current.birdFlapTick, birdSkin);

      // Draw Ground (Parallax 1.0 - absolute sync)
      drawGround(ctx, V_WIDTH, V_HEIGHT, current.scrollX, themeId);

      // Recursive loop
      animationId = requestAnimationFrame(gameLoop);
    };

    // Trigger Game Over Sequence
    const handleGameOverTrigger = () => {
      const current = stateRef.current;
      current.gameState = 'GAMEOVER';
      setGameState('GAMEOVER');
      sound.stopBGM();
      sound.playHit();

      // Feathers explosion effect!
      const feathers = createHitParticles(100, current.birdY, birdSkin.color, birdSkin.wingColor);
      current.particles.push(...feathers);

      // Report final statistics
      onGameOver(current.score, current.coinsCollected, current.totalFlightSeconds);

      // Check if leaderboard worthy
      if (isLeaderboardWorthy(current.score)) {
        setShowLeaderboardInput(true);
      }
    };

    // Circle vs Axis Aligned Bounding Box collision math
    const circleRectCollide = (cx: number, cy: number, cr: number, rx: number, ry: number, rw: number, rh: number) => {
      // Find closest point on rectangle to circle center
      const closestX = Math.max(rx, Math.min(cx, rx + rw));
      const closestY = Math.max(ry, Math.min(cy, ry + rh));

      // Calculate distance between closest point and circle center
      const dx = cx - closestX;
      const dy = cy - closestY;
      const distanceSquared = dx * dx + dy * dy;

      return distanceSquared < cr * cr;
    };

    // Kickoff loop
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(flightTimeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId, birdSkinId, pipeSkinId]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-full w-full relative"
      onClick={() => handleJump()}
      onTouchStart={(e) => handleJump(e)}
    >
      {/* Canvas container with aspect ratio fit */}
      <div className="w-full max-w-[420px] aspect-[480/640] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-800 overflow-hidden relative mx-auto select-none touch-none">
        
        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={V_WIDTH}
          height={V_HEIGHT}
          className="w-full h-full object-contain block bg-[#4ec0ca]"
        />

        {/* Overlay 1: Live Score & Pause button (HUD) */}
        {gameState === 'PLAYING' && (
          <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-center pointer-events-none">
            {/* Score */}
            <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-black text-4xl select-none">
              {score}
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-700/50 backdrop-blur-sm py-1 px-3 rounded-full text-amber-300 font-extrabold text-sm select-none">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {runCoins}
            </div>

            {/* Pause button */}
            <button
              onClick={togglePause}
              className="pointer-events-auto bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 text-white p-2 rounded-xl backdrop-blur-sm transition-all focus:outline-none"
            >
              <Pause className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overlay 2: MAIN MENU / START SCREEN */}
        {gameState === 'MENU' && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer">
            <div className="animate-float flex flex-col items-center">
              <Award className="w-12 h-12 text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              <h2 className="text-2xl font-black text-white uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Ready to Fly?
              </h2>
            </div>
            
            <p className="text-white/80 font-semibold text-sm mt-4 px-6 py-2 bg-slate-900/80 border border-slate-700/40 rounded-full animate-pulse backdrop-blur-md">
              Tap / Click or Space to Start
            </p>

            <div className="absolute bottom-6 text-slate-300/80 text-xs font-semibold bg-slate-900/50 backdrop-blur-sm py-1.5 px-3 rounded-full border border-slate-800/60 flex items-center gap-1.5">
              <span>High Score:</span>
              <span className="font-extrabold text-yellow-400">{currentHighScore}</span>
            </div>
          </div>
        )}

        {/* Overlay 3: PAUSE MENU */}
        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none">
            <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-6">Game Paused</h2>

            <div className="flex flex-col gap-3 w-48">
              <button
                onClick={() => togglePause()}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 fill-white" /> Resume
              </button>
              <button
                onClick={handleRestart}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-slate-700/50"
              >
                <RotateCcw className="w-4 h-4" /> Restart
              </button>
              <button
                onClick={quitToDashboard}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-800/80 mt-2"
              >
                <Home className="w-4 h-4" /> Main Menu
              </button>
            </div>
          </div>
        )}

        {/* Overlay 4: GAME OVER */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 select-none">
            
            {showLeaderboardInput ? (
              /* Leaderboard Submission Screen */
              <form onSubmit={handleLeaderboardSubmit} className="glass-panel p-5 rounded-2xl border border-slate-800 w-full max-w-[280px] text-center space-y-4 animate-pulse-glow" onClick={(e) => e.stopPropagation()}>
                <Award className="w-10 h-10 text-yellow-400 mx-auto animate-bounce" />
                <h3 className="text-white font-extrabold text-lg uppercase tracking-wider">New Record!</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Your score of {score} qualifies for the leaderboard! Enter your name:</p>
                <input
                  type="text"
                  maxLength={12}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white text-center font-bold placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!playerName.trim()}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-slate-950 font-extrabold py-2.5 rounded-xl transition-all text-xs"
                >
                  Submit Score
                </button>
              </form>
            ) : (
              /* Normal Game Over report */
              <div className="flex flex-col items-center w-full max-w-[280px]" onClick={(e) => e.stopPropagation()}>
                <div className="text-red-500 font-black text-3xl uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-4">
                  Game Over
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-slate-800 w-full space-y-3">
                  <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Score</span>
                    <span className="text-white font-black text-lg">{score}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">High Score</span>
                    <span className="text-yellow-400 font-extrabold text-base">{currentHighScore}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Coins Collected</span>
                    <span className="text-amber-300 font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      +{runCoins}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-full mt-6">
                  <button
                    onClick={handleRestart}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>
                  <button
                    onClick={quitToDashboard}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-800/80"
                  >
                    <Home className="w-4 h-4" /> Exit to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default GameView;
