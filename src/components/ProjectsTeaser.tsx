import React from 'react';
import { Link } from 'gatsby';

type ProjectTeaser = {
    title: string;
    image: string;
    link: string;
    caption: string;
};

const projectTeasers: ProjectTeaser[] = [];

const ProjectsTeaser: React.FC = () => {
    return (
        <section id="projects" className="projects-teaser">
            <div className="projects-header">
                <div>
                    <h2>Projects</h2>
                    <p>Selected work at a glance.</p>
                </div>
                <Link to="/projects" className="projects-link">
                    View all projects
                </Link>
            </div>
            {projectTeasers.length === 0 ? (
                <div className="projects-empty">
                    <p>No project teasers yet.</p>
                    <p>Add items in `src/components/ProjectsTeaser.tsx`.</p>
                </div>
            ) : (
                <div className="projects-grid">
                    <Link to={projectTeasers[0].link} className="project-card project-feature">
                        <div className="project-media project-media-feature">
                            <img src={projectTeasers[0].image} alt={projectTeasers[0].title} />
                        </div>
                        <div className="project-body">
                            <h3>{projectTeasers[0].title}</h3>
                            <p>{projectTeasers[0].caption}</p>
                        </div>
                    </Link>
                    <div className="project-stack">
                        {projectTeasers.slice(1).map((project) => (
                            <Link key={project.title} to={project.link} className="project-card">
                                <div className="project-media">
                                    <img src={project.image} alt={project.title} />
                                </div>
                                <div className="project-body">
                                    <h4>{project.title}</h4>
                                    <p>{project.caption}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProjectsTeaser;
