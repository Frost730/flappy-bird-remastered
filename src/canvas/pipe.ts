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
  
  // Set up neon glow if Cyberpunk
  const isCyber = skin.id === 'cyberpunk';
  if (isCyber && skin.glowColor) {
    ctx.shadowColor = skin.glowColor;
    ctx.shadowBlur = 10;
  }

  // 1. DRAW PIPE BODY
  // Create horizontal gradient for 3D cylinder effect
  const bodyGrad = ctx.createLinearGradient(x, 0, x + width, 0);
  bodyGrad.addColorStop(0, skin.primaryColor);
  bodyGrad.addColorStop(0.3, skin.accentColor);
  bodyGrad.addColorStop(0.7, skin.primaryColor);
  bodyGrad.addColorStop(1, adjustColorBrightness(skin.primaryColor, -40));

  ctx.fillStyle = bodyGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.rect(x, bodyY, width, bodyHeight);
  ctx.fill();
  ctx.stroke();

  // Draw military camo details if military
  if (skin.id === 'military') {
    drawMilitaryCamo(ctx, x, bodyY, width, bodyHeight);
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
  if (skin.id === 'classic' || skin.id === 'night') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(x + width * 0.25, bodyY, 6, bodyHeight);
    ctx.fillRect(x + width * 0.25 - lipOffset / 2, lipY + 2, 8, lipHeight - 4);
  }

  // Neon glowing trim for Cyberpunk
  if (isCyber && skin.glowColor) {
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
