import type { BL } from '../types/i18n';

interface Experience {
    title: BL;
    company: BL;
    period: BL;
    description: BL;
}

export const experiences: Experience[] = [
    {
        title: {
            en: "Research Internship Student",
            ja: "学生研究インターン",
        },
        company: {
            en: "Huawei Technologies Japan K.K.",
            ja: "華為技術日本株式会社",
        },
        period: "Apr. 2026 - Pre.",
        description: "Computer Graphics, Human-Computer Interaction.",
    },
    {
        title: {
            en: "Research Internship Student",
            ja: "学生研究インターン",
        },
        company: {
            en: "Nippon Telegraph and Telephone Corporation (NTT R&D)",
            ja: "日本電信電話株式会社",
        },
        period: "Feb. 2024 - Mar. 2024 (3 weeks)",
        description: "Data Science, Cognitive Science, Human-Computer Interaction.",
    },
    {
        title: {
            en: "R&D Internship Student",
            ja: "学生研究インターン",
        },
        company: {
            en: "Sony Corporation",
            ja: "ソニー株式会社",
        },
        period: "Feb. 2024 (3weeks)",
        description: "3D Computer Vision and Radiance Fields",
    },
    {
        title: {
            en: "Research Assistant",
            ja: "リサーチ・アシスタント"
        },
        company: {
            en: "Kyoto Research, Sony Computer Science Laboratories, Inc. (Kyoto, Japan)",
            ja: "ソニーコンピュータサイエンス研究所京都（京都、日本）"
        },
        period: "Jan. 2023 - Mar. 2026",
        description: {
            en: "I was working on a project called AnyLight (PI: Yuichiro Takeuchi), which reproduces illumination effects. I also edit some videos for public relations.",
            ja: "AnyLightと呼ばれる照明効果を再現するプロジェクト（竹内雄一郎研究員）の研究補助および広報用の動画編集を担当。",
        },
    },
];

