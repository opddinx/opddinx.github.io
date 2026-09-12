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
export const notes: NoteItem[] = [];
