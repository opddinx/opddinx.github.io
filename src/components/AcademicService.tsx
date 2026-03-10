'use client';

import React from 'react';

interface AcademicService {
    title: string;
    time: string;
    description: string;
}

const AcademicService: React.FC = () => {
    const academicService: AcademicService[] = [
        {
            title: "Student Volunteer",
            time: "IEEE AIxVR 2026",
            description: "",
        },
        {
            title: "Reviewer",
            time: "IEEE VR workshop (VR-HSA 2026), ACM DIS 2026",
            description: "",
        },
        {
            title: "SEEDs Program (Student Assistant & Teaching Assistant)",
            time: "Nov. 2023 - Mar. 2025",
            description: "Mainly work as a facilitator",
        },
        {
            title: "Introductory Programming, Intelligent Systems Seminar (Teaching Assistant)",
            time: "Apr. 2023 - Feb. 2024, Apr. 2025 - Aug. 2025",
            description: "Assist in programming exercises and academic reading",
        },
    ];

    return (
        <section className="academic-service">
            <div className="timeline">
                {academicService.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <h3>{exp.title}</h3>
                        <p className="time">{exp.time}</p>
                        <p className="description">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AcademicService;