import React from 'react';
import { T } from '../styles/theme';
import LightLeakBG from './LightLeakBG';
import DiffractionNav, { NavPage } from './DiffractionNav';

export function PageShell({ active, children }: { active: NavPage; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', color: T.fg, fontFamily: T.serif, minHeight: '100%', fontSize: 15, lineHeight: 1.6, background: T.bg }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <LightLeakBG intensity={0.95} grain={0.18} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 80px)' }}>
        <DiffractionNav active={active} />
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.fg, margin: '0 0 24px', lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

export function Row({
  left, title, sub, body, right,
}: { left: string; title: string; sub?: string; body?: string; right?: React.ReactNode }) {
  return (
    <div className="l-row" style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
      <div className="l-row-date" style={{ fontFamily: T.serif, fontSize: 13, color: T.fgMute, letterSpacing: '0.05em' }}>
        {left}
      </div>
      <div>
        <h4 style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.fg, margin: '0 0 4px', lineHeight: 1.3 }}>
          {title}
        </h4>
        {sub && <p style={{ color: T.fgMute, fontSize: 15, margin: '0 0 8px' }}>{sub}</p>}
        {body && <p style={{ color: T.fgDim, fontSize: 15, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{body}</p>}
        {right}
      </div>
    </div>
  );
}
