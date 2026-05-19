import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import LightLeakBG from '../components/LightLeakBG';
import ShaderCircle from '../components/ShaderCircle';
import Signature from '../components/Signature';
import { ABOUT_DATA } from '../components/AboutMe';
import { SOCIAL_LINKS } from '../components/SocialLinks';
import { newsItems } from '../components/News';
import { educations } from '../components/Education';
import { experiences } from '../components/WorkExperience';
import { awards } from '../components/Awards';
import { pressItems } from '../components/Press';
import { publications } from '../components/PublicationMiscList';
import { achievements } from '../components/Achievements';
import { academicService } from '../components/AcademicService';
import '../styles/global.css';

// ─── Theme ───────────────────────────────────────────────────────────────────

const T = {
  bg: '#0c0e16',
  fg: '#f1eee6',
  fgDim: '#bdb5a8',
  fgMute: '#8a8276',
  rule: 'rgba(241,238,230,0.12)',
  serif: '"Newsreader", Georgia, serif',
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, color: T.fg, margin: '0 0 24px', lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

function Row({
  left, title, sub, body, right,
}: { left: string; title: string; sub?: string; body?: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 28, padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
      <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6, letterSpacing: '0.01em' }}>
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

// ─── Page ────────────────────────────────────────────────────────────────────

const IndexPage: React.FC<PageProps> = () => {
  const [newsExpanded, setNewsExpanded] = React.useState(false);
  const visibleNews = newsExpanded ? newsItems : newsItems.slice(0, 4);

  return (
    <div style={{ position: 'relative', color: T.fg, fontFamily: T.serif, minHeight: '100%', fontSize: 15, lineHeight: 1.6, background: T.bg }}>
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

      {/* Full-bleed animated background shader */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <LightLeakBG intensity={0.95} grain={0.18} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 80px)' }}>

        {/* ── Navigation ── */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 0',
          borderBottom: `1px solid ${T.rule}`,
        }}>
          <Signature size={28} color={T.fg} />
          <ul style={{ display: 'flex', gap: 22, listStyle: 'none', margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontSize: 15 }}>
            {['About', 'News', 'Publications', 'Awards', 'Service'].map((x) => (
              <li key={x}>
                <a href={`#${x.toLowerCase()}`} style={{ color: T.fg, textDecoration: 'none', opacity: 0.85 }}>{x}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Fused Hero + About ── */}
        <section id="about" style={{
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gap: 56,
          alignItems: 'start',
          padding: '40px 0 24px',
        }}>
          {/* LEFT */}
          <div>
            <Signature size={60} color={T.fg} />

            <p style={{ fontFamily: T.serif, fontSize: 23, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, color: T.fg, margin: '32px 0 0', letterSpacing: '-0.005em', maxWidth: 600 }}>
              I am a PhD student at{' '}
              <a href={ABOUT_DATA.xrgroupUrl} target="_blank" rel="noreferrer" style={{ color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 4 }}>
                XRGroup
              </a>{' '}
              at the University of Osaka, majoring in Computer Vision, Graphics, Interaction.
            </p>

            <p style={{ color: T.fgDim, fontSize: 15, lineHeight: 1.65, marginTop: 18, maxWidth: 620 }}>
              {ABOUT_DATA.bio}
            </p>

            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
              <div>
                <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>Research Interests</div>
                <p style={{ color: T.fgDim, fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{ABOUT_DATA.interests}</p>
              </div>
              <div>
                <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>E-mail</div>
                {ABOUT_DATA.emails.map((e) => (
                  <p key={e} style={{ marginTop: 6, fontSize: 14, color: T.fg }}>{e}</p>
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
            <div key={n.id} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 28, padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6 }}>{n.date}</div>
              <div>
                <h4 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 400, color: T.fg, margin: 0, lineHeight: 1.3 }}>{n.title}</h4>
                {n.summary && <p style={{ color: T.fgDim, fontSize: 14.5, marginTop: 8, lineHeight: 1.6, maxWidth: 640 }}>{n.summary}</p>}
              </div>
            </div>
          ))}
          {newsItems.length > 4 && (
            <button
              type="button"
              onClick={() => setNewsExpanded((v) => !v)}
              style={{
                marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`,
                color: T.fg, padding: '10px 18px', fontFamily: T.serif, fontStyle: 'italic',
                fontSize: 14, cursor: 'pointer', borderRadius: 999,
              }}
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
            Coming soon — add items in <code style={{ fontFamily: 'monospace', fontSize: 14, opacity: 0.7 }}>src/components/ProjectsTeaser.tsx</code>.
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Education.</SectionHeading>
          {educations.map((e, i) => <Row key={i} left={e.period} title={e.title} sub={e.faculty} body={e.description} />)}
        </section>

        {/* ── Work Experience ── */}
        <section id="work" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Work Experience.</SectionHeading>
          {experiences.map((e, i) => <Row key={i} left={e.period} title={e.title} sub={e.company} body={e.description} />)}
        </section>

        {/* ── Awards ── */}
        <section id="awards" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Awards.</SectionHeading>
          {awards.map((a, i) => <Row key={i} left={a.time} title={a.title} sub={a.givenby} body={a.description} />)}
        </section>

        {/* ── Press & Invited ── */}
        <section id="press" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Press &amp; Invited.</SectionHeading>
          {pressItems.map((p, i) => (
            <Row
              key={i}
              left={p.time}
              title={p.title}
              sub={p.source}
              right={
                <a href={p.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10, fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>
                  Read more ↗
                </a>
              }
            />
          ))}
        </section>

        {/* ── Publications ── */}
        <section id="publications" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Publications.</SectionHeading>
          {publications.map((yg) => (
            <div key={yg.year} style={{ marginTop: 24 }}>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 88, color: T.fg, lineHeight: 1, margin: '20px 0 4px', letterSpacing: '-0.04em', opacity: 0.18 }}>
                {yg.year}
              </div>
              {yg.items.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 160px', gap: 24, padding: '22px 0', borderTop: `1px solid ${T.rule}` }}>
                  <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 500, color: T.fg, margin: '0 0 6px', lineHeight: 1.3 }}>{p.title}</h4>
                    <p style={{ color: T.fgDim, fontSize: 15, margin: '0 0 4px' }}>{p.authors}</p>
                    <p style={{ color: T.fgMute, fontSize: 14, margin: 0, fontStyle: 'italic' }}>
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noreferrer" style={{ color: T.fgMute, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>{p.journal}</a>
                        : p.journal}
                    </p>
                  </div>
                  <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6, textAlign: 'right', lineHeight: 1.5 }}>
                    {p.attributes}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <p style={{ color: T.fgDim, fontSize: 15, marginTop: 28, lineHeight: 1.6, fontFamily: T.serif, fontStyle: 'italic' }}>
            To see all achievement lists (CV) including domestic conferences and other small achievements, please contact me via e-mail or see{' '}
            <a href="https://researchmap.jp/koheimiura" style={{ color: T.fgDim, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>Researchmap</a>{' '}
            for domestic conferences.
          </p>
        </section>

        {/* ── Grants, Fellowship, Scholarship ── */}
        <section id="grants" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Grants, Fellowship, Scholarship.</SectionHeading>
          {achievements.map((a, i) => <Row key={i} left={a.period} title={a.title} sub={a.company} body={a.description} />)}
        </section>

        {/* ── Academic Service & Teaching ── */}
        <section id="service" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>Academic Service &amp; Teaching.</SectionHeading>
          {academicService.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28, padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
              <h4 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 400, color: T.fg, margin: 0, lineHeight: 1.3 }}>
                {s.title}
              </h4>
              <div>
                <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, margin: '0 0 8px', letterSpacing: '0.01em' }}>
                  {s.time}
                </p>
                {s.description && (
                  <p style={{ color: T.fgDim, fontSize: 14.5, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{s.description}</p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ── Footer ── */}
        <div style={{
          marginTop: 120,
          paddingTop: 28,
          borderTop: `1px solid ${T.rule}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 48,
        }}>
          <Signature size={36} color={T.fg} opacity={0.85} />
          <div style={{ color: T.fgMute, fontSize: 14, fontFamily: T.serif, fontStyle: 'italic' }}>
            © Kohei Miura · {new Date().getFullYear()} — last revised May 2026
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Kohei Miura</title>;
