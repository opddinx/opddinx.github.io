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
