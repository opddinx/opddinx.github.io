import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { PageShell, SectionHeading } from "../components/PortfolioLayout";
import ProjectSummary from "../components/ProjectSummary";
import Footer from "../components/Footer";
import { useLang } from "../contexts/LangContext";
import { T } from "../styles/theme";
import { t } from "../types/i18n";
import SiteHead from "../components/SiteHead";
import { projects } from "../data/projects";

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
export const Head: HeadFC = () => <SiteHead title="Projects — Kohei Miura" pathname="/projects" />;
