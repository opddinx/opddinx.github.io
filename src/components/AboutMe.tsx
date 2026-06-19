import type { BL } from '../types/i18n';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    heroIntro: {
        en: 'I am a Ph.D. student in the XR Group at the University of Osaka, advised by Daisuke Iwai. I work across computer vision, computer graphics, and human-computer interaction to create computational media for creative and experiential systems.',
        ja: '大阪大学大学院基礎工学研究科博士後期課程、XR Group に所属。コンピュータビジョン、グラフィクス、インタラクションを横断し、創作と体験のための計算メディアを研究しています。',
    } satisfies BL,
    bio: {
        en: 'My research explores how computational technologies can expand creative and experiential media. Drawing on computer vision, graphics, and interaction, I design systems that change how people create, perceive, interpret, and communicate experiences. My strength lies in connecting technical research with playful, expressive, and culturally situated forms of experience.',
        ja: '計算技術が、創作と体験のためのメディアをどのように拡張できるかを探究しています。コンピュータビジョン、グラフィクス、インタラクションを基盤に、人が創作し、知覚し、解釈し、コミュニケーションする体験のあり方を変えるシステムを設計しています。私の強みは、技術研究を、遊び・表現・文化の中で意味を持つ体験へと接続することにあります。',
    } satisfies BL,
    interests: {
        en: 'Computer Vision, Computer Graphics, Geometry Processing, Machine Learning, Human-Computer Interaction, Fabrication, Physics Simulation, XR/AR/VR, Cognitive Science',
        ja: 'コンピュータビジョン、グラフィクス、形状処理、機械学習、ヒューマンコンピュータインタラクション、ファブリケーション、物理シミュレーション、XR/AR/VR、認知科学',
    } satisfies BL,
    emails: ['miura.kohei.h75[at]ecs.osaka-u.ac.jp', 'opddinx[at]gmail.com'],
    affiliations: [
        {
            name: {
                en: 'Graduate School of Engineering Science, the University of Osaka',
                ja: '大阪大学大学院基礎工学研究科',
            } satisfies BL,
            url: 'https://www.es.osaka-u.ac.jp/en/',
        },
        {
            name: {
                en: 'Humanware Innovation Program, the University of Osaka',
                ja: '大阪大学ヒューマンウェアイノベーション博士課程プログラム',
            } satisfies BL,
            url: 'https://www.humanware.osaka-u.ac.jp/',
        },
    ],
};
