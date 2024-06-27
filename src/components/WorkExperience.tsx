'use client';

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
            description: "Data Science, Cognitive Science, Human-Computer Interaction (the detail is not open due to NDA).",
        },
        {
            title: "R&D Internship Student",
            company: "Sony Corporation",
            period: "Feb. 2024 (3weeks)",
            description: "3D Computer Vision and Radiance Fields (the detail is not open due to NDA)",
        },
        {
            title: "Student Assistant & Teaching Assistant",
            company: "Center for Education in Liberal Arts and Sciences, Osaka University (Osaka, Japan)",
            period: "Nov. 2023 - Present",
            description: "I encourage high school students to have lively and invaluable scientific experiences in SEEDS program of Osaka University.",
        },
        {
            title: "Teaching Assistant",
            company: "School of Engineering Science, Osaka University (Osaka, Japan)",
            period: "Apr. 2023 - Feb. 2024",
            description: "I assist undergraduate students in the class of C language basic programming exercises, and how to read technical books and academic papers.",
        },
        {
            title: "Research Assistant",
            company: "Kyoto Research, Sony Computer Science Laboratories, Inc. (Kyoto, Japan)",
            period: "Mar. 2023 - Present",
            description: "As a research assistant, I’m working on a project called AnyLight (PI: Yuichiro Takeuchi), which reproduces illumination effects from any light source. Additionally, I edit some videos for public relations.",
        },
    ];

    return (
        <section className="work-experience">
            <h2>Work Experience</h2>
            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-content">
                            <h3>{exp.title}</h3>
                            <h4>{exp.company}</h4>
                            <p className="period">{exp.period}</p>
                            <p className="description">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkExperience;