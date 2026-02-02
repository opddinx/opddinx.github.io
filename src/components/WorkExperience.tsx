import React from 'react';

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

const WorkExperience: React.FC = () => {
    const experiences: Experience[] = [
        {
            title: "R&D Internship Student",
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
            period: "Mar. 2023 - Present",
            description: "I'm working on a project called AnyLight (PI: Yuichiro Takeuchi), which reproduces illumination effects. I also edit some videos for public relations.",
        },
    ];

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
