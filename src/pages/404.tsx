import * as React from 'react';
import { Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { PageShell } from '../components/PortfolioLayout';
import { T } from '../styles/theme';
import SiteHead from '../components/SiteHead';

const NotFoundPage: React.FC<PageProps> = () => (
  <PageShell active="top">
    <div style={{ marginTop: 120, fontFamily: T.serif }}>
      <h1 style={{ fontSize: 32, fontWeight: 400, color: T.fg, margin: '0 0 24px' }}>Page not found.</h1>
      <p style={{ color: T.fgDim, fontSize: 16, lineHeight: 1.6 }}>
        Sorry, we couldn't find what you were looking for.{' '}
        <Link to="/" style={{ color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>Go home →</Link>
      </p>
    </div>
  </PageShell>
);

export default NotFoundPage;
export const Head: HeadFC = () => <SiteHead title="Not found — Kohei Miura" noIndex />;
