'use client';

import React from 'react';

export interface AcademicServiceItem {
    title: string;
    time: string;
    description: string;
}

export const academicService: AcademicServiceItem[] = [
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
        title: "Student Assistant & Teaching Assistant",
        time: "Nov. 2023 - Mar. 2025",
        description: "Mainly work as a facilitator for SEEDs Program",
    },
    {
        title: "Teaching Assistant",
        time: "Apr. 2023 - Feb. 2024, Apr. 2025 - Aug. 2025",
        description: "Introductory Programming, Intelligent Systems Seminar",
    },
];

const AcademicService: React.FC = () => {
    return (
        <section className="academic-service">
            <div className="timeline">
                {academicService.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <h3>{item.title}</h3>
                        <p className="time">{item.time}</p>
                        <p className="description">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AcademicService;
