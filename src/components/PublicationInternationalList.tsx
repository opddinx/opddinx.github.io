'use client';

import React from 'react';

interface Publication {
    title: string;
    authors: string;
    journal: string;
    attributes: string;
}

interface YearGroup {
    year: number;
    items: Publication[];
}

const PublicationList: React.FC = () => {
    const publications: YearGroup[] = [
        {
            year: 2024,
            items: [
                {
                    title: "3D Reconstruction of a Soft Object Surface and Contact Areas in Hand-Object Interactions",
                    authors: "Kohei Miura, Daisuke Iwai, Kosuke Sato",
                    journal: "SIGGRAPH Asia 2024 Posters",
                    attributes: "Poster, Peer-reviewed"
                },
                {
                    title: "Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands",
                    authors: "Yotam Erel, Or Kozlovsky-Mordenfeld, Hiroki Kusuyama, Kohei Miura, Daisuke Iwai, Kosuke Sato, Amit H. Bermano",
                    journal: "SIGGRAPH Asia 2024 Emerging Technologies",
                    attributes: "Emerging Technologies (Demonstration), Peer-reviewed"
                },
                {
                    title: "IntelliCID: Intelligent Caustics Illumination Device",
                    authors: "Shun Hanai, Kohei Miura (EQUAL CONTRIBUTION)",
                    journal: "Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST '24 Adjunct)",
                    attributes: "Student Innovation Contest (Demonstration), Peer-reviewed"
                },
                {
                    title: "Factors of player experience in describing the relationship between remade and original works",
                    authors: "Takumi Yokosaka, Kohei Miura, Yuko Isogaya, Tomoko Ohtani, Kazushi Maruya",
                    journal: "Proceedings of the IEEE 6th Conference on Games (IEEE CoG 2024)",
                    attributes: "Short Paper, Peer-reviewed"
                }
            ]
        }
    ];

    return (
        <section className="publications">
            <h2>Publications (International)</h2>
            {publications.map(yearGroup => (
                <div key={yearGroup.year} className="year-group">
                    <h3>{yearGroup.year}</h3>
                    <ul>
                        {yearGroup.items.map((pub, index) => (
                            <li key={index}>
                                <p className="title" style={{ fontWeight: 900 }}>{pub.title}</p>
                                <p className="authors">{pub.authors}</p>
                                <p className="journal">{pub.journal}</p>
                                <p className="attributes">{pub.attributes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <p>To see all achievement lists (CV) including domestic conferences and other small achievements, please contact me via e-mail or see <a href='https://researchmap.jp/koheimiura'>Researchmap</a> for domestic conferences.</p>
        </section>
    );
};

export default PublicationList;