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
            title: "SPIE Photonics West Student Travel Support",
            company: "SPIE, the international society for optics and photonics",
            period: "Jan. 2026",
            description: "To present my research at SPIE Photonics West 2026 (1000 USD)."
        },
        {
            title: "NEDO Entrepreneurs Program",
            company: "National Research and Development Agency (NEDO), Japan",
            period: "Apr. 2025 - Mar. 2026",
            description: "To implement my R&D project into society by launching a startup (3M JPY)."
        },
        {
            title: "AKATSUKI Project: Kansai Tech Creator Challenge",
            company: "Ministry of Economy, Trade and Industry, Japan",
            period: "Sep. 2024 - Feb. 2025",
            description: "This project aims to aid innovative IT creators in Kansai region (550K JPY)."
        },
        {
            title: "DAIKIN Industries Ltd. Student Researcher Fellowship",
            company: "DAIKIN Industries Ltd.",
            period: "Jul. 2024 - Mar. 2025",
            description: "Offered based on the comprehensive cooperation between Osaka University and DAIKIN (120K JPY/month).",
        },
        {
            title: "Humanware Innovation Program Scholarship",
            company: "Osaka University",
            period: "Apr. 2023 - Mar. 2025",
            description: "To concentrate on my research activity (amount varies depending on the situation)",
        },
    ];

    return (
        <section className="scholarships">
            <h2>Scholarships, Fellowships, Grants</h2>
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