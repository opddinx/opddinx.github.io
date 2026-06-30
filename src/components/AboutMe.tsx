import type { BL } from '../types/i18n';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    heroIntro: {
        en: 'I am a Ph.D. student in the XR Group at the University of Osaka, advised by Daisuke Iwai. I work across computer vision, computer graphics, and human-computer interaction to create computational media for creative and experiential systems.',
        ja: '大阪大学大学院基礎工学研究科博士後期課程、XR Group に所属。コンピュータビジョン、グラフィクス、インタラクションを横断し、創作と体験のための計算メディアを研究しています。',
    } satisfies BL,
    bio: {
        en: 'My research explores expressive phenomenal media: computational media that turn physical phenomena, perceptual effects, and embodied interactions into materials for expression and experience. Grounded in computer vision, graphics, and interaction, I design systems that expand how people create, perceive, interpret, and communicate experiences. My central interest is not only in what technologies can do, but in how they can be used to shape playful, expressive, and culturally situated forms of media.',
        ja: '物理現象、知覚効果、身体的相互作用を、表現と体験の素材として捉える計算メディアを研究しています。コンピュータビジョン、グラフィクス、インタラクションを基盤に、人が創作し、知覚し、解釈し、コミュニケーションする体験のあり方を拡張するシステムを設計しています。私の中心的な関心は、技術に何ができるかだけでなく、それをどのように使えば、遊び・表現・文化の中で意味を持つメディアを形づくれるかにあります。',
    } satisfies BL,
    interests: {
        en: 'Computer Vision, Computer Graphics, Human-Computer Interaction, Geometry Processing, XR/AR/VR, Fabrication, Physics Simulation, Machine Learning, Cognitive Science',
        ja: 'コンピュータビジョン、グラフィクス、ヒューマンコンピュータインタラクション、XR/AR/VR、ファブリケーション、物理シミュレーション、形状処理、機械学習、認知科学',
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
