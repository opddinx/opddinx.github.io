import * as React from 'react';

const SITE_URL = 'https://opddinx.github.io';
const DEFAULT_DESCRIPTION =
  'PhD student at XRGroup, UOsaka. Computer Vision, Graphics, Interaction.';
const GOOGLE_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Allura&family=Noto+Sans+JP:wght@400;500;700&display=swap';

const antiFlashScript = `(function(){try{var t=localStorage.getItem('km-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export interface SiteHeadProps {
  title: string;
  pathname?: string;
  description?: string;
  noIndex?: boolean;
}

export default function SiteHead({
  title,
  pathname,
  description = DEFAULT_DESCRIPTION,
  noIndex = false,
}: SiteHeadProps) {
  const canonical = pathname
    ? pathname === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}/${pathname.replace(/^\/+|\/+$/g, '')}`
    : undefined;

  return (
    <>
      <script id="theme-init" dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link
        rel="preload"
        href="/fonts/LinBiolinum_R.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={GOOGLE_FONT_URL} />
    </>
  );
}
