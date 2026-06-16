export function drawCoin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tick: number,
  themeId: string
) {
  ctx.save();
  ctx.translate(x, y);

  // 3D rotation effect by scaling the width of the coin over time
  // Cosine loops between -1 and 1, simulating rotation
  const scaleX = Math.cos(tick * 0.15);
  ctx.scale(scaleX, 1);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.5;

  if (themeId === 'cyberpunk') {
    drawCyberCoin(ctx);
  } else if (themeId === 'military') {
    drawMilitaryBadge(ctx);
  } else {
    drawClassicGoldCoin(ctx);
  }

  ctx.restore();
}

function drawClassicGoldCoin(ctx: CanvasRenderingContext2D) {
  const radius = 10;

  // Outer gold ring
  const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, radius);
  grad.addColorStop(0, '#fef08a'); // yellow 200
  grad.addColorStop(0.6, '#eab308'); // yellow 500
  grad.addColorStop(1, '#ca8a04'); // yellow 600

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Inner star or circle detail
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Coin glint shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(-3, -3, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawCyberCoin(ctx: CanvasRenderingContext2D) {
  const radius = 9;

  // Draw glowing cyan holographic diamond
  ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2;

  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(radius, 0);
  ctx.lineTo(0, radius);
  ctx.lineTo(-radius, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner neon detail
  ctx.strokeStyle = '#ec4899'; // magenta inner border
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.4);
  ctx.lineTo(radius * 0.4, 0);
  ctx.lineTo(0, radius * 0.4);
  ctx.lineTo(-radius * 0.4, 0);
  ctx.closePath();
  ctx.stroke();
}

function drawMilitaryBadge(ctx: CanvasRenderingContext2D) {
  const size = 9;

  // Bronze/copper hexagonal dog-tag/badge
  const grad = ctx.createLinearGradient(-size, -size, size, size);
  grad.addColorStop(0, '#d97706'); // amber 600
  grad.addColorStop(0.5, '#b45309'); // amber 700
  grad.addColorStop(1, '#78350f'); // amber 900

  ctx.fillStyle = grad;
  ctx.beginPath();
  // Draw a hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = Math.cos(angle) * size;
    const py = Math.sin(angle) * size;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner star engraving
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  // Simple 5-point star
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 2.5) * i - Math.PI / 2;
    const px = Math.cos(angle) * (size * 0.4);
    const py = Math.sin(angle) * (size * 0.4);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}
