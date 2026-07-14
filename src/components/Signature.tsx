import React from 'react';

interface SignatureProps {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

const Signature: React.FC<SignatureProps> = ({
  size = 64,
  color = 'var(--fg)',
  opacity = 1,
  style,
}) => (
  <span
    style={{
      fontFamily: '"Allura", cursive',
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color,
      opacity,
      display: 'inline-block',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    Kohei Miura
  </span>
);

export default Signature;
