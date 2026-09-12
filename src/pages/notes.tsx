import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { PageShell, SectionHeading, Row } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import SiteHead from '../components/SiteHead';
import { T } from '../styles/theme';
import { useLang } from '../contexts/LangContext';
import { t } from '../types/i18n';
import { notes, type NoteKind } from '../data/notes';

const KIND_LABELS: Record<NoteKind, { en: string; ja: string }> = {
  essay: { en: 'Essay', ja: 'エッセイ' },
  making: { en: 'Making', ja: '制作ノート' },
  'research-note': { en: 'Research note', ja: '研究ノート' },
};

const NotesPage: React.FC<PageProps> = () => {
  const { lang } = useLang();

  return (
    <PageShell active="notes">
      <section style={{ marginTop: 72, marginBottom: 24 }}>
        <SectionHeading>{lang === 'en' ? 'Notes.' : 'ノート.'}</SectionHeading>
        <p style={{ color: T.fgMute, fontSize: 15, margin: '-12px 0 40px', lineHeight: 1.6, maxWidth: 680 }}>
          {lang === 'en'
            ? 'Essays, making logs, and research notes published across external platforms.'
            : '外部プラットフォームに公開したエッセイ、制作記録、研究ノートの索引。'}
        </p>

        {notes.map((item) => (
          <Row
            key={item.id}
            left={t(item.date, lang)}
            title={t(item.title, lang)}
            sub={`${KIND_LABELS[item.kind][lang]} · ${item.source}`}
            body={item.summary ? t(item.summary, lang) : undefined}
            right={(
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  fontFamily: T.serif,
                  fontSize: 14,
                  color: T.fg,
                  textDecorationColor: T.rule,
                  textUnderlineOffset: 3,
                }}
              >
                {lang === 'en' ? 'Open' : '読む'} ↗
              </a>
            )}
          />
        ))}
      </section>

      <Footer />
    </PageShell>
  );
};

export default NotesPage;
export const Head: HeadFC = () => (
  <SiteHead
    title="Notes — Kohei Miura"
    pathname="/notes"
    noIndex={notes.length === 0}
  />
);
