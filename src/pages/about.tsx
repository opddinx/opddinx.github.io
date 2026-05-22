import * as React from 'react';
import { Helmet } from 'react-helmet';
import type { HeadFC, PageProps } from 'gatsby';
import LightLeakBG from '../components/LightLeakBG';
import DiffractionNav from '../components/DiffractionNav';
import Signature from '../components/Signature';
import { SectionHeading, Row } from '../components/PortfolioLayout';
import { T } from '../styles/theme';
import { educations } from '../components/Education';
import { experiences } from '../components/WorkExperience';
import { awards } from '../components/Awards';
import { pressItems } from '../components/Press';
import { publications } from '../components/PublicationList';
import { achievements } from '../components/Achievements';
import { academicService } from '../components/AcademicService';
import '../styles/global.css';

const AboutPage: React.FC<PageProps> = () => (
  <div style={{ position: 'relative', color: T.fg, fontFamily: T.serif, minHeight: '100%', fontSize: 15, lineHeight: 1.6, background: T.bg }}>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="canonical" href="https://opddinx.github.io/about" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&family=Allura&display=swap" rel="stylesheet" />
      <title>About — Kohei Miura</title>
    </Helmet>

    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <LightLeakBG intensity={0.95} grain={0.18} />
    </div>

    <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 80px)' }}>
      <DiffractionNav active="about" />

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
            <div className="l-pub-year" style={{ fontFamily: T.serif, fontStyle: 'italic', fontWeight: 300, color: T.fg, lineHeight: 1, margin: '20px 0 4px', letterSpacing: '-0.04em', opacity: 0.18 }}>
              {yg.year}
            </div>
            {yg.items.map((p, i) => (
              <div key={i} className="l-pub-row" style={{ padding: '22px 0', borderTop: `1px solid ${T.rule}` }}>
                <div className="l-pub-index" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6 }}>
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
                <div className="l-pub-attrs" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute, paddingTop: 6, textAlign: 'right', lineHeight: 1.5 }}>
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

      {/* ── Grants ── */}
      <section id="grants" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>Grants, Fellowship, Scholarship.</SectionHeading>
        {achievements.map((a, i) => <Row key={i} left={a.period} title={a.title} sub={a.company} body={a.description} />)}
      </section>

      {/* ── Academic Service ── */}
      <section id="service" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>Academic Service &amp; Teaching.</SectionHeading>
        {academicService.map((s, i) => (
          <div key={i} className="l-service-row" style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
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
      <div style={{ marginTop: 120, paddingTop: 28, borderTop: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
        <Signature size={36} color={T.fg} opacity={0.85} />
        <div style={{ color: T.fgMute, fontSize: 14, fontFamily: T.serif, fontStyle: 'italic' }}>
          © Kohei Miura · {new Date().getFullYear()} — last revised May 2026
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
export const Head: HeadFC = () => <title>About — Kohei Miura</title>;
