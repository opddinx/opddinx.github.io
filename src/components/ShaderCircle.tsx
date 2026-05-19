import React, { useEffect, useRef } from 'react';
import LightLeakBG, { LLPalette, DIFFRACTION_PALETTE } from './LightLeakBG';

interface ShaderCircleProps {
  diameter?: number;
  palette?: LLPalette;
  intensity?: number;
  grain?: number;
  rotateDuration?: number;
  vignette?: number;
}

// CSS injected once for the circle hover cascade and spin animation.
// Hover eases scale + vignette with a staggered cubic-bezier so the circle
// "blooms" rather than snapping. Spin accelerates on hover.
if (typeof document !== 'undefined' && !document.getElementById('shader-circle-styles')) {
  const s = document.createElement('style');
  s.id = 'shader-circle-styles';
  s.textContent = `
    .sc-wrap {
      transition:
        transform 680ms cubic-bezier(.22,.9,.3,1) 0ms,
        box-shadow 680ms cubic-bezier(.22,.9,.3,1) 0ms;
      will-change: transform;
    }
    .sc-wrap:hover {
      transform: scale(1.035);
      box-shadow: 0 40px 110px rgba(20,10,40,.34) !important;
    }
    .sc-vignette {
      transition: opacity 680ms cubic-bezier(.22,.9,.3,1) 180ms;
    }
    .sc-wrap:hover .sc-vignette {
      opacity: 0.55 !important;
    }
    @keyframes sc-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .sc-spin {
      transition: animation-duration 680ms;
    }
    .sc-wrap:hover .sc-spin {
      animation-duration: 24s !important;
    }
  `;
  document.head.appendChild(s);
}

const ShaderCircle: React.FC<ShaderCircleProps> = ({
  diameter = 300,
  palette = DIFFRACTION_PALETTE,
  intensity = 1.1,
  grain = 0.22,
  rotateDuration = 70,
  vignette = 0.28,
}) => {
  return (
    <div
      className="sc-wrap"
      style={{
        position: 'relative',
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        overflow: 'hidden',
        isolation: 'isolate',
        flexShrink: 0,
        boxShadow: '0 30px 80px rgba(20,10,40,.25)',
      }}
    >
      {/* Rotating inner shader — oversized 130% so corners stay hidden during spin */}
      <div
        className="sc-spin"
        style={{
          position: 'absolute',
          left: '-15%',
          top: '-15%',
          width: '130%',
          height: '130%',
          animation: `sc-spin ${rotateDuration}s linear infinite`,
        }}
      >
        <LightLeakBG
          palette={palette}
          intensity={intensity}
          grain={grain}
        />
      </div>

      {/* Specular sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(160deg, rgba(255,255,255,.10) 0%, transparent 38%, transparent 62%, rgba(255,255,255,.04) 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="sc-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: vignette,
          background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,1) 100%)',
        }}
      />
    </div>
  );
};

export default ShaderCircle;
