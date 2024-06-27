'use client';

import React from 'react';

interface Education {
    title: string;
    faculty: string;
    period: string;
    description: string;
}

const Educations: React.FC = () => {
    const educations: Education[] = [
        {
            title: "Master's Degree",
            faculty: "Division of System Science and Applied Informatics, Department of Systems Innovation Science, Graduate School of Engineering Science, Osaka University (Osaka, Japan)",
            period: "Apr. 2023 - Mar. 2025 (Expected)",
            description: "Following my undergraduate studies, I am working at SENSLab in the research and development of 3D data processing technology for manual work.",
        },
        {
            title: "Bachelor's Degree",
            faculty: "Intelligent Systems Science Course, Department of Systems Science, School of Engineering Science, Osaka University (Osaka, Japan)",
            period: "Apr. 2019 - Mar. 2023",
            description: "I earned a degree in Systems Science (Intelligent Systems). In my third year of undergraduate studies, I conducted an independent research on HAI under the guidance of Guest Associate Professor.Takahashi and in my fourth year of undergraduate studies, I conducted research and development of 3D data processing technology for manual work by applying computer vision at SENSLab.",
        },
        // More experiences...
    ];

    return (
        <section className="Education">
            <h2>Education</h2>
            <div className="timeline">
                {educations.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-content">
                            <h3>{exp.title}</h3>
                            <h4>{exp.faculty}</h4>
                            <p className="period">{exp.period}</p>
                            <p className="description">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Educations;