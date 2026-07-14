import React from 'react';

const PaperBG: React.FC = () => (
  <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(135% 105% at 12% -12%, var(--bg2) 0%, transparent 52%), radial-gradient(125% 100% at 96% 112%, var(--bg2) 0%, transparent 52%)',
    }} />
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'var(--grainmix)' as React.CSSProperties['mixBlendMode'],
        opacity: 'calc(var(--grain) * var(--grain-user, 1) * 0.9)' as unknown as number,
      }}
    >
      <filter id="paper-cloud">
        <feTurbulence type="fractalNoise" baseFrequency="0.0055" numOctaves={4} seed={14} stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.44  0 0 0 0 0.41  0 0 0 0 0.35  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-cloud)" />
    </svg>
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'var(--grainmix)' as React.CSSProperties['mixBlendMode'],
        opacity: 'calc(var(--grain) * var(--grain-user, 1) * 0.85)' as unknown as number,
      }}
    >
      <filter id="paper-tooth">
        <feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-tooth)" />
    </svg>
  </div>
);

export default PaperBG;
