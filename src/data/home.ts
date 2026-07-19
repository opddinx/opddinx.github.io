import type { BL } from '../types/i18n';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    heroIntro: {
        en: 'Ph.D. student of the XR Group at the University of Osaka, advised by Daisuke Iwai, working across computer vision, computer graphics, and human-computer interaction to create computational media for creative and experiential systems.',
        ja: '大阪大学大学院基礎工学研究科博士後期課程、XR Group に所属。コンピュータビジョン、グラフィクス、インタラクションを横断し、創作と体験のための計算メディアを研究。',
    } satisfies BL,
    born: {
        en: 'Born in Maibara, Shiga Pref., Japan, in 2000.',
        ja: '2000年滋賀県米原市生まれ。',
    },
    bio: {
        en: 'His research explores computational media that turn physical phenomena, perceptual effects, and embodied interactions into materials for expression and experience. Grounded in computer vision, graphics, and interaction, he designs systems that expand how people create, perceive, interpret, and communicate experiences. His central interest is not only in what technologies can do, but in how they can be used to shape playful, expressive, and culturally situated forms of media.',
        ja: '物理現象、知覚効果、身体的相互作用を、表現と体験の素材として捉える計算メディアの研究者。コンピュータビジョン、グラフィクス、インタラクションを基盤に、人が創作し、知覚し、解釈し、コミュニケーションする体験のあり方を拡張するシステムの設計を行う。特に、技術に何ができるかだけでなく、それをどのように使えば、遊び・表現・文化の中で意味を持つメディアを形づくれるかという点から探求している。',
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

export const SOCIAL_LINKS = [
  { url: 'https://github.com/opddinx', label: 'GitHub' },
  { url: 'https://linkedin.com/in/kohei-miura-opddinx', label: 'LinkedIn' },
];

type NewsItem = {
    id: string;
    title: BL;
    date: BL;
};

export const newsItems: NewsItem[] = [
    {
        id: 'cvpr2026-accepted',
        title: {
            en: 'My co-authored paper was accepted to CVPR 2026, see you in Denver!',
            ja: '共著論文がCVPR 2026に採択',
        },
        date: 'Mar. 2026',
    },
    {
        id: 'ahs2026',
        title: {
            en: 'My first-authored and co-authored poster presentations were accepted to Augmented Humans 2026, see you in Okinawa!',
            ja: '第一著者・共著のポスター発表がAugmented Humans 2026に採択',
        },
        date: 'Mar. 2026',
    },
    {
        id: 'pw2026',
        title: {
            en: 'Presented a first-authored and co-authored oral presentation at SPIE Photonics West AR | VR | MR 2026',
            ja: 'SPIE Photonics West AR | VR | MR 2026にて第一著者・共著の口頭発表',
        },
        date: 'Jan. 2026',
    },
    {
        id: 'miru2025',
        title: {
            en: 'Presented first-authored poster at MIRU 2025',
            ja: 'MIRU 2025にて第一著者ポスター発表',
        },
        date: 'Jul. 2025',
    },
    {
        id: 'pocchan',
        title: {
            en: '"Pocchan" starts to be exhibited at Miraikan',
            ja: '「ぽっちゃん」が日本科学未来館で展示開始',
        },
        date: 'Jun. 2025',
    },
    {
        id: 'nepfr',
        title: {
            en: 'Adopted for a FR of the NEDO Entrepreneurs Program',
            ja: 'NEDO Entrepreneurs Program 開拓コースに採択',
        },
        date: 'Apr. 2025',
    },
    {
        id: 'joinxr',
        title: {
            en: 'Joined XRGroup at Osaka University as a PhD Student',
            ja: '大阪大学XRGroupに博士課程学生として参加',
        },
        date: 'Apr. 2025',
    },
    {
        id: 'siggraphasia2024',
        title: {
            en: 'First-authored poster and co-authored E-tech presentation at SIGGRAPH Asia 2024.',
            ja: 'SIGGRAPH Asia 2024にてポスター（第一著者）とデモ（共著）を発表しました',
        },
        date: 'Dec. 2024',
    },
];
