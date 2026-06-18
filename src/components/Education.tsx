import type { BL } from '../types/i18n';

interface Education {
    title: BL;
    faculty: BL;
    period: BL;
    description: BL;
}

export const educations: Education[] = [
    {
        title: {
                en: "Ph.D. Student in Engineering",
                ja: '博士後期課程（工学）',
        },
        faculty: {
                en: "Department of Systems Innovation Science, Graduate School of Engineering Science, the University of Osaka (Osaka, Japan)",
                ja: '大阪大学大学院基礎工学研究科システム創成専攻',
        },
        period: "Apr. 2025 - Mar. 2028 (Expected)",
        description:{
            en: "Pursuing research on 3D data processing technology for manual work, aiming to contribute to the field of computer vision and its applications in human-computer interaction.",
            ja: '手作業のための3Dデータ処理技術に関する研究を継続し、コンピュータビジョンとHuman-Computer Interactionの分野への貢献を目指しています。',
        },
    },
    {
        title: {
            en: "Master's Degree in Engineering",
            ja: '修士（工学）',
        },
        faculty: {
            en: "Department of Systems Innovation Science, Graduate School of Engineering Science, the University of Osaka (Osaka, Japan)",
            ja: '大阪大学大学院基礎工学研究科システム創成専攻',
        },
        period: "Apr. 2023 - Mar. 2025",
        description:{
            en: "Deepen the research and development of 3D data processing technology for manual work. I also study Liberal Arts in the art field as Graduate Programs for Advanced Interdisciplinary Studies",
            ja: '手作業のための3Dデータ処理技術の研究開発を深めつつ、大学院高度副プログラムにて芸術領域のリベラルアーツも学びました。',
        },
    },
    {
        title: "Italian Design Summer School, Non-degree program",
        faculty: "Department of Industrial Engineering, University of Bologna (Bologna, Italy)",
        period: "Aug. 2024 - Sep. 2024",
        description: "I learned the history of Italian art, design and the design process of products, practicing the design method and tools.",
    },
    {
        title: {
            en: "Bachelor's Degree in Engineering",
            ja: '学士（工学）',
        },
        faculty: {
            en: "Department of Systems Science, School of Engineering Science, the University of Osaka (Osaka, Japan)",
            ja: '大阪大学基礎工学部システム科学科',
        },
        period: "Apr. 2019 - Mar. 2023",
        description: {
            en: "In my third year of undergraduate studies, I conducted an independent research on Human-Agent Interaction under the guidance of Guest Associate Professor Takahashi and in my fourth year of undergraduate studies, I did research on 3D data processing technology for manual work by applying computer vision.",
            ja: '学部3年次に高橋特任准教授の指導のもと、Human-Agent Interactionに関する自主研究を行い、学部4年次にはコンピュータビジョンを応用した手作業のための3Dデータ処理技術に関する研究を行いました。',
        },
    },
];

