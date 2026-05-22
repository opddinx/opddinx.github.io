import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import LightLeakBG from "../components/LightLeakBG";
import DiffractionNav from "../components/DiffractionNav";
import Signature from "../components/Signature";
import { T } from "../styles/theme";
import "../styles/global.css";

type Project = {
    title: string;
    summary: string;
    timeframe: string;
    tags: string[];
    link?: string;
};

const projects: Project[] = [];

const ProjectsPage: React.FC<PageProps> = () => (
    <div style={{ position: 'relative', color: T.fg, fontFamily: T.serif, minHeight: '100%', fontSize: 15, lineHeight: 1.6, background: T.bg }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
            <LightLeakBG intensity={0.95} grain={0.18} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 80px)' }}>
            <DiffractionNav active="top" />

            <section style={{ marginTop: 72, marginBottom: 120 }}>
                <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, color: T.fg, margin: '0 0 12px', lineHeight: 1.15 }}>
                    Projects.
                </h1>
                <p style={{ color: T.fgMute, fontStyle: 'italic', fontSize: 15, margin: '0 0 40px', lineHeight: 1.6 }}>
                    Selected systems, prototypes, and tools.
                </p>

                {projects.length === 0 ? (
                    <div style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}`, color: T.fgMute, fontFamily: T.serif, fontStyle: 'italic', fontSize: 15 }}>
                        No projects listed yet — add entries in <code style={{ fontFamily: 'monospace', fontSize: 14, opacity: 0.7 }}>src/pages/projects.tsx</code>.
                    </div>
                ) : (
                    <div>
                        {projects.map((project) => (
                            <div key={project.title} className="l-row" style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}>
                                <div className="l-row-date" style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fgMute }}>
                                    {project.timeframe}
                                </div>
                                <div>
                                    <h2 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 400, color: T.fg, margin: '0 0 8px', lineHeight: 1.3 }}>
                                        {project.title}
                                    </h2>
                                    <p style={{ color: T.fgDim, fontSize: 15, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{project.summary}</p>
                                    {project.tags.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                                            {project.tags.map((tag) => (
                                                <span key={tag} style={{ border: `1px solid ${T.rule}`, borderRadius: 999, padding: '2px 10px', fontSize: 13, color: T.fgMute, fontFamily: T.serif, fontStyle: 'italic' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {project.link && (
                                        <a href={project.link} style={{ display: 'inline-block', marginTop: 12, fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.fg, textDecorationColor: T.rule, textUnderlineOffset: 3 }}>
                                            View project ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <div style={{ paddingTop: 28, borderTop: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
                <Signature size={36} color={T.fg} opacity={0.85} />
                <div style={{ color: T.fgMute, fontSize: 14, fontFamily: T.serif, fontStyle: 'italic' }}>
                    © Kohei Miura · {new Date().getFullYear()}
                </div>
            </div>
        </div>
    </div>
);

export default ProjectsPage;
export const Head: HeadFC = () => <title>Projects — Kohei Miura</title>;
