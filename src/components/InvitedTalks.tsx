import type { BL } from '../types/i18n';

interface InvitedTalk {
  time: BL;
  title: BL;
  venue?: BL;
  description?: BL;
}

export const invitedTalks: InvitedTalk[] = [];
