import React from 'react';
import { Link } from 'gatsby';
import Signature from './Signature';
import { T } from '../styles/theme';

export type NavPage = 'top' | 'about' | 'playgrounds';

const LINKS: { label: string; to: string; page: NavPage }[] = [
  { label: 'Top',         to: '/',            page: 'top'         },
  { label: 'About',       to: '/about',       page: 'about'       },
  { label: 'Playgrounds', to: '/playgrounds', page: 'playgrounds' },
];

const DiffractionNav: React.FC<{ active: NavPage }> = ({ active }) => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 0',
    borderBottom: `1px solid ${T.rule}`,
  }}>
    <Link to="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
      <Signature size={28} color={T.fg} />
    </Link>
    <ul className="l-nav-links" style={{ listStyle: 'none', margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontSize: 15 }}>
      {LINKS.map(({ label, to, page }) => (
        <li key={page}>
          <Link
            to={to}
            style={{
              color: T.fg,
              textDecoration: 'none',
              opacity: active === page ? 1 : 0.62,
              borderBottom: active === page ? `1px solid ${T.rule}` : 'none',
            }}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default DiffractionNav;
