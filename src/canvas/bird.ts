import type { BirdSkin } from '../types/game';

export function drawBird(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  velocity: number,
  tick: number,
  skin: BirdSkin
) {
  ctx.save();
  ctx.translate(x, y);

  // Calculate rotation based on velocity:
  // - velocity < 0: flapping / rising -> tilt up
  // - velocity > 0: falling -> tilt down
  // Clamp between -25 deg (-0.43 rad) and 70 deg (1.22 rad)
  const angle = Math.max(-0.4, Math.min(1.1, velocity * 0.07));
  ctx.rotate(angle);

  // Black outline style for retro feel
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';

  const isCrown = skin.special === 'crown' || skin.id === 'golden';
  const isFire = skin.special === 'fire' || skin.id === 'red';
  const isMecha = skin.special === 'mecha' || skin.id === 'blue';
  const isNinja = skin.special === 'ninja';
  const isToxic = skin.special === 'toxic';
  const isCosmic = skin.special === 'cosmic';
  const isHalloween = skin.special === 'halloween' || skin.id === 'halloween';

  // 0. AURA / HALO / SPARKLES
  if (isHalloween) {
    // Flickering candle flame glow
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 10 + Math.sin(tick * 0.25) * 5;
  } else if (isCrown) {
    // Subtle golden sparkle particle around king bird
    const sparkleAngle = tick * 0.05;
    const sx = Math.cos(sparkleAngle) * 22;
    const sy = Math.sin(sparkleAngle) * 14 - 6;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(sx, sy, 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (isCosmic) {
    // Floating celestial halo above head
    ctx.save();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(3, -20, 11, 4, -0.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 1. TAIL FEATHERS
  if (isMecha) {
    // Cyber thruster exhaust
    ctx.fillStyle = '#334155';
    ctx.fillRect(-20, -4, 8, 8);
    ctx.strokeRect(-20, -4, 8, 8);
    // Neon jet flame
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-20, -2);
    ctx.lineTo(-27 - Math.sin(tick * 0.8) * 4, 0);
    ctx.lineTo(-20, 2);
    ctx.closePath();
    ctx.fill();
  } else if (isFire) {
    // Blazing triple flame tail
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(-14, -5);
    ctx.lineTo(-26, -12);
    ctx.lineTo(-20, -2);
    ctx.lineTo(-28, 4);
    ctx.lineTo(-14, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    // Standard rounded retro tail
    ctx.fillStyle = skin.wingColor;
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.quadraticCurveTo(-25, -12, -22, -2);
    ctx.quadraticCurveTo(-26, 6, -16, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Ninja headband ties (fluttering behind head)
  if (isNinja) {
    const wave = Math.sin(tick * 0.3) * 4;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, -7);
    ctx.quadraticCurveTo(-22, -10 + wave, -30, -5 + wave);
    ctx.moveTo(-12, -5);
    ctx.quadraticCurveTo(-20, -4 - wave, -28, 2 - wave);
    ctx.stroke();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
  }

  // 2. MAIN BODY
  ctx.fillStyle = skin.color;
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Head accessories / plumage
  if (isCrown) {
    // 3-Point Royal Golden Crown
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(-7, -14);
    ctx.lineTo(-11, -24);
    ctx.lineTo(-3, -19);
    ctx.lineTo(3, -27);
    ctx.lineTo(9, -19);
    ctx.lineTo(16, -23);
    ctx.lineTo(12, -13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Central Royal Ruby Gem
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(3, -18, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (isFire) {
    // Firebird flaming crest
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(-6, -14);
    ctx.quadraticCurveTo(-4, -25, 4, -26);
    ctx.quadraticCurveTo(8, -19, 12, -12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (isMecha) {
    // Titanium Antenna
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(-2, -24);
    ctx.stroke();
    // Blinking Cyan Diode
    ctx.fillStyle = tick % 20 < 10 ? '#00f5ff' : '#0284c7';
    ctx.beginPath();
    ctx.arc(-2, -25, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
  } else if (isToxic) {
    // Dragon horns
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(-8, -14);
    ctx.lineTo(-14, -24);
    ctx.lineTo(-3, -16);
    ctx.lineTo(2, -25);
    ctx.lineTo(7, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (skin.special === 'classic') {
    // Cute Rosy Cheek
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.arc(8, 4, 3.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (isHalloween) {
    // Green curved pumpkin stem
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.quadraticCurveTo(4, -26, 9, -24);
    ctx.stroke();
    // Stem base
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(0, -15, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ninja headband band across forehead
  if (isNinja) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.rect(-6, -11, 19, 5);
    ctx.fill();
    ctx.strokeRect(-6, -11, 19, 5);
  }

  // 3. EYE
  if (isMecha) {
    // Glowing Cyber Visor
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, -7, 11, 7);
    ctx.strokeRect(4, -7, 11, 7);
    ctx.fillStyle = '#00f5ff';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 6;
    ctx.fillRect(6, -5, 8, 3.5);
    ctx.shadowBlur = 0;
  } else if (isHalloween) {
    // Carved triangular jack-o'-lantern eye
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(4, -1);
    ctx.lineTo(12, -1);
    ctx.lineTo(8, -9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner ember core
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(6, -2);
    ctx.lineTo(10, -2);
    ctx.lineTo(8, -7);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(6, -4, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pupil / Iris
    ctx.fillStyle = skin.eyeColor;
    if (isToxic) {
      // Reptilian slit pupil
      ctx.beginPath();
      ctx.ellipse(8, -4, 1.2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(8, -4, isNinja ? 3 : 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Shiny reflection dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(9, -5.5, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. BEAK
  ctx.fillStyle = skin.beakColor;
  ctx.beginPath();
  ctx.moveTo(14, -2);
  ctx.lineTo(24, 2);
  ctx.lineTo(12, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 5. WING (flapping based on tick)
  const flapMultiplier = Math.sin(tick * 0.4);
  const wingHeight = Math.max(2, 9 + flapMultiplier * 5);
  const wingTilt = -0.1 + flapMultiplier * 0.2;

  ctx.save();
  ctx.translate(-4, 2);
  ctx.rotate(wingTilt);
  ctx.fillStyle = skin.wingColor;

  if (isHalloween) {
    // Spooky scalloped bat wing
    ctx.beginPath();
    ctx.moveTo(4, -1);
    ctx.quadraticCurveTo(-2, -wingHeight - 2, -12, -wingHeight);
    ctx.quadraticCurveTo(-8, -wingHeight / 2, -10, 0);
    ctx.quadraticCurveTo(-5, wingHeight / 2, -6, wingHeight);
    ctx.quadraticCurveTo(0, wingHeight / 2, 4, 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, wingHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Wing accent line / gold trim for royal skin
  if (isCrown) {
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, Math.max(1, wingHeight - 3), 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();

  ctx.restore();
}
