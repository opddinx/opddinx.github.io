import React, { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'fluid-circle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        bands?: number;
        speed?: number;
        palette?: 'light' | 'dark';
      }, HTMLElement>;
    }
  }
}

let scriptLoaded = false;

function loadFluidCircleScript() {
  if (scriptLoaded || document.getElementById('fluid-circle-script')) {
    scriptLoaded = true;
    return;
  }
  const s = document.createElement('script');
  s.id = 'fluid-circle-script';
  s.src = '/fluid-circle.js';
  document.head.appendChild(s);
  scriptLoaded = true;
}

interface FluidCircleProps {
  diameter?: number;
  bands?: number;
  speed?: number;
  palette?: 'light' | 'dark';
}

const FluidCircle: React.FC<FluidCircleProps> = ({
  diameter = 240,
  bands = 7,
  speed = 1,
  palette = 'light',
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    loadFluidCircleScript();
  }, []);

  useEffect(() => {
    const el = ref.current as any;
    if (!el) return;
    el.bands = bands;
    el.speed = speed;
    el.palette = palette;
  }, [bands, speed, palette]);

  return (
    <div
      style={{
        position: 'relative',
        width: `min(${diameter}px, 72vw)`,
        aspectRatio: '1',
        borderRadius: '50%',
        overflow: 'hidden',
        isolation: 'isolate',
        flexShrink: 0,
        boxShadow: '0 24px 60px rgba(15, 25, 60, 0.24)',
        background: palette === 'dark'
          ? 'radial-gradient(circle at 42% 38%, #fce0a0 0 12%, #f19f7c 12% 26%, #ba6397 26% 42%, #834fa3 42% 60%, #1e1d4c 60% 78%, #12141f 78%)'
          : 'radial-gradient(circle at 42% 38%, #f8e9c9 0 12%, #f2ab6b 12% 26%, #d96e42 26% 42%, #99492e 42% 60%, #52301f 60% 78%, #241d18 78%)',
      }}
      title="Stir me — hover or drag"
    >
      <fluid-circle
        ref={ref as any}
        bands={bands}
        speed={speed}
        palette={palette}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default FluidCircle;
