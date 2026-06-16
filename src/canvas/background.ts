export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scrollX: number,
  themeId: string
) {
  // Clear screen
  ctx.clearRect(0, 0, width, height);

  switch (themeId) {
    case 'night':
      drawNightTheme(ctx, width, height, scrollX);
      break;
    case 'cyberpunk':
      drawCyberpunkTheme(ctx, width, height, scrollX);
      break;
    case 'military':
      drawMilitaryTheme(ctx, width, height, scrollX);
      break;
    case 'classic':
    default:
      drawClassicTheme(ctx, width, height, scrollX);
      break;
  }
}

// 1. CLASSIC THEME
function drawClassicTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Sky Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#4ec0ca');
  grad.addColorStop(1, '#a3e2e6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Clouds (Parallax 0.2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  const cloudOffset = (scrollX * 0.2) % 400;
  for (let i = -1; i < width / 400 + 1; i++) {
    const cx = i * 400 - cloudOffset;
    drawCloud(ctx, cx + 50, 120);
    drawCloud(ctx, cx + 250, 80);
  }

  // Far Mountains/Trees (Parallax 0.5)
  ctx.fillStyle = '#7cd874';
  const treeOffset = (scrollX * 0.5) % 200;
  for (let i = -1; i < width / 200 + 1; i++) {
    const tx = i * 200 - treeOffset;
    ctx.beginPath();
    ctx.moveTo(tx, height - 112);
    ctx.lineTo(tx + 40, height - 150);
    ctx.lineTo(tx + 80, height - 112);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(tx + 60, height - 112);
    ctx.lineTo(tx + 110, height - 165);
    ctx.lineTo(tx + 160, height - 112);
    ctx.fill();
  }

  // Bushes (Parallax 0.8)
  ctx.fillStyle = '#55b04c';
  const bushOffset = (scrollX * 0.8) % 150;
  for (let i = -1; i < width / 150 + 1; i++) {
    const bx = i * 150 - bushOffset;
    ctx.beginPath();
    ctx.arc(bx + 30, height - 112, 25, 0, Math.PI, true);
    ctx.arc(bx + 60, height - 112, 35, 0, Math.PI, true);
    ctx.arc(bx + 90, height - 112, 20, 0, Math.PI, true);
    ctx.fill();
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 25, y - 10, 30, 0, Math.PI * 2);
  ctx.arc(x + 55, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 25, y + 10, 20, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// 2. NIGHT THEME
function drawNightTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Sky Gradient (Dark purple to indigo)
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#0f0c1b');
  grad.addColorStop(1, '#201a30');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Moon (Fixed or very slow)
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.arc(width - 80, 80, 30, 0, Math.PI * 2);
  ctx.fill();
  // Moon shadow
  ctx.fillStyle = '#0f0c1b';
  ctx.beginPath();
  ctx.arc(width - 92, 80, 26, 0, Math.PI * 2);
  ctx.fill();

  // Stars (Parallax 0.05)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  const starOffset = (scrollX * 0.05) % 300;
  for (let i = 0; i < 4; i++) {
    // Generate deterministic star positions based on grid index
    const sx = (i * 150 - starOffset + 300) % (width + 100) - 50;
    const sy = (i * 73 + 40) % 200;
    const size = (i % 2 === 0) ? 2 : 1;
    ctx.fillRect(sx, sy, size, size);
  }

  // Skyline (Parallax 0.3)
  ctx.fillStyle = '#151026';
  const cityOffset = (scrollX * 0.3) % 240;
  for (let i = -1; i < width / 80 + 2; i++) {
    const cx = i * 80 - cityOffset;
    const h = 100 + ((i * 37) % 120);
    ctx.fillRect(cx, height - 112 - h, 70, h);
    
    // Windows
    ctx.fillStyle = 'rgba(253, 224, 71, 0.15)'; // Yellow glowing windows
    for (let w = cx + 10; w < cx + 60; w += 15) {
      for (let wy = height - 112 - h + 15; wy < height - 120; wy += 25) {
        if ((w + wy) % 3 === 0) {
          ctx.fillRect(w, wy, 8, 12);
        }
      }
    }
    ctx.fillStyle = '#151026'; // Restore color
  }

  // Closer silhouettes (Parallax 0.6)
  ctx.fillStyle = '#0e0b1a';
  const closeOffset = (scrollX * 0.6) % 180;
  for (let i = -1; i < width / 90 + 2; i++) {
    const cx = i * 90 - closeOffset;
    const h = 50 + ((i * 29) % 60);
    ctx.fillRect(cx, height - 112 - h, 80, h);
  }
}

// 3. CYBERPUNK THEME
function drawCyberpunkTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Deep space background
  ctx.fillStyle = '#09090e';
  ctx.fillRect(0, 0, width, height);

  // Neon Grid Background (Parallax 0.4)
  const gridOffset = (scrollX * 0.4) % 40;
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.1)'; // Pink grid lines
  ctx.lineWidth = 1;

  // Vertical lines
  for (let x = -gridOffset; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height - 112);
    ctx.stroke();
  }
  // Horizontal lines
  for (let y = 0; y < height - 112; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Futuristic skyscrapers (Parallax 0.3)
  ctx.fillStyle = '#11101d';
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)'; // Cyan outlines
  ctx.lineWidth = 2;
  const towerOffset = (scrollX * 0.3) % 300;
  for (let i = -1; i < width / 100 + 2; i++) {
    const tx = i * 100 - towerOffset;
    const h = 120 + ((i * 47) % 220);
    const w = 70;
    
    // Draw filled block
    ctx.fillRect(tx, height - 112 - h, w, h);
    // Draw neon outline
    ctx.strokeRect(tx, height - 112 - h, w, h);

    // Decorative holographic neon details
    ctx.fillStyle = i % 2 === 0 ? 'rgba(236, 72, 153, 0.3)' : 'rgba(6, 182, 212, 0.3)';
    ctx.fillRect(tx + w / 2 - 2, height - 112 - h + 10, 4, h - 30);
  }
}

// 4. MILITARY THEME
function drawMilitaryTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Dusty Sky
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#7c8672'); // Muted green-gray
  grad.addColorStop(1, '#c5baa6'); // Sand/beige
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Sun (Dull orange/dusty sun)
  ctx.fillStyle = 'rgba(239, 100, 30, 0.35)';
  ctx.beginPath();
  ctx.arc(80, 100, 45, 0, Math.PI * 2);
  ctx.fill();

  // Far Dunes / Camo hills (Parallax 0.3)
  ctx.fillStyle = '#898e79';
  const duneOffset1 = (scrollX * 0.3) % 360;
  for (let i = -1; i < width / 180 + 2; i++) {
    const dx = i * 180 - duneOffset1;
    ctx.beginPath();
    ctx.moveTo(dx, height - 112);
    ctx.quadraticCurveTo(dx + 90, height - 180 + ((i * 13) % 30), dx + 180, height - 112);
    ctx.fill();
  }

  // Mid Dunes / Camo hills (Parallax 0.6)
  ctx.fillStyle = '#6d755e';
  const duneOffset2 = (scrollX * 0.6) % 300;
  for (let i = -1; i < width / 150 + 2; i++) {
    const dx = i * 150 - duneOffset2;
    ctx.beginPath();
    ctx.moveTo(dx, height - 112);
    ctx.quadraticCurveTo(dx + 75, height - 150 + ((i * 7) % 25), dx + 150, height - 112);
    ctx.fill();
  }
}

// Helper to draw ground floor scroll
export function drawGround(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scrollX: number,
  themeId: string
) {
  const groundHeight = 112;
  const gy = height - groundHeight;

  let fillStyle = '#ddd896';
  let borderStyle = '#543847';
  let patternStyle = '#bab370';

  if (themeId === 'night') {
    fillStyle = '#1c152a';
    borderStyle = '#2f2142';
    patternStyle = '#120d1c';
  } else if (themeId === 'cyberpunk') {
    fillStyle = '#06060c';
    borderStyle = '#ec4899'; // Neon pink lip
    patternStyle = '#111827';
  } else if (themeId === 'military') {
    fillStyle = '#7a705e';
    borderStyle = '#3f392f';
    patternStyle = '#5e5647';
  }

  // Draw ground main block
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, gy, width, groundHeight);

  // Draw top border line
  ctx.strokeStyle = borderStyle;
  ctx.lineWidth = themeId === 'cyberpunk' ? 4 : 2;
  ctx.beginPath();
  ctx.moveTo(0, gy);
  ctx.lineTo(width, gy);
  ctx.stroke();

  // Draw diagonal grass/sand/neon hatching patterns (moving)
  ctx.strokeStyle = patternStyle;
  ctx.lineWidth = 3;
  const hatchOffset = scrollX % 24;
  for (let x = -hatchOffset; x < width + 24; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, gy + 4);
    ctx.lineTo(x - 12, gy + groundHeight);
    ctx.stroke();
  }

  // Special decorative details for Cyberpunk (neon grid base)
  if (themeId === 'cyberpunk') {
    ctx.fillStyle = '#06b6d4'; // Cyan glowing dots on the ground
    for (let x = -hatchOffset; x < width + 24; x += 48) {
      ctx.beginPath();
      ctx.arc(x + 10, gy + 30, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
