import React from 'react';
import { Link } from 'gatsby';
import Signature from './Signature';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';
import { useTheme } from '../contexts/ThemeContext';

export type NavPage = 'top' | 'about' | 'projects' | 'playgrounds';

const LINKS: { label: string; to: string; page: NavPage }[] = [
  { label: 'Top',         to: '/',            page: 'top'         },
  { label: 'About',       to: '/about',       page: 'about'       },
  { label: 'Projects',    to: '/projects',    page: 'projects'    },
  { label: 'Playgrounds', to: '/playgrounds', page: 'playgrounds' },
];

const DiffractionNav: React.FC<{ active: NavPage }> = ({ active }) => {
  const { lang, setLang } = useLang();
  const { toggleTheme } = useTheme();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '22px 0',
      borderBottom: `1px solid ${T.rule}`,
    }}>
      <Link to="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
        <Signature size={28} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <ul className="l-nav-links" style={{ listStyle: 'none', margin: 0, fontSize: 15 }}>
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

        <div style={{ display: 'flex', gap: 8, fontSize: 13, alignItems: 'center' }}>
          {(['en', 'ja'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: 'none',
                border: 'none',
                color: T.fg,
                fontSize: 13,
                cursor: 'pointer',
                padding: '0 0 1px',
                opacity: lang === l ? 1 : 0.38,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark / light"
          title="Toggle dark / light"
          style={{
            background: 'none',
            border: `1px solid ${T.rule}`,
            borderRadius: 999,
            width: 30,
            height: 30,
            color: T.fg,
            cursor: 'pointer',
            fontSize: 15,
            lineHeight: 1,
            display: 'grid',
            placeItems: 'center',
            padding: 0,
          }}
        >
          ◐
        </button>
      </div>
    </nav>
  );
};

export default DiffractionNav;
