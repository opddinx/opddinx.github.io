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
            title: "Outstanding Student Award in the Division of System Science and Applied Informatics (Magna cum laude)",
            givenby: "Graduate School of Engineering Science, the University of Osaka",
            time: "March 2025",
            description: "Awarded for the outstanding achievements in academic performance and research activities during the Master's program",
        },
        {
            title: "Best Student Demo in Show Award",
            givenby: "The 17th ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia (SIGGRAPH Asia 2024)",
            time: "December 2024",
            description: "Awarded for the student's demonstration of the research titled 'Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands' as co-author",
        },
        {
            title: "Student Presentation Award in SCI'23",
            givenby: "The 67th Conference of the Institute of Systems, Control and Information Engineers",
            time: "May 2023",
            description: "Awarded for the students' presentation of the research titled '3D Reconstruction of Hand Work Using Multiple RGB-D Cameras and Thermal Cameras'",
        },
    ];

    return (
        <section className="awards">
            <div className="timeline">
                {awards.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <h3>{exp.title}</h3>
                        <h4>{exp.givenby}</h4>
                        <p className="time">{exp.time}</p>
                        <p className="description">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Awards;
