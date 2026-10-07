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
    case 'sunset':
      drawSunsetTheme(ctx, width, height, scrollX);
      break;
    case 'candy':
      drawCandyTheme(ctx, width, height, scrollX);
      break;
    case 'matrix':
      drawMatrixTheme(ctx, width, height, scrollX);
      break;
    case 'inferno':
      drawInfernoTheme(ctx, width, height, scrollX);
      break;
    case 'halloween':
      drawHalloweenTheme(ctx, width, height, scrollX);
      break;
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

// 5. SUNSET THEME
function drawSunsetTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Rich Sunset Sky Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height - 112);
  grad.addColorStop(0, '#3b0764'); // Deep dusk violet
  grad.addColorStop(0.35, '#7e22ce'); // Purple
  grad.addColorStop(0.65, '#ea580c'); // Warm fiery orange
  grad.addColorStop(1, '#fde047'); // Golden horizon
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Radiant Golden Setting Sun
  const sunY = height - 190;
  ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
  ctx.beginPath();
  ctx.arc(width * 0.5, sunY, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(width * 0.5, sunY, 32, 0, Math.PI * 2);
  ctx.fill();

  // Distant Island Mountains (Parallax 0.25)
  ctx.fillStyle = '#4c1d95';
  const islandOffset = (scrollX * 0.25) % 360;
  for (let i = -1; i < width / 180 + 2; i++) {
    const ix = i * 180 - islandOffset;
    ctx.beginPath();
    ctx.moveTo(ix, height - 112);
    ctx.lineTo(ix + 60, height - 160);
    ctx.lineTo(ix + 120, height - 112);
    ctx.fill();
  }

  // Shimmering Sunset Ocean Waves (Parallax 0.5)
  ctx.fillStyle = '#9a3412';
  ctx.fillRect(0, height - 128, width, 16);
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
  ctx.lineWidth = 1.5;
  const waveOffset = (scrollX * 0.5) % 40;
  for (let wx = -waveOffset; wx < width + 40; wx += 24) {
    ctx.beginPath();
    ctx.moveTo(wx, height - 122);
    ctx.lineTo(wx + 14, height - 122);
    ctx.stroke();
  }
}

// 6. CANDY WONDERLAND THEME
function drawCandyTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Cotton candy sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#f472b6'); // Pink
  grad.addColorStop(0.5, '#fbcfe8'); // Soft rose
  grad.addColorStop(1, '#e9d5ff'); // Lavender
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Marshmallow Clouds (Parallax 0.2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  const cloudOffset = (scrollX * 0.2) % 350;
  for (let i = -1; i < width / 350 + 2; i++) {
    const cx = i * 350 - cloudOffset;
    drawCloud(ctx, cx + 60, 100);
    drawCloud(ctx, cx + 240, 60);
  }

  // Gumdrop Hills (Parallax 0.4)
  ctx.fillStyle = '#f43f5e';
  const hillOffset = (scrollX * 0.4) % 240;
  for (let i = -1; i < width / 120 + 2; i++) {
    const hx = i * 120 - hillOffset;
    ctx.beginPath();
    ctx.arc(hx + 60, height - 112, 50, 0, Math.PI, true);
    ctx.fill();
  }

  // Swirled Lollipop Trees (Parallax 0.7)
  const lollyOffset = (scrollX * 0.7) % 200;
  for (let i = -1; i < width / 160 + 2; i++) {
    const lx = i * 160 - lollyOffset + 40;
    const ly = height - 170;
    // White stick
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lx - 3, ly, 6, 58);
    // Lollipop candy head
    ctx.fillStyle = i % 2 === 0 ? '#ec4899' : '#06b6d4';
    ctx.beginPath();
    ctx.arc(lx, ly, 22, 0, Math.PI * 2);
    ctx.fill();
    // Inner swirl
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(lx, ly, 12, 0, Math.PI * 1.5);
    ctx.stroke();
  }
}

// 7. MATRIX TERMINAL THEME
function drawMatrixTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Deep CRT monitor background
  ctx.fillStyle = '#020b05';
  ctx.fillRect(0, 0, width, height);

  // Digital Code Streams (Parallax 0.3)
  ctx.fillStyle = 'rgba(34, 197, 94, 0.75)'; // Phosphor green
  ctx.font = 'bold 12px monospace';
  const codeOffset = (scrollX * 0.3) % 60;
  const chars = ['0', '1', 'X', '7', 'Z', '#', '%', '9'];

  for (let col = 0; col < width / 26 + 1; col++) {
    const x = col * 26 - codeOffset;
    const streamY = ((col * 47 + scrollX * 0.8) % (height - 112));
    for (let row = 0; row < 6; row++) {
      const y = (streamY + row * 18) % (height - 112);
      const ch = chars[(col + row) % chars.length];
      const alpha = 0.9 - row * 0.15;
      ctx.fillStyle = `rgba(74, 222, 128, ${Math.max(0.1, alpha)})`;
      ctx.fillText(ch, x, y);
    }
  }

  // Background Mainframe Racks (Parallax 0.5)
  ctx.fillStyle = 'rgba(5, 46, 22, 0.4)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
  ctx.lineWidth = 1;
  const rackOffset = (scrollX * 0.5) % 180;
  for (let i = -1; i < width / 90 + 2; i++) {
    const rx = i * 90 - rackOffset;
    ctx.fillRect(rx, height - 190, 60, 78);
    ctx.strokeRect(rx, height - 190, 60, 78);
  }
}

// 8. INFERNO MAGMA PEAKS THEME
function drawInfernoTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Volcanic Ash & Smoke Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#1c1917'); // Black coal
  grad.addColorStop(0.5, '#450a0a'); // Dark blood red
  grad.addColorStop(1, '#991b1b'); // Magma glow
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Rising fiery ember specks
  ctx.fillStyle = '#f97316';
  for (let e = 0; e < 15; e++) {
    const ex = (e * 67 + scrollX * 0.2) % width;
    const ey = (height - 130 - (e * 43 + scrollX * 0.6) % 250);
    const sz = (e % 3) + 1.5;
    ctx.beginPath();
    ctx.arc(ex, ey, sz, 0, Math.PI * 2);
    ctx.fill();
  }

  // Jagged Obsidian Volcano Peaks (Parallax 0.3)
  ctx.fillStyle = '#1c1917';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  const peakOffset = (scrollX * 0.3) % 280;
  for (let i = -1; i < width / 140 + 2; i++) {
    const px = i * 140 - peakOffset;
    ctx.beginPath();
    ctx.moveTo(px, height - 112);
    ctx.lineTo(px + 45, height - 200 - ((i * 17) % 40));
    ctx.lineTo(px + 90, height - 112);
    ctx.fill();
    ctx.stroke();

    // Cascading lava flow line down the peak
    ctx.strokeStyle = '#fb923c';
    ctx.beginPath();
    ctx.moveTo(px + 45, height - 200 - ((i * 17) % 40));
    ctx.lineTo(px + 50, height - 140);
    ctx.lineTo(px + 42, height - 112);
    ctx.stroke();
    ctx.strokeStyle = '#ef4444';
  }
}

// 9. HALLOWEEN THEME
function drawHalloweenTheme(ctx: CanvasRenderingContext2D, width: number, height: number, scrollX: number) {
  // Midnight Spooky Sky Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#090214'); // Pitch midnight violet
  grad.addColorStop(0.5, '#2e1065'); // Witch purple
  grad.addColorStop(1, '#581c87'); // Eerie plum
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Giant Glowing Harvest Moon
  const moonX = width - 85;
  const moonY = 85;
  
  // Outer eerie orange aura
  ctx.fillStyle = 'rgba(249, 115, 22, 0.22)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 52, 0, Math.PI * 2);
  ctx.fill();

  // Full Moon Disc
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 34, 0, Math.PI * 2);
  ctx.fill();

  // Moon craters
  ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
  ctx.beginPath();
  ctx.arc(moonX - 8, moonY - 6, 7, 0, Math.PI * 2);
  ctx.arc(moonX + 10, moonY + 8, 9, 0, Math.PI * 2);
  ctx.arc(moonX - 4, moonY + 12, 5, 0, Math.PI * 2);
  ctx.fill();

  // Flying Silhouette Bats (Parallax 0.15)
  ctx.fillStyle = '#0f051d';
  const batOffset = (scrollX * 0.15) % 360;
  for (let i = 0; i < 4; i++) {
    const bx = (i * 120 - batOffset + 360) % (width + 60) - 20;
    const by = 50 + ((i * 37) % 90);
    const flap = Math.sin(scrollX * 0.2 + i * 2) * 5;
    
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx - 6, by - 6 + flap, bx - 14, by - 2 + flap);
    ctx.quadraticCurveTo(bx - 8, by + 4, bx, by + 3);
    ctx.quadraticCurveTo(bx + 8, by + 4, bx + 14, by - 2 + flap);
    ctx.quadraticCurveTo(bx + 6, by - 6 + flap, bx, by);
    ctx.fill();
  }

  // Cemetery Gravestones & Twisted Trees (Parallax 0.35)
  ctx.fillStyle = '#170f24';
  const cemeteryOffset = (scrollX * 0.35) % 240;
  for (let i = -1; i < width / 90 + 2; i++) {
    const cx = i * 90 - cemeteryOffset;
    if (i % 2 === 0) {
      // Crooked tombstone
      ctx.beginPath();
      ctx.moveTo(cx, height - 112);
      ctx.lineTo(cx, height - 140);
      ctx.arc(cx + 10, height - 140, 10, Math.PI, 0);
      ctx.lineTo(cx + 20, height - 112);
      ctx.fill();
      // Cross carving on tombstone
      ctx.fillStyle = '#3b0764';
      ctx.fillRect(cx + 8, height - 144, 4, 14);
      ctx.fillRect(cx + 5, height - 139, 10, 3.5);
      ctx.fillStyle = '#170f24';
    } else {
      // Gnarled dead spooky tree
      ctx.beginPath();
      ctx.moveTo(cx + 10, height - 112);
      ctx.lineTo(cx + 13, height - 165);
      // Left twisted branch
      ctx.lineTo(cx - 5, height - 180);
      ctx.lineTo(cx - 3, height - 176);
      ctx.lineTo(cx + 14, height - 160);
      // Right twisted branch
      ctx.lineTo(cx + 15, height - 172);
      ctx.lineTo(cx + 28, height - 185);
      ctx.lineTo(cx + 26, height - 181);
      ctx.lineTo(cx + 17, height - 156);
      ctx.lineTo(cx + 19, height - 112);
      ctx.fill();
    }
  }

  // Floating purple spooky graveyard mist (Parallax 0.6)
  ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
  const mistOffset = (scrollX * 0.6) % 180;
  for (let mx = -mistOffset; mx < width + 180; mx += 140) {
    ctx.beginPath();
    ctx.arc(mx + 60, height - 120, 45, 0, Math.PI * 2);
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
  } else if (themeId === 'sunset') {
    fillStyle = '#7c2d12';
    borderStyle = '#ea580c';
    patternStyle = '#9a3412';
  } else if (themeId === 'candy') {
    fillStyle = '#db2777';
    borderStyle = '#f43f5e';
    patternStyle = '#fbcfe8';
  } else if (themeId === 'matrix') {
    fillStyle = '#022c22';
    borderStyle = '#10b981';
    patternStyle = '#059669';
  } else if (themeId === 'inferno') {
    fillStyle = '#18181b';
    borderStyle = '#dc2626';
    patternStyle = '#991b1b';
  } else if (themeId === 'halloween') {
    fillStyle = '#170f24';
    borderStyle = '#ea580c'; // Jack-o'-lantern orange border
    patternStyle = '#3b0764';
  }

  // Draw ground main block
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, gy, width, groundHeight);

  // Draw top border line
  ctx.strokeStyle = borderStyle;
  ctx.lineWidth = themeId === 'cyberpunk' || themeId === 'matrix' || themeId === 'halloween' ? 4 : 2;
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

  // Special decorative details for Cyberpunk & Matrix
  if (themeId === 'cyberpunk') {
    ctx.fillStyle = '#06b6d4'; // Cyan glowing dots on the ground
    for (let x = -hatchOffset; x < width + 24; x += 48) {
      ctx.beginPath();
      ctx.arc(x + 10, gy + 30, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (themeId === 'matrix') {
    ctx.fillStyle = '#22c55e'; // Phosphor green square nodes
    for (let x = -hatchOffset; x < width + 24; x += 36) {
      ctx.fillRect(x + 12, gy + 22, 3, 3);
    }
  } else if (themeId === 'candy') {
    // Sugar sprinkles
    const sprinkleColors = ['#fde047', '#38bdf8', '#ffffff'];
    for (let x = -hatchOffset; x < width + 24; x += 32) {
      ctx.fillStyle = sprinkleColors[Math.abs(Math.floor(x)) % sprinkleColors.length];
      ctx.fillRect(x + 8, gy + 20, 6, 2.5);
    }
  } else if (themeId === 'halloween') {
    // Little glowing Jack-o'-lantern pumpkins along the graveyard edge
    for (let x = -hatchOffset; x < width + 36; x += 72) {
      const px = x + 16;
      const py = gy + 24;
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      // Glowing candle eyes
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(px - 3, py - 2, 2, 2);
      ctx.fillRect(px + 1, py - 2, 2, 2);
      ctx.fillRect(px - 2, py + 2, 4, 1.5);
    }
  }
}
