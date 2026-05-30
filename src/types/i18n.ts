export type Lang = 'en' | 'ja';

// BL = BiLingual: a plain string stays English-only; an object provides both.
// Existing data files can keep plain strings and add Japanese later by
// changing  "text"  →  { en: "text", ja: "テキスト" }  — no other edits needed.
export type BL = string | { en: string; ja: string };

export const t = (v: BL, lang: Lang): string =>
  typeof v === 'string' ? v : (v[lang] ?? v.en);
