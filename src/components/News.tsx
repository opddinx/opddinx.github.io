import type { BL } from '../types/i18n';

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
