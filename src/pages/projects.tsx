import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Header from "../components/Header";
import WebGPUBackground from "../components/WebGPUBackground";

type Project = {
    title: string;
    summary: string;
    timeframe: string;
    tags: string[];
    link?: string;
};

const projects: Project[] = [];

const ProjectsPage: React.FC<PageProps> = () => {
    return (
        <>
            <WebGPUBackground />
            <main className="container" style={{ paddingTop: '60px' }}>
                <Header variant="page" />
                <section className="mt-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h1 className="text-balance text-3xl font-semibold text-slate-900">Projects</h1>
                        <div className="text-right text-sm text-slate-500">
                            <p className="text-pretty">Selected systems, prototypes, and tools.</p>
                            <a className="text-sm font-medium text-indigo-600" href="/">Back to home</a>
                        </div>
                    </div>
                    {projects.length === 0 ? (
                        <div className="mt-6 rounded-md border border-slate-200 bg-white/80 p-6">
                            <p className="text-pretty text-sm text-slate-600">No projects listed yet.</p>
                            <p className="text-pretty text-sm text-slate-600">Add entries in `src/pages/projects.tsx`.</p>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-4">
                            {projects.map((project) => (
                                <article key={project.title} className="rounded-md border border-slate-200 bg-white/80 p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h2 className="text-balance text-xl font-semibold text-slate-900">
                                            {project.title}
                                        </h2>
                                        <span className="text-xs font-medium text-slate-500 tabular-nums">
                                            {project.timeframe}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-pretty text-sm text-slate-600">{project.summary}</p>
                                    {project.tags.length > 0 ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {project.link ? (
                                        <a className="mt-4 inline-flex text-sm font-medium text-indigo-600" href={project.link}>
                                            View project
                                        </a>
                                    ) : null}
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default ProjectsPage;

export const Head: HeadFC = () => <title>Projects | opddinx</title>;
