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
            year: 2023,
            items: [
                {
                    title: "複数のRGB-Dカメラと熱カメラを用いた非剛体に対する手作業の三次元復元",
                    authors: "三浦康平，岩井大輔，佐藤宏介",
                    journal: "第26回画像の認識・理解シンポジウム(MIRU2023)",
                    attributes: "IS2-14, 2023, ポスター発表, 査読なし"
                },
                {
                    title: "複数のRGB-Dカメラ及び熱カメラを用いた手作業の三次元復元",
                    authors: "三浦康平，岩井大輔，佐藤宏介",
                    journal: "第67回システム制御情報学会研究発表講演会講演論文集（SCI'23）",
                    attributes: "pp.98-101, 2023, 口頭発表，査読なし"
                }
            ]
        },
        {
            year: 2022,
            items: [
                {
                    title: "VR空間におけるエージェントとの相補的関係性認知プロセスの定性評価",
                    authors: "三浦 康平, 橋川 莉乃, 高橋 英之, 簗瀬 洋平, 田中 一敏",
                    journal: "HAIシンポジウム 2022",
                    attributes: "ポスター発表，査読なし"
                },
                {
                    title: "腹筋運動するぬいぐるみロボットとの共有体験が与える志向的解釈への影響",
                    authors: "橋川莉乃，三浦康平，高橋英之，田中一敏，簗瀬洋平",
                    journal: "HAIシンポジウム 2022",
                    attributes: "口頭発表，査読なし"
                }
            ]
        }
    ];

    return (
        <section className="publications">
            <h2>Publications (Domestic - Japanese description only)</h2>
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