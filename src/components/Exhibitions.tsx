import type { BL } from '../types/i18n';

interface Exhibition {
  period: BL;
  title: BL;
  venue?: BL;
  description?: BL;
  link?: string;
}

export const exhibitions: Exhibition[] = [
  {
    period: 'Jul. 2025',
    title: {
      en: 'I2S: An App for Interactive Story Editing with Immersive Experience',
      ja: 'I2S: 物語を没入体験しながら対話的に編集するアプリ',
    },
    venue: {
      en: 'Digital School Festival Award S×PARK, Expo 2025 Osaka, Japan',
      ja: 'デジタル学園祭アワード S×PARK, 2025年日本国際博覧会（大阪）',
    },
    description: {
      en: 'Exhibited the immersive story editing system developed with the support of the Kansai Tech Creator Challenge 2024 as part of a limited-time event during Expo 2025.',
      ja: '2024年度関西テック・クリエイター・チャレンジの助成を得て開発した没入型物語編集システムをEXPO 2025の開催期間中の期間限定イベントの一部として展示。',
    },
    link: 'https://www.spark-awards.com/',
  },
  {
    period: 'Jun. 2025 –',
    title: {
      en: 'A Switch Robot "Pocchan" Permanent Exhibition',
      ja: 'スイッチロボット「ぽっちゃん」常設展示',
    },
    venue: {
      en: 'Miraikan – National Museum of Emerging Science and Innovation, Tokyo, Japan',
      ja: '日本科学未来館（東京）',
    },
    description: {
      en: 'Developed thermography-based physical switch interaction system for a robotic display exhibit, now part of the permanent "Hello! Robot" exhibition.',
      ja: 'サーモグラフィーと物理スイッチを用いたインタラクションシステムを開発。常設展「ハロー！ロボット」の一部として展示中。',
    },
    link: 'https://www.miraikan.jst.go.jp/news/press/202506124090.html',
  },
];
