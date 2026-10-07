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
  // - velocity < 0: flapping / rising -> snappy tilt up (~ -25 deg)
  // - velocity >= 0: falling -> progressively dive down toward steep nosedive (~ 72 deg)
  const angle = velocity < 0
    ? Math.max(-0.45, velocity * 0.09)
    : velocity < 2
    ? velocity * 0.08
    : Math.min(1.25, 0.16 + (velocity - 2) * 0.2);
  ctx.rotate(angle);

  // Black outline style for retro feel
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';

  // 1. TAIL FEATHERS
  ctx.fillStyle = skin.wingColor;
  ctx.beginPath();
  ctx.moveTo(-15, -4);
  ctx.quadraticCurveTo(-25, -12, -22, -2);
  ctx.quadraticCurveTo(-26, 6, -16, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 2. MAIN BODY
  ctx.fillStyle = skin.color;
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 3. EYE
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(6, -4, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Pupil
  ctx.fillStyle = skin.eyeColor;
  ctx.beginPath();
  ctx.arc(8, -4, 2.5, 0, Math.PI * 2);
  ctx.fill();

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
  // We use sine wave of tick to squash/stretch wing height
  const flapMultiplier = Math.sin(tick * 0.4);
  const wingHeight = Math.max(2, 9 + flapMultiplier * 5);
  const wingTilt = -0.1 + flapMultiplier * 0.2; // slight wing rotation

  ctx.save();
  ctx.translate(-4, 2);
  ctx.rotate(wingTilt);
  ctx.fillStyle = skin.wingColor;
  
  ctx.beginPath();
  ctx.ellipse(0, 0, 8, wingHeight, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}
