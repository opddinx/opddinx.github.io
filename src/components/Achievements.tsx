'use client';

import React from 'react';

interface Scholarship {
    title: string;
    company: string;
    period: string;
    description: string;
}

const Scholarships: React.FC = () => {
    const scholarship: Scholarship[] = [
        {
            title: "DAIKIN Corp. Student Researcher Fellowship",
            company: "DAIKIN Corporation",
            period: "Jul. 2024 - Jun. 2025 (Expected)",
            description: "Offered based on the comprehensive cooperation between Osaka University and DAIKIN Corporation (1.44M yen per year).",
        },
        {
            title: "Humanware Innovation Program Scholarship",
            company: "Osaka University",
            period: "Apr. 2023 - Mar. 2025 (Expected)",
            description: "The scholarship for me to concentrate on my research activity (amount is varying by time to time)",
        },
    ];

    return (
        <section className="scholarships">
            <h2>Scholarships and Fellowships</h2>
            <div className="timeline">
                {scholarship.map((exp, index) => (
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

export default Scholarships;