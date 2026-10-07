import type { PipeSkin } from '../types/game';

export function drawPipes(
  ctx: CanvasRenderingContext2D,
  x: number,
  topHeight: number,
  bottomY: number,
  width: number,
  canvasHeight: number,
  skin: PipeSkin
) {
  ctx.save();

  const lipHeight = 24;
  const lipOffset = 6; // lip sticks out by this much on each side

  // Render top pipe
  drawSinglePipe(ctx, x, 0, topHeight, width, lipHeight, lipOffset, true, skin);

  // Render bottom pipe
  const bottomHeight = canvasHeight - 112 - bottomY; // 112 is ground height
  drawSinglePipe(ctx, x, bottomY, bottomHeight, width, lipHeight, lipOffset, false, skin);

  ctx.restore();
}

function drawSinglePipe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  lipHeight: number,
  lipOffset: number,
  isTop: boolean,
  skin: PipeSkin
) {
  // Lip Y Coordinate
  const lipY = isTop ? y + height - lipHeight : y;
  const bodyY = isTop ? y : y + lipHeight;
  const bodyHeight = height - lipHeight;

  ctx.save();
  
  // Set up glow if skin has glowColor
  if (skin.glowColor) {
    ctx.shadowColor = skin.glowColor;
    ctx.shadowBlur = 12;
  }

  // 1. DRAW PIPE BODY
  // Create horizontal gradient for 3D cylinder effect
  const bodyGrad = ctx.createLinearGradient(x, 0, x + width, 0);
  bodyGrad.addColorStop(0, skin.primaryColor);
  bodyGrad.addColorStop(0.3, skin.accentColor);
  bodyGrad.addColorStop(0.7, skin.primaryColor);
  bodyGrad.addColorStop(1, adjustColorBrightness(skin.primaryColor, -40));

  ctx.fillStyle = bodyGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.rect(x, bodyY, width, bodyHeight);
  ctx.fill();
  ctx.stroke();

  // Pattern overlays by skin type
  if (skin.id === 'military') {
    drawMilitaryCamo(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'candy') {
    drawCandyStripes(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'lava') {
    drawLavaVeins(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'frost') {
    drawIceCrystals(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'gold') {
    drawGoldStuds(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'toxic') {
    drawToxicSlime(ctx, x, bodyY, width, bodyHeight);
  } else if (skin.id === 'halloween') {
    drawHalloweenPipe(ctx, x, bodyY, width, bodyHeight, isTop);
  }

  // 2. DRAW PIPE LIP (CAP)
  const lipGrad = ctx.createLinearGradient(x - lipOffset, 0, x + width + lipOffset, 0);
  lipGrad.addColorStop(0, skin.accentColor);
  lipGrad.addColorStop(0.3, '#ffffff'); // bright light shine
  lipGrad.addColorStop(0.5, skin.accentColor);
  lipGrad.addColorStop(1, adjustColorBrightness(skin.accentColor, -30));

  ctx.fillStyle = lipGrad;
  ctx.beginPath();
  ctx.rect(x - lipOffset, lipY, width + lipOffset * 2, lipHeight);
  ctx.fill();
  ctx.stroke();

  // Highlight line running down the pipe (white reflection stripe)
  if (skin.id === 'classic' || skin.id === 'night' || skin.id === 'gold') {
    ctx.fillStyle = skin.id === 'gold' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(x + width * 0.25, bodyY, 6, bodyHeight);
    ctx.fillRect(x + width * 0.25 - lipOffset / 2, lipY + 2, 8, lipHeight - 4);
  }

  // Neon glowing trim for Cyberpunk & Night
  if (skin.glowColor && (skin.id === 'cyberpunk' || skin.id === 'night' || skin.id === 'toxic')) {
    ctx.strokeStyle = skin.glowColor;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    
    // Draw running glowing stripes
    ctx.beginPath();
    ctx.moveTo(x + width * 0.15, bodyY);
    ctx.lineTo(x + width * 0.15, bodyY + bodyHeight);
    ctx.moveTo(x + width * 0.85, bodyY);
    ctx.lineTo(x + width * 0.85, bodyY + bodyHeight);
    ctx.stroke();
  }

  ctx.restore();
}

// Helper to draw military camouflage diagonal stripes
function drawMilitaryCamo(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  // Clip to pipe body to prevent painting outside
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = 'rgba(74, 85, 104, 0.35)'; // Camo dark brown/gray stripe
  ctx.lineWidth = 15;
  ctx.strokeStyle = 'rgba(76, 81, 71, 0.45)'; // Camo dark green

  // Draw diagonal stripes
  for (let dy = y - w; dy < y + h + w; dy += 40) {
    ctx.beginPath();
    ctx.moveTo(x - 10, dy);
    ctx.lineTo(x + w + 10, dy + w);
    ctx.stroke();
  }

  // Draw some metal rivets/screws on the pipe border
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.strokeStyle = '#2d3748';
  ctx.lineWidth = 1;
  const rivetOffset = 10;
  for (let ry = y + 15; ry < y + h; ry += 40) {
    ctx.beginPath();
    ctx.arc(x + rivetOffset, ry, 2.5, 0, Math.PI * 2);
    ctx.arc(x + w - rivetOffset, ry, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

// Candy Cane spiral stripes
function drawCandyStripes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 14;

  for (let dy = y - w; dy < y + h + w; dy += 36) {
    ctx.beginPath();
    ctx.moveTo(x - 10, dy);
    ctx.lineTo(x + w + 10, dy + w);
    ctx.stroke();
  }
  ctx.restore();
}

// Lava fiery fissure veins
function drawLavaVeins(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 8;

  for (let vy = y + 20; vy < y + h; vy += 50) {
    ctx.beginPath();
    ctx.moveTo(x + 10, vy);
    ctx.lineTo(x + w * 0.4, vy + 12);
    ctx.lineTo(x + w * 0.7, vy - 8);
    ctx.lineTo(x + w - 10, vy + 10);
    ctx.stroke();
  }
  ctx.restore();
}

// Glacial ice crystal facets
function drawIceCrystals(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.5)';
  ctx.lineWidth = 1.5;

  for (let cy = y + 25; cy < y + h; cy += 60) {
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, cy - 18);
    ctx.lineTo(x + w * 0.75, cy);
    ctx.lineTo(x + w * 0.5, cy + 18);
    ctx.lineTo(x + w * 0.25, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

// Midas gold royal gem studs and specular sheen
function drawGoldStuds(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  // Sparkling diamond studs
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1;

  for (let gy = y + 20; gy < y + h; gy += 45) {
    ctx.beginPath();
    ctx.arc(x + 12, gy, 3, 0, Math.PI * 2);
    ctx.arc(x + w - 12, gy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

// Biohazard toxic sludge drops
function drawToxicSlime(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = 'rgba(163, 230, 53, 0.4)';
  for (let ty = y + 30; ty < y + h; ty += 55) {
    ctx.beginPath();
    ctx.arc(x + w * 0.3, ty, 6, 0, Math.PI * 2);
    ctx.arc(x + w * 0.7, ty + 15, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// Halloween carved pumpkin face and spooky cobweb
function drawHalloweenPipe(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, isTop: boolean) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  // Draw cobwebs in corners
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  const webY = isTop ? y + h - 10 : y + 10;
  ctx.beginPath();
  ctx.moveTo(x, webY);
  ctx.lineTo(x + 20, webY);
  ctx.lineTo(x, webY + (isTop ? -20 : 20));
  ctx.closePath();
  ctx.stroke();

  // Carved Jack-o'-Lantern glowing face in center of pipe
  if (h > 60) {
    const faceY = isTop ? y + h - 45 : y + 45;
    const cx = x + w * 0.5;

    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 10;

    // Glowing Eyes
    ctx.beginPath();
    // Left eye
    ctx.moveTo(cx - 12, faceY - 8);
    ctx.lineTo(cx - 4, faceY - 8);
    ctx.lineTo(cx - 8, faceY - 16);
    ctx.closePath();
    // Right eye
    ctx.moveTo(cx + 4, faceY - 8);
    ctx.lineTo(cx + 12, faceY - 8);
    ctx.lineTo(cx + 8, faceY - 16);
    ctx.closePath();
    ctx.fill();

    // Carved sinister toothy smile
    ctx.beginPath();
    ctx.moveTo(cx - 14, faceY);
    ctx.lineTo(cx - 8, faceY + 8);
    ctx.lineTo(cx - 4, faceY + 4);
    ctx.lineTo(cx, faceY + 10);
    ctx.lineTo(cx + 4, faceY + 4);
    ctx.lineTo(cx + 8, faceY + 8);
    ctx.lineTo(cx + 14, faceY);
    ctx.lineTo(cx + 10, faceY + 12);
    ctx.lineTo(cx - 10, faceY + 12);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

// Simple color adjuster to darken/lighten hex colors for gradients
function adjustColorBrightness(hex: string, percent: number): string {
  // Simple check for CSS colors or short hex
  if (!hex.startsWith('#')) return hex;
  
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  R = Math.max(0, Math.min(255, R + percent));
  G = Math.max(0, Math.min(255, G + percent));
  B = Math.max(0, Math.min(255, B + percent));

  const rHex = R.toString(16).padStart(2, '0');
  const gHex = G.toString(16).padStart(2, '0');
  const bHex = B.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
