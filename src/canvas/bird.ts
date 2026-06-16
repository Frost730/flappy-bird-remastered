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
