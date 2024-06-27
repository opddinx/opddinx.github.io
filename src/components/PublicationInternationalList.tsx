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
                    title: "Factors of player experience in describing the relationship between remade and original works",
                    authors: "T. Yokosaka, K. Miura, Y. Isogaya, T. Ohtani, K. Maruya",
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
        </section>
    );
};

export default PublicationList;