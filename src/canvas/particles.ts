export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity?: number;
  rotation?: number;
  rotationSpeed?: number;
  type: 'flap' | 'coin' | 'feather';
}

export function createFlapParticles(x: number, y: number, color: string): Particle[] {
  const count = 3;
  const list: Particle[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      x: x - 12,
      y: y + (Math.random() * 8 - 4),
      vx: -1.5 - Math.random() * 1.5,
      vy: Math.random() * 1 - 0.5,
      size: 4 + Math.random() * 4,
      color: color,
      alpha: 0.8,
      decay: 0.03 + Math.random() * 0.02,
      type: 'flap'
    });
  }
  return list;
}

export function createCoinParticles(x: number, y: number, themeId: string): Particle[] {
  const count = 8;
  const list: Particle[] = [];
  let color = '#fef08a'; // Gold by default
  
  if (themeId === 'cyberpunk') {
    color = '#06b6d4'; // Cyan neon
  } else if (themeId === 'military') {
    color = '#f59e0b'; // Amber copper
  }

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    list.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 3,
      color: i % 2 === 0 ? color : '#ffffff',
      alpha: 1.0,
      decay: 0.04 + Math.random() * 0.03,
      gravity: 0.05,
      type: 'coin'
    });
  }
  return list;
}

export function createHitParticles(
  x: number,
  y: number,
  bodyColor: string,
  wingColor: string
): Particle[] {
  const count = 15;
  const list: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;
    list.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5, // drift upwards slightly initially
      size: 4 + Math.random() * 5,
      color: i % 2 === 0 ? bodyColor : wingColor,
      alpha: 1.0,
      decay: 0.02 + Math.random() * 0.015,
      gravity: 0.12, // heavy fall
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      type: 'feather'
    });
  }
  return list;
}

export function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => {
      const nextP = { ...p };
      nextP.x += nextP.vx;
      nextP.y += nextP.vy;
      if (nextP.gravity) {
        nextP.vy += nextP.gravity;
      }
      if (nextP.rotation !== undefined && nextP.rotationSpeed !== undefined) {
        nextP.rotation += nextP.rotationSpeed;
      }
      nextP.alpha -= nextP.decay;
      return nextP;
    })
    .filter((p) => p.alpha > 0);
}

export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  ctx.save();
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle = p.color;

    if (p.type === 'flap') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 'coin') {
      // Draw a sparkle star/diamond
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size);
      ctx.lineTo(p.x + p.size, p.y);
      ctx.lineTo(p.x, p.y + p.size);
      ctx.lineTo(p.x - p.size, p.y);
      ctx.closePath();
      ctx.fill();
    } else if (p.type === 'feather') {
      // Draw an angled oval/feather
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.rotation !== undefined) {
        ctx.rotate(p.rotation);
      }
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
}
