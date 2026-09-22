import type { BL } from '../types/i18n';

export type NoteKind = 'essay' | 'making' | 'research-note';

export type NoteItem = {
  id: string;
  title: BL;
  summary?: BL;
  date: BL;
  kind: NoteKind;
  source: string;
  url: string;
};

// External writing / making index.
// Keep the source content on its original platform and add only lightweight
// metadata here so this site remains the stable index of Kohei's activity.
export const notes: NoteItem[] = [
  {
    id: '2026-09-22-essay-not-to-turn-into-a-photograph',
    title: {
      en: 'Not to turn into a photograph',
      ja: '写真にしない',
    },
    summary: {
      en: 'An essay on the distance between photographs and experiences, and the media nature of photographs.',
      ja: '写真と体験の距離、写真のメディア性に関するエッセイ。',
    },
    date: {
      en: 'Sep. 22, 2026',
      ja: '2026年9月22日',
    },
    kind: 'essay',
    source: 'note',
    url: 'https://note.com/opddinx/n/nde61d649770a?sub_rt=share_pw',
  }
];
