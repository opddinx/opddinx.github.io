import * as React from 'react';
import { Helmet } from 'react-helmet';
import type { HeadFC, PageProps } from 'gatsby';
import ShaderCircle from '../components/ShaderCircle';
import Signature from '../components/Signature';
import { PageShell, SectionHeading, Row } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';
import { t } from '../types/i18n';
import { ABOUT_DATA } from '../components/AboutMe';
import { SOCIAL_LINKS } from '../components/SocialLinks';
import { newsItems } from '../components/News';
import { ProjectGalleryCard } from '../components/ProjectSummary';
import { projects } from './projects';
import '../styles/global.css';

const RECENT_PROJECT_COUNT = 3;

const IndexPage: React.FC<PageProps> = () => {
  const { lang } = useLang();
  const [newsExpanded, setNewsExpanded] = React.useState(false);
  const [projectsExpanded, setProjectsExpanded] = React.useState(false);
  const visibleNews = newsExpanded ? newsItems : newsItems.slice(0, 4);
  const visibleProjects = projectsExpanded ? projects : projects.slice(0, RECENT_PROJECT_COUNT);

  return (
    <PageShell active="top">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://opddinx.github.io/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..700&family=Allura&family=Shippori+Mincho&display=swap" rel="stylesheet" />
        <title>Kohei Miura</title>
        <meta name="description" content="PhD student at XRGroup, Osaka University. Computer Vision, Graphics, Interaction." />
      </Helmet>

      {/* ── Fused Hero + About ── */}
      <section id="about" className="l-hero" style={{ padding: '40px 0 24px' }}>
        {/* LEFT */}
        <div>
          <Signature size={48} color={T.fg} />

          <p style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 400, lineHeight: 1.4, color: T.fg, margin: '32px 0 0', maxWidth: 600 }}>
            {(() => {
              const [before, after] = t(ABOUT_DATA.heroIntro, lang).split('XR Group');
              return <>{before}<a href={ABOUT_DATA.xrgroupUrl} target="_blank" rel="noreferrer" style={{ color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 4 }}>XR Group</a>{after}</>;
            })()}
          </p>

          <p style={{ color: T.fgDim, fontSize: 15, lineHeight: 1.65, marginTop: 18, maxWidth: 620 }}>
            {t(ABOUT_DATA.bio, lang)}
          </p>

          <div className="l-meta-grid" style={{ marginTop: 28 }}>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
                {lang === 'en' ? 'Research Interests' : '研究キーワード'}
              </div>
              <p style={{ color: T.fgDim, fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{t(ABOUT_DATA.interests, lang)}</p>
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
                {lang === 'en' ? 'E-mail' : 'メール'}
              </div>
              {ABOUT_DATA.emails.map((e) => (
                <p key={e} style={{ marginTop: 6, fontSize: 14, color: T.fg, textIndent: 0, paddingLeft: 0 }}>{e}</p>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
                {lang === 'en' ? 'Affiliation' : '所属'}
              </div>
              {ABOUT_DATA.affiliations.map((a) => (
                <p key={typeof a.name === 'string' ? a.name : a.name.en} style={{ marginTop: 6, fontSize: 14, color: T.fgDim, lineHeight: 1.5 }}>
                  {a.url
                    ? <a href={a.url} style={{ color: T.fgDim, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>{t(a.name, lang)}</a>
                    : t(a.name, lang)}
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
                fontSize: 14, paddingBottom: 2, fontFamily: T.serif,
              }}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section id="news" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{lang === 'en' ? 'News.' : 'ニュース.'}</SectionHeading>
        {visibleNews.map((n) => (
          <Row key={n.id} left={t(n.date, lang)} title={t(n.title, lang)} />
        ))}
        {newsItems.length > 4 && (
          <button
            type="button"
            onClick={() => setNewsExpanded((v) => !v)}
            style={{ marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`, color: T.fg, padding: '10px 18px', fontFamily: T.serif, fontSize: 14, cursor: 'pointer', borderRadius: 999 }}
          >
            {newsExpanded
              ? (lang === 'en' ? 'Show fewer' : '折りたたむ')
              : (lang === 'en' ? `Show all (${newsItems.length})` : `全て表示（${newsItems.length}）`)}
          </button>
        )}
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{lang === 'en' ? 'Projects.' : 'プロジェクト.'}</SectionHeading>
        <div className="l-project-gallery">
          {visibleProjects.map((project) => (
            <ProjectGalleryCard key={t(project.title, 'en')} project={project} />
          ))}
        </div>
        {projects.length > RECENT_PROJECT_COUNT && (
          <button
            type="button"
            onClick={() => setProjectsExpanded((v) => !v)}
            style={{ marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`, color: T.fg, padding: '10px 18px', fontFamily: T.serif, fontSize: 14, cursor: 'pointer', borderRadius: 999 }}
          >
            {projectsExpanded
              ? (lang === 'en' ? 'Show fewer' : '折りたたむ')
              : (lang === 'en' ? `Show all (${projects.length})` : `全て表示（${projects.length}）`)}
          </button>
        )}
      </section>

      <Footer revised="May 2026" />
    </PageShell>
  );
};

export default IndexPage;
export const Head: HeadFC = () => <title>Kohei Miura</title>;
