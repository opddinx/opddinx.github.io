import type { BL } from '../types/i18n';

interface MediaItem {
  time: BL;
  title: BL;
  source?: BL;
  description?: BL;
  link?: string;
}

export const mediaItems: MediaItem[] = [
  {
    time: 'Sep. 2023',
    title: {
      en: "Shaping Dreams with AI! What Future Do University Students and Children Envision Together?",
      ja: 'AIで夢を形に！大学生と子どもたちが共に思い描く、未来の姿とは',
    },
    source: {
      en: 'Panasonic Souzo Note (Only in Japanese)',
      ja: 'パナソニック＿ソウゾウノート',
    },
    link: 'https://youth-note.jpn.panasonic.com/n/nf401262f9c61',
  },
];
