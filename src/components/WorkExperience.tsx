import React from 'react';

export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

export const experiences: Experience[] = [
    {
        title: "Internship Student",
        company: "Huawei Technologies Japan K.K.",
        period: "Apr. 2026 - Pre.",
        description: "Computer Graphics, Human-Computer Interaction.",
    },
    {
        title: "Research Internship Student",
        company: "Nippon Telegraph and Telephone Corporation (NTT R&D)",
        period: "Feb. 2024 - Mar. 2024 (3 weeks)",
        description: "Data Science, Cognitive Science, Human-Computer Interaction.",
    },
    {
        title: "R&D Internship Student",
        company: "Sony Corporation",
        period: "Feb. 2024 (3weeks)",
        description: "3D Computer Vision and Radiance Fields",
    },
    {
        title: "Research Assistant",
        company: "Kyoto Research, Sony Computer Science Laboratories, Inc. (Kyoto, Japan)",
        period: "Jan. 2023 - Mar. 2026",
        description: "I was working on a project called AnyLight (PI: Yuichiro Takeuchi), which reproduces illumination effects. I also edit some videos for public relations.",
    },
];

const WorkExperience: React.FC = () => {
    return (
        <section className="work-experience">
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <h3>{exp.title}</h3>
                        <h4>{exp.company}</h4>
                        <p className="period">{exp.period}</p>
                        <p className="description">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkExperience;
