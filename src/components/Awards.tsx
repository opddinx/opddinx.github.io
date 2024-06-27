'use client';

import React from 'react';

interface Award {
    title: string;
    givenby: string;
    time: string;
    description: string;
}

const Awards: React.FC = () => {
    const awards: Award[] = [
        {
            title: "Student Presentation Award in SCI’23",
            givenby: "The 67th Conference of the Institute of Systems, Control and Information Engineers",
            time: "May 2023",
            description: "Awarded for the students' presentation of the research titled '3D Reconstruction of Hand Work Using Multiple RGB-D Cameras and Thermal Cameras'",
        },
    ];

    return (
        <section className="awards">
            <h2>Awards</h2>
            <div className="timeline">
                {awards.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-content">
                            <h3>{exp.title}</h3>
                            <h4>{exp.givenby}</h4>
                            <p className="time">{exp.time}</p>
                            <p className="description">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Awards;