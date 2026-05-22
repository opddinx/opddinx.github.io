import React from 'react';
import { T } from '../styles/theme';

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, color: T.fg, margin: '0 0 24px', lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

export function Row({
  left, title, sub, body, right,
}: { left: string; title: string; sub?: string; body?: string; right?: React.ReactNode }) {
  return (
    <div className="l-row" style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
      <div className="l-row-date" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, letterSpacing: '0.01em' }}>
        {left}
      </div>
      <div>
        <h4 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 400, color: T.fg, margin: '0 0 4px', lineHeight: 1.3 }}>
          {title}
        </h4>
        {sub && <p style={{ color: T.fgMute, fontSize: 15, margin: '0 0 8px', fontStyle: 'italic' }}>{sub}</p>}
        {body && <p style={{ color: T.fgDim, fontSize: 14.5, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{body}</p>}
        {right}
      </div>
    </div>
  );
}
