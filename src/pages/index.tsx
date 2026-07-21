import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import FluidCircle from '../components/FluidCircle';
import Signature from '../components/Signature';
import { PageShell, SectionHeading, Row } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';
import { useTheme } from '../contexts/ThemeContext';
import { t } from '../types/i18n';
import { ABOUT_DATA, SOCIAL_LINKS, newsItems } from '../data/home';
import { ProjectGalleryCard } from '../components/ProjectSummary';
import { projects } from '../data/projects';
import SiteHead from '../components/SiteHead';

const RECENT_PROJECT_COUNT = 3;

const IndexPage: React.FC<PageProps> = () => {
  const { lang } = useLang();
  const { theme } = useTheme();
  const [newsExpanded, setNewsExpanded] = React.useState(false);
  const [projectsExpanded, setProjectsExpanded] = React.useState(false);
  const visibleNews = newsExpanded ? newsItems : newsItems.slice(0, 4);
  const visibleProjects = projectsExpanded ? projects : projects.slice(0, RECENT_PROJECT_COUNT);

  const palette = theme === 'dark' ? 'dark'
    : theme === 'light' ? 'light'
    : (typeof window !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  return (
    <PageShell active="top">
      {/* ── Hero ── */}
      <section id="about" className="l-hero" style={{ padding: '52px 0 28px' }}>
        {/* LEFT */}
        <div>
          <Signature size={52} />

          <p style={{ fontSize: 19, lineHeight: 1.55, color: T.fg, margin: '28px 0 0', maxWidth: '78ch' }}>
            {(() => {
              const [before, after] = t(ABOUT_DATA.heroIntro, lang).split('XR Group');
              return (
                <>
                  {before}
                  <a href={ABOUT_DATA.xrgroupUrl} target="_blank" rel="noreferrer" style={{ color: T.fg, textUnderlineOffset: 4 }}>
                    XR Group
                  </a>
                  {after}
                </>
              );
            })()}
          </p>
          <p style={{ color: T.fgDim, fontSize: 15, lineHeight: 1.7, marginTop: 16, maxWidth: 700 }}>
            {t(ABOUT_DATA.bio, lang)}
          </p>
          <p style={{ color: T.fgDim, fontSize: 15, lineHeight: 1.7, marginTop: 16, maxWidth: 700 }}>
            {t(ABOUT_DATA.born, lang)}
          </p>
        </div>

        {/* RIGHT — fluid circle + socials */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 10 }}>
          <FluidCircle diameter={240} bands={7} speed={1} palette={palette} />
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: T.fg, textDecoration: 'none', borderBottom: `1px solid ${T.rule}`, fontSize: 14, paddingBottom: 2 }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meta grid (Research Interests, Email, Affiliation) ── */}
      <div className="l-meta-grid" style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${T.rule}` }}>
        <div>
          <div style={{ fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
            {lang === 'en' ? 'Research Interests' : '研究キーワード'}
          </div>
          <ul style={{ color: T.fgDim, fontSize: 14, lineHeight: 1.7, marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: '2px 14px' }}>
            {(lang === 'en'
              ? ['Computer Vision', 'Computer Graphics', 'Human-Computer Interaction', 'Geometry Processing', 'XR/AR/VR', 'Fabrication', 'Physics Simulation', 'Machine Learning', 'Cognitive Science']
              : ['コンピュータビジョン', 'グラフィクス', 'ヒューマンコンピュータインタラクション', 'XR/AR/VR', 'ファブリケーション', '物理シミュレーション', '形状処理', '機械学習', '認知科学']
            ).map((item) => (
              <li key={item} style={{ whiteSpace: 'nowrap' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
            {lang === 'en' ? 'E-mail' : 'メール'}
          </div>
          {ABOUT_DATA.emails.map((e, i) => (
            <p key={e} style={{ marginTop: i === 0 ? 8 : 6, fontSize: 14, color: T.fg, wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'nowrap', lineHeight: 1.6 }}>
              {e}
            </p>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 13, color: T.fgMute, letterSpacing: '0.06em' }}>
            {lang === 'en' ? 'Affiliation' : '所属'}
          </div>
          {ABOUT_DATA.affiliations.map((a, i) => {
            const name = t(a.name, lang);
            const parts = lang === 'en' ? name.split(/, the /) : null;
            const nameEl = parts && parts.length === 2
              ? <>{parts[0]},<br /><span style={{ whiteSpace: 'nowrap' }}>the {parts[1]}</span></>
              : name;
            return (
              <p key={typeof a.name === 'string' ? a.name : a.name.en}
                style={{ marginTop: i === 0 ? 8 : 6, fontSize: 14, color: T.fgDim, lineHeight: 1.6, wordBreak: 'keep-all', overflowWrap: 'normal' }}>
                {a.url
                  ? <a href={a.url} style={{ color: T.fgDim, textUnderlineOffset: 3 }}>{nameEl}</a>
                  : nameEl}
              </p>
            );
          })}
        </div>
      </div>

      {/* ── News ── */}
      <section id="news" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{lang === 'en' ? 'News.' : 'ニュース.'}</SectionHeading>
        {visibleNews.map((n) => (
          <Row key={n.id} left={t(n.date, lang)} title={t(n.title, lang)} />
        ))}
        <button
          type="button"
          onClick={() => setNewsExpanded((v) => !v)}
          style={{ marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`, color: T.fg, padding: '10px 18px', fontSize: 14, cursor: 'pointer', borderRadius: 999 }}
        >
          {newsItems.length === 0 ? '…' : newsExpanded
            ? (lang === 'en' ? 'Show fewer' : '折りたたむ')
            : (lang === 'en' ? `Show all (${newsItems.length})` : `全て表示（${newsItems.length}）`)}
        </button>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{lang === 'en' ? 'Projects.' : 'プロジェクト.'}</SectionHeading>
        <div className="l-project-gallery">
          {visibleProjects.map((project) => (
            <ProjectGalleryCard key={t(project.title, 'en')} project={project} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProjectsExpanded((v) => !v)}
          style={{ marginTop: 20, background: 'transparent', border: `1px solid ${T.rule}`, color: T.fg, padding: '10px 18px', fontSize: 14, cursor: 'pointer', borderRadius: 999 }}
        >
          {projects.length === 0 ? '…' : projectsExpanded
            ? (lang === 'en' ? 'Show fewer' : '折りたたむ')
            : (lang === 'en' ? `Show all (${projects.length})` : `全て表示（${projects.length}）`)}
        </button>
      </section>

      <Footer revised="Jul. 2026" />
    </PageShell>
  );
};

export default IndexPage;
export const Head: HeadFC = () => <SiteHead title="Kohei Miura / 三浦康平" pathname="/" />;
