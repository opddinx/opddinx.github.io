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
            title: "Master's Degree in Engineering",
            faculty: "Division of System Science and Applied Informatics, Department of Systems Innovation Science, Graduate School of Engineering Science, Osaka University (Osaka, Japan)",
            period: "Apr. 2023 - Mar. 2025 (Expected)",
            description: "Following my undergraduate studies, I am working at SENSLab in the research and development of 3D data processing technology for manual work. I also study Liberal Arts as Graduate Programs for Advanced Interdisciplinary Studies",
        },
        {
            title: "Italian Design Summer School, Non-degree program",
            faculty: "Department of Industrial Engineering, University of Bologna (Bologna, Italy)",
            period: "Aug. 2024 - Sep. 2024",
            description: "I learned the history of Italian art, design and the design process of products, practicing the design method and tools. I also visited the headquarters of Italian design companies and design museums.",
        },
        {
            title: "Bachelor's Degree in Engineering",
            faculty: "Intelligent Systems Science Course, Department of Systems Science, School of Engineering Science, Osaka University (Osaka, Japan)",
            period: "Apr. 2019 - Mar. 2023",
            description: "I earned a degree in Systems Science (Intelligent Systems). In my third year of undergraduate studies, I conducted an independent research on HAI under the guidance of Guest Associate Professor Takahashi and in my fourth year of undergraduate studies, I conducted research and development of 3D data processing technology for manual work by applying computer vision at SENSLab.",
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