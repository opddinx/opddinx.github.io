import * as React from "react";
import { Helmet } from "react-helmet";
import type { HeadFC, PageProps } from "gatsby";
import { PageShell, SectionHeading } from "../components/PortfolioLayout";
import ProjectSummary, { type Project } from "../components/ProjectSummary";
import Footer from "../components/Footer";
import { useLang } from "../contexts/LangContext";
import { T } from "../styles/theme";
import { t } from "../types/i18n";
import "../styles/global.css";

export const projects: Project[] = [
    {
        id: "multi-projector-calibration",
        title: {
            ja: "埋め込みカメラを用いたマルチプロジェクタ較正におけるスケーラビリティ限界の打破",
            en: "Breaking the Scalability Limit of Multi-Projector Calibration with Embedded Cameras",
        },
        summary: {
            ja: "プロジェクタに埋め込んだカメラを用いて、プロジェクタの数に依存しない較正手法を提案。",
            en: "Proposed a calibration method that does not depend on the number of projectors by using cameras embedded in the projectors.",
        },
        timeframe: "Jul. 2026",
        venue: {
            en: "CVPR 2026 (Denver, USA)",
            ja: "CVPR 2026（米国・デンバー）",
        },
        members: [
            { name: "Takumi Kawano", isMe: false },
            { name: "Kohei Miura", isMe: true },
            { name: "Daisuke Iwai", isMe: false },
        ],
        teaser: {
            src: "/teasers/202606cvpr.jpg",
            alt: "Teaser for Multi-projector calibration project",
        },
        tags: ["Multi-view systems", "Display", "Computer Vision", "CVPR"],
        links: [
            { label: "Project page", url: "https://www.xr.sys.es.osaka-u.ac.jp/projects/26-06-06-kawano-cvpr/" },
        ],
        related: {
            publications: ["multi-projector-calibration-cvpr2026"],
        },
    },
    {
        id: "unobtrusive-blur-guidance",
        title: {
            en: "Unobtrusive Human Guidance with Artificial Blur Effects",
            ja: "目立ちにくい人工ブラー効果を用いた人の誘導",
        },
        summary: {
            en: "We explores the potential of artificial blur effects for unobtrusive human guidance in augmented reality by psychophysics-based blur design and walking guidance prototype.",
            ja: "心理物理学に基づくブラー設計と歩行誘導プロトタイプによって、拡張現実における目立ちにくい人の誘導のための人工ブラー効果の可能性を探る。",
        },
        timeframe: "Jun. 2025 - ",
        venue: {
            en: "AH's 26 (Okinawa, Japan)",
            ja: "AH's 26（沖縄）",
        },
        members: [
            { name: "Hiroki Kusuyama", isMe: false },
            { name: "Kohei Miura", isMe: true },
            { name: "Yoshihiro Yokoyama", isMe: false },
            { name: "Yuto Fukui", isMe: false },
            { name: "Masaki Takeuchi", isMe: false },
            { name: "Stephan Kingsbery (collaborator)", isMe: false },
            { name: "Takashi Amesaka", isMe: false },
        ],
        teaser: {
            src: "/teasers/202603blur.jpg",
            alt: "Teaser for artificial blur effects for human guidance project",
        },
        tags: ["Augmented Reality", "Modulation", "AH's"],
        links: [],
        related: {
            publications: ["blur-filter-ahs2026", "walking-guidance-blur-ahs2026"],
            grants: ["subliminal-saliency-grant-2025", "blur-walk-guidance-grant-2026"],
        },
    },
    {
        id: "thermal-hoi-refinement",
        title: {
            en: "Exploring thermal contact potentials for hand-object refinement",
            ja: "手作業補正のための熱接触ポテンシャルの探索",
        },
        summary: {
            en: "We explore the potential of thermal information for hand-object interaction refinement using post-contact thermal images.",
            ja: "接触後に見える熱画像を用いて、復元した手作業データ補正のための熱情報の可能性を探る。",
        },
        timeframe: "Oct. 2022 - ",
        venue: {
            en: "SIGGRAPH Asia 2024 (Tokyo, Japan), SPIE Photonics West AR | VR | MR 2026 (San Francisco, USA)",
            ja: "SIGGRAPH Asia 2024 （東京）, SPIE Photonics West AR | VR | MR 2026（サンフランシスコ、米国）",
        },
        members: [
            { name: "Kohei Miura", isMe: true },
            { name: "Daisuke Iwai", isMe: false },
            { name: "Kosuke Sato", isMe: false },
        ],
        teaser: {
            src: "/teasers/202601thermal.jpg",
            alt: "Teaser for thermal HOI project",
        },
        tags: ["Multi-view systems", "Capture", "Computer Vision", "SIGGRAPH Asia", "SPIE Photonics West"],
        links: [],
        related: {
            publications: ["soft-object-contact-siggraph-asia2024", "thermal-hoi-spie2026"],
            grants: ["jst-boost-soft-hoi-2025", "spie-travel-thermal-2026"],
        },
    },
    {
        id: "i2s",
        title: {
            en: "I2S: An App for Interactive Story Editing with Immersive Experience",
            ja: "I2S: 物語を没入体験しながら対話的に編集するアプリ",
        },
        summary: {
            en: "An immersive story editing system developed with the support of the Kansai Tech Creator Challenge 2024, exhibited as part of a limited-time event during Expo 2025.",
            ja: "2024年度関西テック・クリエイター・チャレンジの助成を得て開発した没入型物語編集システムをEXPO 2025の開催期間中の期間限定イベントの一部として展示。",
        },
        timeframe: "Jul. 2024 - ",
        venue: {
            en: "Kansai Tech Creator Challenge 2024, Expo 2025 (Osaka, Japan)",
            ja: "関西テック・クリエイター・チャレンジ 2024,大阪・関西万博",
        },
        members: [
            { name: "Kohei Miura", isMe: true },
        ],
        teaser: {
            src: "/teasers/202507expo.png",
            alt: "Teaser for I2S interactive story editing project",
        },
        tags: ["Virtual Reality", "Display", "Expo 2025"],
        links: [
            { label: "Award page", url: "https://www.spark-awards.com/" },
        ],
        related: {
            grants: ["akatsuki-i2vr-2024", "nedo-nep-i2s-2025"],
        },
    },
    {
        id: "pocchan",
        title: {
            en: "A Switch Robot \"Pocchan\"",
            ja: "スイッチロボット「ぽっちゃん」",
        },
        summary: {
            en: "A system to understand robots that operate on mechanisms different from humans.",
            ja: "人間と異なる仕組みで動くロボットとわかりあうためのシステムを構築。",
        },
        timeframe: "Jun. 2025 –",
        venue: {
            en: "Miraikan, Tokyo, Japan",
            ja: "日本科学未来館（東京）",
        },
        members: [
            { name: "Hideyuki Takahashi", isMe: false },
            { name: "Chie Hieida", isMe: false },
            { name: "Mayu Omichi", isMe: false },
            { name: "Kohei Miura", isMe: true },
            { name: "Takuya Maekawa", isMe: false },
            { name: "Shunsuke Aoki", isMe: false },
        ],
        teaser: {
            src: "/teasers/202507pocchan.jpg",
            alt: "Teaser for the Pocchan permanent exhibition",
        },
        tags: ["Human-Agent Interaction", "Computer Vision"],
        links: [
            { label: "Press Release", url: "https://www.miraikan.jst.go.jp/news/press/202506124090.html" },
        ],
    },
    {
        id: "intellicid",
        title: {
            ja: "IntelliCID: コースティクス照明と生活空間の調和",
            en: "IntelliCID: Harmonizing Caustic Lighting with Living Spaces",
        },
        summary: {
            ja: "透明物体の屈折により生まれる有機的なパターンであるコースティクスを日常照明化するために人感センサと組み合わせたシステムを提案。",
            en: "Proposed a system that combines a motion sensor to realize daily lighting using caustics, which are organic patterns created by the refraction of transparent objects.",
        },
        timeframe: "Jul. 2024 - Jan. 2025",
        venue: {
            en: "ACM UIST 2024 (Pittsburgh, USA), Sensing Solution Hackation 2024",
            ja: "ACM UIST 2024（米国・ピッツバーグ）、Sensing Solution ハッカソン 2024",
        },
        members: [
            { name: "Kohei Miura", isMe: true },
            { name: "Shun Hanai", isMe: false },
        ],
        teaser: {
            src: "/teasers/202410uist.jpg",
            alt: "Teaser for IntelliCID project",
        },
        tags: ["Display", "HCI", "UIST"],
        links: [
            { label: "Hackathon Page", url: "https://sensing-solution-hackathon.sonyged.com/2024_report" },
        ],
        related: {
            publications: ["intellicid-uist2024"],
        },
    },
    {
        id: "remake-player-experience",
        title: {
            ja: "ゲームのオリジナル-リメイク作品の関係を記述する体験要素の分析",
            en: "Factors of player experience in describing the relationship between remade and original works",
        },
        summary: {
            ja: "ゲームのオリジナル作品とリメイク作品の関係を、プレイヤーがどのような体験要素で記述するかを分析。作品の一貫性を体験要素で記述できる可能性を示した。NTT研究所でのインターン中の成果。",
            en: "Analyzed how players describe the relationship between original and remade games in terms of experiential factors. Showed the possibility of describing the consistency of works with experiential factors. This work was done during an internship at NTT laboratories.",
        },
        timeframe: "Feb. 2024",
        venue: {
            en: "IEEE CoG 2024 (Milan, Italy)",
            ja: "IEEE CoG 2024（イタリア・ミラノ）",
        },
        members: [
            { name: "Takumi Yokosaka", isMe: false },
            { name: "Kohei Miura", isMe: true },
            { name: "Yuko Isogaya", isMe: false },
            { name: "Tomoko Ohtani", isMe: false },
            { name: "Kazushi Maruya", isMe: false },
        ],
        teaser: {
            src: "/teasers/202406cog.jpg",
            alt: "Teaser for IEEECoG2024 project",
        },
        tags: ["HCI", "Interpretation"],
        links: [],
        related: {
            publications: ["remake-player-experience-cog2024"],
        },
    },
    {
        id: "hai-shared-experience",
        title: {
            ja: "人-エージェント共有体験と相補的関係の設計と評価",
            en: "Design and Evaluation of Shared Experience and Complementary Relationship between Humans and Agents",
        },
        summary: {
            ja: "人とエージェントとの共有体験を実ぬいぐるみとの腹筋と、的当てVRゲームの二種類設計し、設計と人に与える印象を調査。",
            en: "Designed two types of shared experience between humans and agents: one with a stuffed animal and the other with a target-shooting VR game, and investigated their design and impressions on people.",
        },
        timeframe: "Apr. 2021 - Mar. 2022",
        venue: {
            en: "HAI Symposium 2022 (Nagoya, Japan)",
            ja: "HAIシンポジウム2022（名古屋）",
        },
        members: [
            { name: "Rino Hashikawa", isMe: false },
            { name: "Kohei Miura", isMe: true },
            { name: "Yohei Yanase", isMe: false },
            { name: "Kazutoshi Tanaka", isMe: false },
            { name: "Hideyuki Takahashi", isMe: false },
        ],
        teaser: {
            src: "/teasers/202203nui.jpg",
            alt: "Teaser for HAI shared experience project",
        },
        tags: ["Human-Agent Interaction", "Virtual Reality", "Interpretation"],
        links: [
            { label: "Proceeding1 (in Japanese), first author", url: "https://hai-conference.net/proceedings/HAI2022/html/paper/paper-P-34.html" },
            { label: "Proceeding2 (in Japanese), second author", url: "https://hai-conference.net/proceedings/HAI2022/html/paper/paper-G-18.html" },
        ],
    },
];

const ProjectsPage: React.FC<PageProps> = () => {
    const { lang } = useLang();
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
    const tags = React.useMemo(
        () => Array.from(
            new Map(
                projects.flatMap((project) => project.tags).map((tag) => [t(tag, "en"), tag])
            ).values()
        ),
        []
    );
    const filteredProjects = selectedTag
        ? projects.filter((project) => project.tags.some((tag) => t(tag, "en") === selectedTag))
        : projects;
    const tagCount = (tagName: string) =>
        projects.filter((project) => project.tags.some((tag) => t(tag, "en") === tagName)).length;

    return (
        <PageShell active="projects">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..700&family=Allura&family=Shippori+Mincho&display=swap" rel="stylesheet" />
            </Helmet>

            <section style={{ marginTop: 72, marginBottom: 24 }}>
                <SectionHeading>{lang === "en" ? "Projects." : "プロジェクト."}</SectionHeading>
                <p style={{ color: T.fgMute, fontSize: 15, margin: '-12px 0 40px', lineHeight: 1.6 }}>
                    {lang === "en"
                        ? "Selected systems, prototypes, and tools."
                        : "これまでに取り組んだシステム、プロトタイプ、ツール。"}
                </p>

                {tags.length > 0 && (
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ color: T.fgMute, fontFamily: T.serif, fontSize: 13, letterSpacing: "0.05em", marginBottom: 10 }}>
                            {lang === "en" ? "Filter by tag" : "タグで絞り込む"}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <button
                                type="button"
                                aria-pressed={selectedTag === null}
                                onClick={() => setSelectedTag(null)}
                                style={{
                                    border: `1px solid ${selectedTag === null ? T.fgMute : T.rule}`,
                                    borderRadius: 999,
                                    padding: "5px 12px",
                                    background: selectedTag === null ? "rgba(241,238,230,0.1)" : "transparent",
                                    color: selectedTag === null ? T.fg : T.fgMute,
                                    fontFamily: T.serif,
                                    fontSize: 13,
                                    cursor: "pointer",
                                }}
                            >
                                {lang === "en" ? "All" : "すべて"} ({projects.length})
                            </button>
                            {tags.map((tag) => {
                                const tagName = t(tag, "en");
                                const isSelected = selectedTag === tagName;

                                return (
                                    <button
                                        key={tagName}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => setSelectedTag(isSelected ? null : tagName)}
                                        style={{
                                            border: `1px solid ${isSelected ? T.fgMute : T.rule}`,
                                            borderRadius: 999,
                                            padding: "5px 12px",
                                            background: isSelected ? "rgba(241,238,230,0.1)" : "transparent",
                                            color: isSelected ? T.fg : T.fgMute,
                                            fontFamily: T.serif,
                                            fontSize: 13,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {t(tag, lang)} ({tagCount(tagName)})
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}`, color: T.fgMute, fontFamily: T.serif, fontSize: 15 }}>
                        {lang === "en" ? "No projects listed yet." : "プロジェクトはまだ登録されていません。"}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}`, color: T.fgMute, fontFamily: T.serif, fontSize: 15 }}>
                        {lang === "en" ? "No projects match this tag." : "このタグに一致するプロジェクトはありません。"}
                    </div>
                ) : (
                    <div>
                        {filteredProjects.map((project, index) => (
                            <ProjectSummary
                                key={`${t(project.title, "en")}-${t(project.timeframe, "en")}-${index}`}
                                project={project}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </PageShell>
    );
};

export default ProjectsPage;
export const Head: HeadFC = () => <title>Projects — Kohei Miura</title>;
