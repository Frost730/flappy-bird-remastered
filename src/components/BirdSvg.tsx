import React from 'react';
import type { BirdSkin } from '../types/game';
import { Dices } from 'lucide-react';

interface BirdSvgProps {
  bird: BirdSkin;
  size?: number;
}

export const BirdSvg: React.FC<BirdSvgProps> = ({ bird, size = 48 }) => {
  if (bird.id === 'random' || bird.special === 'random') {
    return (
      <div 
        className="flex items-center justify-center animate-bounce"
        style={{ width: size, height: size }}
      >
        <Dices className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" style={{ width: size * 0.7, height: size * 0.7 }} />
      </div>
    );
  }

  const isCrown = bird.special === 'crown' || bird.id === 'golden';
  const isFire = bird.special === 'fire' || bird.id === 'red';
  const isMecha = bird.special === 'mecha' || bird.id === 'blue';
  const isNinja = bird.special === 'ninja';
  const isToxic = bird.special === 'toxic';
  const isCosmic = bird.special === 'cosmic';

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="overflow-visible">
      {/* Cosmic Halo */}
      {isCosmic && (
        <ellipse cx="25" cy="8" rx="10" ry="3.5" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 2" />
      )}

      {/* Tail */}
      {isMecha ? (
        <g>
          <rect x="2" y="21" width="7" height="6" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
          <path d="M 2 22 L -3 24 L 2 26 Z" fill="#38bdf8" />
        </g>
      ) : isFire ? (
        <path d="M 12 21 L 0 14 L 6 23 L -2 30 L 12 27 Z" fill="#f97316" stroke="#1e293b" strokeWidth="1.5" />
      ) : (
        <path d="M 10 24 Q 0 16 2 24 Q 0 32 10 28 Z" fill={bird.wingColor} stroke="#1e293b" strokeWidth="1.5" />
      )}

      {/* Ninja fluttering ribbons */}
      {isNinja && (
        <path d="M 14 18 Q 4 15 0 20 M 14 20 Q 6 22 2 28" fill="none" stroke="#ef4444" strokeWidth="2.5" />
      )}

      {/* Body */}
      <circle cx="24" cy="24" r="14" fill={bird.color} stroke="#1e293b" strokeWidth="2" />

      {/* Rosy Cheek */}
      {bird.special === 'classic' && (
        <circle cx="31" cy="27" r="3" fill="#fb7185" />
      )}

      {/* Dragon horns */}
      {isToxic && (
        <path d="M 17 12 L 12 4 L 21 10 L 26 3 L 28 12 Z" fill="#15803d" stroke="#1e293b" strokeWidth="1.5" />
      )}

      {/* Fire plumage */}
      {isFire && (
        <path d="M 18 12 Q 20 2 27 3 Q 29 8 32 14 Z" fill="#facc15" stroke="#1e293b" strokeWidth="1.5" />
      )}

      {/* Crown */}
      {isCrown && (
        <g>
          <path d="M 17 12 L 14 4 L 20 8 L 25 2 L 30 8 L 36 4 L 33 12 Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="25" cy="9" r="2" fill="#dc2626" />
        </g>
      )}

      {/* Mecha Antenna */}
      {isMecha && (
        <g>
          <line x1="22" y1="11" x2="20" y2="3" stroke="#64748b" strokeWidth="2" />
          <circle cx="20" cy="3" r="2" fill="#00f5ff" />
        </g>
      )}

      {/* Ninja Headband */}
      {isNinja && (
        <rect x="18" y="14" width="16" height="4.5" fill="#ef4444" stroke="#1e293b" strokeWidth="1.2" />
      )}

      {/* Eye / Visor */}
      {isMecha ? (
        <g>
          <rect x="27" y="18" width="10" height="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" rx="1" />
          <rect x="29" y="19.5" width="7" height="3" fill="#00f5ff" />
        </g>
      ) : (
        <g>
          <circle cx="29" cy="20" r="5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
          {isToxic ? (
            <ellipse cx="30.5" cy="20" rx="1" ry="3.5" fill="#000000" />
          ) : (
            <g>
              <circle cx="30.5" cy="20" r={isNinja ? 2.5 : 2} fill={bird.eyeColor} />
              <circle cx="31.5" cy="18.8" r="0.8" fill="#ffffff" />
            </g>
          )}
        </g>
      )}

      {/* Beak */}
      <path d="M 36 22 L 44 25 L 34 29 Z" fill={bird.beakColor} stroke="#1e293b" strokeWidth="1.5" />

      {/* Wing */}
      <ellipse cx="20" cy="25" rx="7" ry="5" fill={bird.wingColor} stroke="#1e293b" strokeWidth="1.5" />
      {isCrown && (
        <ellipse cx="20" cy="25" rx="4" ry="2.5" fill="none" stroke="#fbbf24" strokeWidth="1" />
      )}
    </svg>
  );
};
