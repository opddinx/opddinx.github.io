import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import ShaderCircle from '../components/ShaderCircle';
import Signature from '../components/Signature';
import { PageShell, SectionHeading, Row } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import { T } from '../styles/theme';
import { ABOUT_DATA } from '../components/AboutMe';
import { SOCIAL_LINKS } from '../components/SocialLinks';
import { newsItems } from '../components/News';
import '../styles/global.css';

const IndexPage: React.FC<PageProps> = () => {
  const [newsExpanded, setNewsExpanded] = React.useState(false);
  const visibleNews = newsExpanded ? newsItems : newsItems.slice(0, 4);

  return (
    <PageShell active="top">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://opddinx.github.io/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&family=Allura&display=swap" rel="stylesheet" />
        <title>Kohei Miura</title>
        <meta name="description" content="PhD student at XRGroup, Osaka University. Computer Vision, Graphics, Interaction." />
      </Helmet>

      {/* ── Fused Hero + About ── */}
      <section id="about" className="l-hero" style={{ padding: '40px 0 24px' }}>
        {/* LEFT */}
        <div>
          <Signature size={48} color={T.fg} />

          <p style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, color: T.fg, margin: '32px 0 0', letterSpacing: '-0.005em', maxWidth: 600 }}>
            I am a PhD student at{' '}
            <a href={ABOUT_DATA.xrgroupUrl} target="_blank" rel="noreferrer" style={{ color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 4 }}>
              XRGroup
            </a>{' '}
            at the University of Osaka, majoring in Computer Vision, Graphics, Interaction.
          </p>

          <p style={{ color: T.fgDim, fontSize: 15, lineHeight: 1.65, marginTop: 18, maxWidth: 620 }}>
            {ABOUT_DATA.bio}
          </p>

          <div className="l-meta-grid" style={{ marginTop: 28 }}>
            <div>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>Research Interests</div>
              <p style={{ color: T.fgDim, fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{ABOUT_DATA.interests}</p>
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>E-mail</div>
              {ABOUT_DATA.emails.map((e) => (
                <p key={e} style={{ marginTop: 6, fontSize: 14, color: T.fg, textIndent: 0, paddingLeft: 0 }}>{e}</p>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>Affiliation</div>
              {ABOUT_DATA.affiliations.map((a) => (
                <p key={a.name} style={{ marginTop: 6, fontSize: 14, color: T.fgDim, lineHeight: 1.5 }}>
                  {a.url
                    ? <a href={a.url} style={{ color: T.fgDim, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>{a.name}</a>
                    : a.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — rotating diffraction circle + socials */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, paddingTop: 12 }}>
          <ShaderCircle diameter={300} intensity={1.1} grain={0.22} rotateDuration={70} />
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
                color: T.fg, textDecoration: 'none', borderBottom: `1px solid ${T.rule}`,
                fontSize: 14, paddingBottom: 2, fontFamily: T.serif, fontStyle: 'italic',
              }}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section id="news" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>News.</SectionHeading>
        {visibleNews.map((n) => (
          <Row key={n.id} left={n.date} title={n.title} body={n.summary} />
        ))}
        {newsItems.length > 4 && (
          <button
            type="button"
            onClick={() => setNewsExpanded((v) => !v)}
            style={{ marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`, color: T.fg, padding: '10px 18px', fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, cursor: 'pointer', borderRadius: 999 }}
          >
            {newsExpanded ? 'Show fewer' : `Show all (${newsItems.length})`}
          </button>
        )}
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ marginTop: 72, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <SectionHeading>Projects.</SectionHeading>
          <Link to="/projects" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, textDecoration: 'none', borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
            View all ↗
          </Link>
        </div>
        <div style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}`, color: T.fgMute, fontFamily: T.serif, fontStyle: 'italic', fontSize: 15 }}>
          Coming soon — add entries in <code style={{ fontFamily: 'monospace', fontSize: 14, opacity: 0.7 }}>src/components/ProjectsTeaser.tsx</code>.
        </div>
      </section>

      <Footer revised="May 2026" />
    </PageShell>
  );
};

export default IndexPage;
export const Head: HeadFC = () => <title>Kohei Miura</title>;
