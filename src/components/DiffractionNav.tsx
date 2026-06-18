import React from 'react';
import { Link } from 'gatsby';
import Signature from './Signature';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';

export type NavPage = 'top' | 'about' | 'projects' | 'playgrounds';

const LINKS: { label: string; to: string; page: NavPage }[] = [
  { label: 'Top',         to: '/',            page: 'top'         },
  { label: 'About',       to: '/about',       page: 'about'       },
  { label: 'Projects',    to: '/projects',    page: 'projects'    },
  { label: 'Playgrounds', to: '/playgrounds', page: 'playgrounds' },
];

const DiffractionNav: React.FC<{ active: NavPage }> = ({ active }) => {
  const { lang, setLang } = useLang();

  return (
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <ul className="l-nav-links" style={{ listStyle: 'none', margin: 0, fontFamily: T.serif, fontSize: 15 }}>
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

        <div style={{ display: 'flex', gap: 6, fontFamily: T.serif, fontSize: 13 }}>
          {(['en', 'ja'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: 'none',
                border: 'none',
                color: T.fg,
                fontFamily: T.serif,
                fontSize: 13,
                cursor: lang === l ? 'default' : 'pointer',
                opacity: lang === l ? 1 : 0.38,
                borderBottom: lang === l ? `1px solid ${T.rule}` : 'none',
                padding: '0 0 1px',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DiffractionNav;
