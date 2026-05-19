'use strict';
import React from 'react';

export interface PressItem {
    title: string;
    source: string;
    time: string;
    link: string;
}

export const pressItems: PressItem[] = [
    {
        title: "Renewal of the Permanent Exhibition 'Hello! Robot' at Miraikan (Only in Japanese)",
        source: "Miraikan - The National Museum of Emerging Science and Innovation, Japan",
        time: "Jon 12 , 2025",
        link: "https://www.miraikan.jst.go.jp/news/general/202506124091.html",
    },
];

const Press: React.FC = () => {
    return (
        <section className="press">
            <div className="timeline">
                {pressItems.map((item, index) => (
                    <div key={index} className="timeline-item">
                        <h3>{item.title}</h3>
                        <h4>{item.source}</h4>
                        <p className="time">{item.time}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">Read More</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Press;
