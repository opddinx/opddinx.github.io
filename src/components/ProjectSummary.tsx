import * as React from 'react';
import { Link } from 'gatsby';
import { useLang } from '../contexts/LangContext';
import { T } from '../styles/theme';
import { t, type BL } from '../types/i18n';

export type ProjectMember = {
  name: BL;
  isMe?: boolean;
};

export type ProjectLink = {
  label: BL;
  url: string;
};

export type Project = {
  title: BL;
  summary: BL;
  timeframe: BL;
  venue?: BL;
  members: ProjectMember[];
  teaser: {
    src?: string;
    alt: BL;
  };
  tags: BL[];
  links: ProjectLink[];
};

function ProjectTeaser({ project }: { project: Project }) {
  const { lang } = useLang();

  if (project.teaser.src) {
    return (
      <img
        src={project.teaser.src}
        alt={t(project.teaser.alt, lang)}
        loading="lazy"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={t(project.teaser.alt, lang)}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, rgba(101,145,130,0.2), rgba(123,91,143,0.18) 55%, rgba(224,151,87,0.12))',
        color: T.fgMute,
        fontFamily: T.serif,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      Project teaser
    </div>
  );
}

export default function ProjectSummary({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { lang } = useLang();

  return (
    <article className={`l-project-row${compact ? ' is-compact' : ''}`} style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
      <div className="l-row-date" style={{ fontFamily: T.serif, fontSize: 14, color: T.fgMute }}>
        {t(project.timeframe, lang)}
      </div>

      <div className="l-project-teaser" style={{ overflow: 'hidden', border: `1px solid ${T.rule}`, borderRadius: 3 }}>
        <ProjectTeaser project={project} />
      </div>

      <div>
        <h2 style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.fg, margin: '0 0 8px', lineHeight: 1.3 }}>
          {t(project.title, lang)}
        </h2>

        {project.venue && (
          <p style={{ color: T.fgDim, fontSize: 14, margin: '0 0 4px', lineHeight: 1.5 }}>
            {t(project.venue, lang)}
          </p>
        )}

        {project.members.length > 0 && (
          <p style={{ color: T.fgMute, fontSize: 14, margin: compact ? 0 : '0 0 10px', lineHeight: 1.5 }}>
            {project.members.map((member, index) => (
              <React.Fragment key={t(member.name, 'en')}>
                {index > 0 && ', '}
                <span style={member.isMe ? { textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: T.fgMute } : undefined}>
                  {t(member.name, lang)}
                </span>
              </React.Fragment>
            ))}
          </p>
        )}

        {!compact && (
          <>
            <p style={{ color: T.fgDim, fontSize: 15, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>
              {t(project.summary, lang)}
            </p>

            {project.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {project.tags.map((tag) => (
                  <span key={t(tag, 'en')} style={{ border: `1px solid ${T.rule}`, borderRadius: 999, padding: '2px 10px', fontSize: 13, color: T.fgMute, fontFamily: T.serif }}>
                    {t(tag, lang)}
                  </span>
                ))}
              </div>
            )}

            {project.links.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', marginTop: 14 }}>
                {project.links.map((link) => (
                  <a
                    key={`${t(link.label, 'en')}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontFamily: T.serif, fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}
                  >
                    {t(link.label, lang)} ↗
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export function ProjectGalleryCard({ project }: { project: Project }) {
  const { lang } = useLang();
  const title = t(project.title, lang);

  return (
    <Link
      to="/projects"
      className="c-project-gallery-card"
      aria-label={title}
      style={{
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        border: `1px solid ${T.rule}`,
        borderRadius: 4,
        background: 'rgba(241,238,230,0.035)',
        textDecoration: 'none',
      }}
    >
      <div className="c-project-gallery-frame">
        {project.teaser.src ? (
          <img
            src={project.teaser.src}
            alt={t(project.teaser.alt, lang)}
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block' }}
          />
        ) : (
          <div
            role="img"
            aria-label={t(project.teaser.alt, lang)}
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, rgba(101,145,130,0.2), rgba(123,91,143,0.18) 55%, rgba(224,151,87,0.12))',
              color: T.fgMute,
              fontFamily: T.serif,
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Project teaser
          </div>
        )}
      </div>

      <div className="c-project-gallery-overlay">
        <h3 style={{ color: T.fg, fontFamily: T.serif, fontSize: 16, fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
          {title}
        </h3>
        {project.venue && (
          <p style={{ color: T.fgMute, fontSize: 13, lineHeight: 1.4, marginTop: 6 }}>
            {t(project.venue, lang)}
          </p>
        )}
      </div>
    </Link>
  );
}
