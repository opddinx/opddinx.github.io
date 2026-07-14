import type { BL } from '../types/i18n';

interface AcademicServiceItem {
    title: BL;
    time: BL;
    description: BL;
}

export const academicService: AcademicServiceItem[] = [
    {
        title: "Student Volunteer",
        time: "IEEE AIXVR 2026",
        description: "",
    },
    {
        title: "Reviewer",
        time: "IEEE VR workshop (VR-HSA 2026), ACM DIS 2026",
        description: "",
    },
    {
        title: "Student Assistant & Teaching Assistant",
        time: "Nov. 2023 - Mar. 2025",
        description: "Mainly work as a facilitator for SEEDs Program",
    },
    {
        title: "Teaching Assistant",
        time: "Apr. 2023 - Feb. 2024, Apr. 2025 - Aug. 2025",
        description: "Introductory Programming, Intelligent Systems Seminar",
    },
];

export interface Achievement {
    id: string;
    title: BL;
    company: BL;
    period: BL;
    description: BL;
}

export const achievements: Achievement[] = [
    {
        id: "blur-walk-guidance-grant-2026",
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
        id: "spie-travel-thermal-2026",
        title: "SPIE Photonics West Student Travel Support",
        company: "SPIE, the international society for optics and photonics",
        period: "Jan. 2026",
        description: "\"Exploring thermal contact potentials for Hand-Object Interaction refinement\" at SPIE Photonics West 2026 (1000 USD).",
    },
    {
        id: "subliminal-saliency-grant-2025",
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
        id: "jasso-exemption-2025",
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
        id: "nedo-nep-i2s-2025",
        title: {
            en: "\"Construction of an Immersive Story Editing Experience using Deep Generative Models and Virtual Reality,\" NEDO Entrepreneurs Program",
            ja: "深層生成モデルと仮想現実感による没入型物語編集体験の構築、NEP開拓コース",
        },
        company: "National Research and Development Agency (NEDO), Japan",
        period: "Apr. 2025 - Mar. 2026",
        description: {
            en: "To implement my R&D project into society by launching a startup (3M JPY).",
            ja: "R&Dプロジェクトを社会実装するためのスタートアップの立ち上げ補助（300万円）。",
        },
    },
    {
        id: "jst-boost-soft-hoi-2025",
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
        id: "akatsuki-i2vr-2024",
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
        id: "daikin-fellowship-2024",
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
        id: "humanware-scholarship-2023",
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
    {
        id: "independent-research",
        title: {
            en: "\"Inducing Intentional Interpretation through Shared Experiences with Plush Toys,\" Independent Research Encouragement Project by Undergraduate Students",
            ja: "\"ぬいぐるみとの共有体験演出による志向的解釈の誘出\"、学部学生による自主研究奨励事業",
        },
        company: {
            en: "The University of Osaka, Japan",
            ja: "大阪大学",
        },
        period: "Jul. 2021 - Mar. 2022",
        description: {
            en: "Research fund to encourage independent research by undergraduate students (100K JPY) .",
            ja: "学部生の自主研究を奨励するための研究費（10万円）",
        }
    },
];

interface Award {
    title: BL;
    givenby: BL;
    time: BL;
    description: BL;
    url?: string;
}

export const awards: Award[] = [
    {
        title: {
                en: "Outstanding Student Award in the Division of System Science and Applied Informatics (Magna cum laude)",
                ja: 'システム科学領域賞（次席）',
        },
        givenby: {
                en: "Graduate School of Engineering Science, the University of Osaka",
                ja: '大阪大学大学院基礎工学研究科',
        },
        time: "Mar. 2025",
        description: {
                en: "Awarded for the outstanding achievements in academic performance and research activities during the Master's program",
                ja: '修士課程における学業成績と研究活動において優れた成果を収めたため授与',
        },
    },
    {
        title: "Best Student Demo in Show Award (1/18)",
        givenby: "The 17th ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia (SIGGRAPH Asia 2024)",
        time: "Dec. 2024",
        description: "Awarded for the students' demonstration of the research titled 'Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands' as co-author",
        url: "https://asia.siggraph.org/2024/ja/for-the-press/press-releases/siggraph-asia-2024-award-winners/"
    },
    {
        title: {
                en: "Student Presentation Award (Domestic Conference)",
                ja: '学生発表賞',
        },
        givenby: {
                en: "The 67th Conference of the Institute of Systems, Control and Information Engineers",
                ja: '第67回システム制御情報学会（SCI\'23）',
        },
        time: "May 2023",
        description: {
                en: "Awarded for the students' presentation of the research titled '3D Reconstruction of Hand Work Using Multiple RGB-D Cameras and Thermal Cameras'",
                ja: '研究発表「複数のRGB-Dカメラと熱カメラを用いた手作業の三次元復元」に対して授与',
        },
        url: "https://sci23.iscie.or.jp/award/"
    },
];

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

interface InvitedTalk {
  time: BL;
  title: BL;
  venue?: BL;
  description?: BL;
}

export const invitedTalks: InvitedTalk[] = [];

interface MediaItem {
  time: BL;
  title: BL;
  source?: BL;
  description?: BL;
  link?: string;
}

export const mediaItems: MediaItem[] = [
  {
    time: 'Sep. 2023',
    title: {
      en: "Shaping Dreams with AI! What Future Do University Students and Children Envision Together?",
      ja: 'AIで夢を形に！大学生と子どもたちが共に思い描く、未来の姿とは',
    },
    source: {
      en: 'Panasonic Souzo Note (Only in Japanese)',
      ja: 'パナソニック＿ソウゾウノート',
    },
    link: 'https://youth-note.jpn.panasonic.com/n/nf401262f9c61',
  },
];

export interface Publication {
    id: string;
    title: BL;
    authors: BL;
    journal: BL;
    attributes: BL;
    url?: string;
}

interface YearGroup {
    year: number;
    items: Publication[];
}

export const publications: YearGroup[] = [
    {
        year: 2026,
        items: [
            {
                id: "multi-projector-calibration-cvpr2026",
                title: "Breaking the Scalability Limit of Multi-projector Calibration with Embedded Cameras",
                authors: "Takumi Kawano, Kohei Miura, Daisuke Iwai",
                journal: "The IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2026",
                attributes: "Main (Oral, 141/16092 < 1.0%), Peer-reviewed",
                url: "https://openaccess.thecvf.com/content/CVPR2026/html/Kawano_Breaking_the_Scalability_Limit_of_Multi-Projector_Calibration_with_Embedded_Cameras_CVPR_2026_paper.html",
            },
            {
                id: "blur-filter-ahs2026",
                title: "Preliminary Study on a Real-time CSF-based Blur Filter for Unobtrusively Saliency-modulated Augmented Reality",
                authors: "Kohei Miura, Seiya Mori, Hiroki Kusuyama, Masaki Takeuchi, Yoshihiro Yokoyama, Yuto Fukui, and Takashi Amesaka",
                journal: "Augmented Humans 2026 (AHs '26)",
                attributes: "Poster (82/116 = 71%), Peer-reviewed",
                url: "https://doi.org/10.1145/3795011.3797359",
            },
            {
                id: "walking-guidance-blur-ahs2026",
                title: "A Pilot Study for Walking Direction Guidance using Subtle Blur Effects",
                authors: "Yoshihiro Yokoyama*, Stephan Kingsbery*, Masaki Takeuchi, Hiroki Kusuyama, Yuto Fukui, Kohei Miura, Seiya Mori, and Takashi Amesaka",
                journal: "Augmented Humans 2026 (AHs '26)",
                attributes: "Poster (82/116 = 71%), Peer-reviewed",
                url: "https://doi.org/10.1145/3795011.3797379",
            },
            {
                id: "thermal-hoi-spie2026",
                title: "Exploring thermal contact potentials for Hand-Object Interaction refinement",
                authors: "Kohei Miura and Daisuke Iwai",
                journal: "SPIE Photonics West (Optical Architectures for Displays and Sensing in Augmented, Virtual, and Mixed Reality (AR, VR, MR) VII)",
                attributes: "Oral Presentation, Peer-reviewed",
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13821/1382109/Exploring-thermal-contact-potentials-for-handobject-interaction-refinement/10.1117/12.3078027.short",
            },
            {
                id: "gloss-perception-spie2026",
                title: "Effects of view-dependent highlights and specular intensity on gloss perception in projection mapping",
                authors: "Masaki Takeuchi, Kohei Miura, Daisuke Iwai",
                journal: "SPIE Photonics West (Optical Architectures for Displays and Sensing in Augmented, Virtual, and Mixed Reality (AR, VR, MR) VII)",
                attributes: "Oral Presentation, Peer-reviewed",
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13821/1382107/Effects-of-view-dependent-highlights-and-specular-intensity-on-gloss/10.1117/12.3078780.short",
            },
        ],
    },
    {
        year: 2024,
        items: [
            {
                id: "soft-object-contact-siggraph-asia2024",
                title: "3D Reconstruction of a Soft Object Surface and Contact Areas in Hand-Object Interactions",
                authors: "Kohei Miura, Daisuke Iwai, Kosuke Sato",
                journal: "SIGGRAPH Asia 2024 Posters",
                attributes: "Poster, Peer-reviewed",
                url: "https://dl.acm.org/doi/full/10.1145/3681756.3697895",
            },
            {
                id: "casper-dpm-siggraph-asia2024",
                title: "Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands",
                authors: "Yotam Erel, Or Kozlovsky-Mordenfeld, Hiroki Kusuyama, Kohei Miura, Daisuke Iwai, Kosuke Sato, Amit H. Bermano",
                journal: "SIGGRAPH Asia 2024 Emerging Technologies",
                attributes: "Emerging Technologies (Demonstration), Peer-reviewed",
                url: "https://dl.acm.org/doi/full/10.1145/3681755.3688952",
            },
            {
                id: "intellicid-uist2024",
                title: "IntelliCID: Intelligent Caustics Illumination Device",
                authors: "Shun Hanai* and Kohei Miura*",
                journal: "Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST '24 Adjunct)",
                attributes: "Student Innovation Contest (Demonstration), Peer-reviewed",
                url: "https://dl.acm.org/doi/abs/10.1145/3672539.3686733",
            },
            {
                id: "remake-player-experience-cog2024",
                title: "Factors of player experience in describing the relationship between remade and original works",
                authors: "Takumi Yokosaka, Kohei Miura, Yuko Isogaya, Tomoko Ohtani, Kazushi Maruya",
                journal: "Proceedings of the IEEE 6th Conference on Games (IEEE CoG 2024)",
                attributes: "Short Paper, Peer-reviewed",
                url: "https://ieeexplore.ieee.org/abstract/document/10645618",
            },
        ],
    },
];

interface Experience {
    title: BL;
    company: BL;
    period: BL;
    description: BL;
}

export const experiences: Experience[] = [
    {
        title: {
            en: "R&D Internship Student",
            ja: "R&Dインターン",
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
            ja: "研究インターン",
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
            ja: "R&Dインターン",
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
