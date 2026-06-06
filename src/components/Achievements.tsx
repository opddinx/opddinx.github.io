import type { BL } from '../types/i18n';

interface Achievement {
    title: BL;
    company: BL;
    period: BL;
    description: BL;
}

export const achievements: Achievement[] = [
    {
        title: {
            en: "\"Walk Guidance in the Real Environment by Blur Modulation using an AR Device,\" Innovative, Educational Research Grant (co-applicant)",
            ja: "ARデバイスを用いたブラー変調による実環境における歩行方向の誘導、独創的教育研究活動経費（共同申請者）",
        },
        company: {
            en: "Institute for Transdisciplinary Graduate Degree Programs, The University of Osaka, Japan",
            ja: "大阪大学学際大学院機構",
        },
        period: "Jul. 2026 - Mar. 2027",
        description: {
            en: "570K JPY.",
            ja: "57万円",
        },
    },
    {
        title: "SPIE Photonics West Student Travel Support",
        company: "SPIE, the international society for optics and photonics",
        period: "Jan. 2026",
        description: "\"Exploring thermal contact potentials for Hand-Object Interaction refinement\" at SPIE Photonics West 2026 (1000 USD).",
    },
    {
        title: {
            en: "\"Unobtrusive Behavioral Guidance in the Real Environment using Subliminal Saliency Modulation,\" Innovative, Educational Research Grant (co-applicant)",
            ja: "実環境におけるサブリミナルなSaliency Modulationを用いた無意識的な行動誘導、独創的教育研究活動経費（共同申請者）",
        },
        company: {
            en: "Institute for Transdisciplinary Graduate Degree Programs, The University of Osaka, Japan",
            ja: "大阪大学学際大学院機構",
        },
        period: "Jul. 2025 - Mar. 2026",
        description: {
            en: "800K JPY.",
            ja: "80万円",
        },
    },
    {
        title: {
            en: "Half Exemption from Return for Particularly Outstanding Achievement",
            ja: "特に優れた業績による返還免除（半額）",
        },
        company: {
            en: "Japan Student Services Organization, Japan",
            ja: "日本学生支援機構",
        },
        period: "May. 2025",
        description: {
            en: "For academic achievement in MSc (About 1M JPY).",
            ja: "修士課程における学業成績に対して授与（約100万円）。",
        },
    },
    {
        title: {
            en: "\"Construction of an Immersive Story Editing Experience using Deep Generative Models and Virtual Reality,\" NEDO Entrepreneurs Program",
            ja: "深層生成モデルと仮想現実感による没入型物語編集体験の構築、NEP開拓コース",
        },
        company: "National Research and Development Agency (NEDO), Japan",
        period: "Apr. 2025 - Mar. 2026",
        description: {
            en: "To implement my R&D project into society by launching a startup (3M JPY).",
            ja: "R&Dプロジェクトを社会実装するためのスタートアップの立ち上げ（300万円）。",
        },
    },
    {
        title: {
            en: "\"Capturing Hand-Object Interaction for Soft Objects and Estimation of Their Deformation Using Neural Representations,\" JST BOOST Program",
            ja: "ニューラル表現を用いた柔らかい物体に対する手作業の計測と変形の推定、大阪大学次世代AI研究者育成プログラム（BOOST）",
        },
        company: {
            en: "Japan Science and Technology Agency (JST) and The University of Osaka, Japan",
            ja: "科学技術振興機構（JST）、大阪大学",
        },
        period: "Apr. 2025 - Mar. 2028 (Expected)",
        description: {
            en: "Support AI related research activities (900K (research) + 3M (living / year) JPY).",
            ja: "AI関連の研究活動を支援（研究費90万円＋生活費300万円/年）。",
        },
    },
    {
        title: {
            en: "\"I2VR: An application that enables us to immerse ourselves in a story and edit,\" AKATSUKI Project: Kansai Tech Creator Challenge",
            ja: "I2VR:物語の中に入り込んで物語を創作するアプリ、AKATSUKIプロジェクト：関西テック・クリエイター・チャレンジ",
        },
        company: {
            en: "Osaka Business Development Agency and Ministry of Economy, Trade and Industry, Japan",
            ja: "大阪産業局、経済産業省",
        },
        period: "Sep. 2024 - Feb. 2025",
        description: {
            en: "This project aims to aid innovative IT creators in Kansai region (550K JPY).",
            ja: "関西地域の革新的なITクリエイターを支援することを目的としたプロジェクト（55万円）。",
        },
    },
    {
        title: {
            en: "DAIKIN Industries Ltd. Student Researcher Fellowship",
            ja: "ダイキン学生研究員プログラム",
        },
        company: {
            en: "DAIKIN Industries Ltd. and The University of Osaka, Japan",
            ja: "ダイキン工業株式会社、大阪大学",
        },
        period: "Jul. 2024 - Mar. 2025",
        description: {
            en: "Offered based on the comprehensive cooperation between Osaka University and DAIKIN (120K JPY/month).",
            ja: "大阪大学とダイキン工業株式会社の包括連携に基づいて提供（12万円/月）。",
        },
    },
    {
        title: {
            en: "Humanware Innovation Program Scholarship",
            ja: "ヒューマンウェアイノベーションプログラム奨学金",
        },
        company: {
            en: "The University of Osaka, Japan",
            ja: "大阪大学",
        },
        period: "Apr. 2023 - Mar. 2025",
        description: "Aid for research activity",
    },
];
