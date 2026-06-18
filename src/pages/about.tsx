import * as React from 'react';
import { Helmet } from 'react-helmet';
import type { HeadFC, PageProps } from 'gatsby';
import { PageShell, SectionHeading, Row } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';
import { t } from '../types/i18n';
import { educations } from '../components/Education';
import { experiences } from '../components/WorkExperience';
import { awards } from '../components/Awards';
import { publications } from '../components/PublicationList';
import { achievements } from '../components/Achievements';
import { academicService } from '../components/AcademicService';
import { exhibitions } from '../components/Exhibitions';
import { invitedTalks } from '../components/InvitedTalks';
import { mediaItems } from '../components/Media';
import '../styles/global.css';

const HEADINGS = {
  education:    { en: 'Education.',                       ja: '学歴.' },
  work:         { en: 'Work Experience.',                 ja: '職歴.' },
  awards:       { en: 'Awards.',                          ja: '受賞.' },
  invited:      { en: 'Invited.',                         ja: '招待.' },
  publications: { en: 'Publications.',                    ja: '業績.' },
  grants:       { en: 'Grants, Fellowship, Scholarship.', ja: '助成金・奨学金.' },
  service:      { en: 'Academic Service & Teaching.',     ja: '学術活動・教育.' },
  exhibitions:  { en: 'Exhibitions.',                     ja: '展示.' },
  media:        { en: 'Media.',                           ja: 'メディア.' },
};

function AuthorLine({ authors }: { authors: string }) {
  const NAME = 'Kohei Miura';
  const idx = authors.indexOf(NAME);
  if (idx === -1) return <>{authors}</>;
  return (
    <>
      {authors.slice(0, idx)}
      <span style={{ textDecoration: 'underline', textDecorationColor: T.fgDim, textUnderlineOffset: 3 }}>{NAME}</span>
      {authors.slice(idx + NAME.length)}
    </>
  );
}

const AboutPage: React.FC<PageProps> = () => {
  const { lang } = useLang();

  return (
    <PageShell active="about">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://opddinx.github.io/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..700&family=Allura&family=Shippori+Mincho&display=swap" rel="stylesheet" />
        <title>About — Kohei Miura</title>
      </Helmet>

      {/* ── Education ── */}
      <section id="education" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.education, lang)}</SectionHeading>
        {educations.map((e, i) => (
          <Row key={i} left={t(e.period, lang)} title={t(e.title, lang)} sub={t(e.faculty, lang)} body={t(e.description, lang)} />
        ))}
      </section>

      {/* ── Work Experience ── */}
      <section id="work" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.work, lang)}</SectionHeading>
        {experiences.map((e, i) => (
          <Row key={i} left={t(e.period, lang)} title={t(e.title, lang)} sub={t(e.company, lang)} body={t(e.description, lang)} />
        ))}
      </section>

      {/* ── Awards ── */}
      <section id="awards" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.awards, lang)}</SectionHeading>
        {awards.map((a, i) => (
          <Row
            key={i}
            left={t(a.time, lang)}
            title={t(a.title, lang)}
            sub={t(a.givenby, lang)}
            body={t(a.description, lang)}
            right={a.url ? (
              <a href={a.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10, fontFamily: T.serif, fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>
                {lang === 'en' ? 'Award page' : '受賞ページ'} ↗
              </a>
            ) : undefined}
          />
        ))}
      </section>

      {/* ── Invited (hidden when empty) ── */}
      {invitedTalks.length > 0 && (
        <section id="invited" style={{ marginTop: 72, marginBottom: 24 }}>
          <SectionHeading>{t(HEADINGS.invited, lang)}</SectionHeading>
          {invitedTalks.map((s, i) => (
            <Row key={i} left={t(s.time, lang)} title={t(s.title, lang)} sub={s.venue ? t(s.venue, lang) : undefined} body={s.description ? t(s.description, lang) : undefined} />
          ))}
        </section>
      )}

      {/* ── Publications ── */}
      <section id="publications" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.publications, lang)}</SectionHeading>
        {publications.map((yg) => (
          <div key={yg.year} style={{ marginTop: 24 }}>
            <div className="l-pub-year" style={{ fontFamily: T.serif, fontWeight: 300, color: T.fg, lineHeight: 1, margin: '20px 0 4px', letterSpacing: '-0.04em', opacity: 0.18 }}>
              {yg.year}
            </div>
            {yg.items.map((p, i) => (
              <div key={i} className="l-pub-row" style={{ padding: '22px 0', borderTop: `1px solid ${T.rule}` }}>
                <div className="l-pub-index" style={{ fontFamily: T.serif, fontSize: 14, color: T.fgMute, paddingTop: 6 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 500, color: T.fg, margin: '0 0 6px', lineHeight: 1.3 }}>{t(p.title, lang)}</h4>
                  <p style={{ color: T.fgDim, fontSize: 15, margin: '0 0 4px' }}>
                    <AuthorLine authors={t(p.authors, lang)} />
                  </p>
                  <p style={{ color: T.fgMute, fontSize: 14, margin: 0 }}>
                    {p.url
                      ? <a href={p.url} target="_blank" rel="noreferrer" style={{ color: T.fgMute, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>{t(p.journal, lang)}</a>
                      : t(p.journal, lang)}
                  </p>
                </div>
                <div className="l-pub-attrs" style={{ fontFamily: T.serif, fontSize: 14, color: T.fgMute, paddingTop: 6, textAlign: 'right', lineHeight: 1.5 }}>
                  {t(p.attributes, lang)}
                </div>
              </div>
            ))}
          </div>
        ))}
        <p style={{ color: T.fgDim, fontSize: 15, marginTop: 28, lineHeight: 1.6, fontFamily: T.serif }}>
          {lang === 'en' ? (
            <>To see all achievement lists (CV) including domestic conferences and other small achievements, please contact me via e-mail or see <a href="https://researchmap.jp/koheimiura" style={{ color: T.fgDim, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>Researchmap</a> for domestic conferences.</>
          ) : (
            <>国内学会発表等を含む全業績リスト（CV）については、メールにてご連絡いただくか、国内学会については <a href="https://researchmap.jp/koheimiura" style={{ color: T.fgDim, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>Researchmap</a> をご覧ください。</>
          )}
        </p>
      </section>

      {/* ── Grants ── */}
      <section id="grants" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.grants, lang)}</SectionHeading>
        {achievements.map((a, i) => (
          <Row key={i} left={t(a.period, lang)} title={t(a.title, lang)} sub={t(a.company, lang)} body={t(a.description, lang)} />
        ))}
      </section>

      {/* ── Academic Service ── */}
      <section id="service" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.service, lang)}</SectionHeading>
        {academicService.map((s, i) => (
          <div key={i} className="l-service-row" style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
            <h4 style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.fg, margin: 0, lineHeight: 1.3 }}>
              {t(s.title, lang)}
            </h4>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: 13, color: T.fgMute, margin: '0 0 8px', letterSpacing: '0.05em' }}>
                {t(s.time, lang)}
              </p>
              {s.description && (
                <p style={{ color: T.fgDim, fontSize: 15, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{t(s.description, lang)}</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ── Exhibitions ── */}
      <section id="exhibitions" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.exhibitions, lang)}</SectionHeading>
        {exhibitions.map((e, i) => (
          <Row
            key={i}
            left={t(e.period, lang)}
            title={t(e.title, lang)}
            sub={e.venue ? t(e.venue, lang) : undefined}
            body={e.description ? t(e.description, lang) : undefined}
            right={e.link ? (
              <a href={e.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10, fontFamily: T.serif, fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>
                {lang === 'en' ? 'View ↗' : '詳細 ↗'}
              </a>
            ) : undefined}
          />
        ))}
      </section>

      {/* ── Media ── */}
      <section id="media" style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{t(HEADINGS.media, lang)}</SectionHeading>
        {mediaItems.length === 0 ? (
          <div style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}`, color: T.fgMute, fontFamily: T.serif, fontSize: 15 }}>
            {lang === 'en' ? 'No media entries yet.' : 'メディア掲載はまだありません。'}
          </div>
        ) : (
          mediaItems.map((m, i) => (
            <Row
              key={i}
              left={t(m.time, lang)}
              title={t(m.title, lang)}
              sub={m.source ? t(m.source, lang) : undefined}
              body={m.description ? t(m.description, lang) : undefined}
              right={m.link ? (
                <a href={m.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10, fontFamily: T.serif, fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>
                  {lang === 'en' ? 'Read more ↗' : '続きを読む ↗'}
                </a>
              ) : undefined}
            />
          ))
        )}
      </section>

      <Footer revised="May 2026" />
    </PageShell>
  );
};

export default AboutPage;
export const Head: HeadFC = () => <title>About — Kohei Miura</title>;
