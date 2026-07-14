import React from 'react';
import { T } from '../styles/theme';
import Signature from './Signature';

const Footer: React.FC<{ revised?: string }> = ({ revised }) => (
  <div style={{ marginTop: 120, paddingTop: 28, borderTop: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
    <Signature size={36} opacity={0.85} />
    <div style={{ color: T.fgMute, fontSize: 14 }}>
      © Kohei Miura · {new Date().getFullYear()}{revised && ` — last revised ${revised}`}
    </div>
  </div>
);

export default Footer;
