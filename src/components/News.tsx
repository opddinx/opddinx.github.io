import React from 'react';

type NewsItem = {
    id: string;
    title: string;
    date: string;
    summary: string;
};

export const newsItems: NewsItem[] = [
    {
        id: 'cvpr2026-accepted',
        title: 'My co-authored paper was accepted to CVPR 2026, see you in Denver!',
        date: 'Mar. 2026',
        summary: '',
    },
    {
        id: 'ahs2026',
        title: 'My first-authored and co-authored poster presentations were accepted to Augmented Humans 2026, see you in Okinawa!',
        date: 'Mar. 2026',
        summary: '',
    },
    {
        id: 'pw2026',
        title: 'Presented a first-authored and co-authored oral presentation at SPIE Photonics West AR | VR | MR 2026',
        date: 'Jan. 2026',
        summary: '',
    },
    {
        id: 'miru2025',
        title: 'Presented first-authored poster at MIRU 2025',
        date: 'Jul. 2025',
        summary: '',
    },
    {
        id: 'pocchan',
        title: '"Pocchan" starts to be exhibited at Miraikan',
        date: 'Jun. 2025',
        summary: 'I developed its thermography-based interaction, and it is now part of the permanent exhibition "Hello! Robot" at Miraikan, The National Museum of Emerging Science and Innovation, Japan.',
    },
    {
        id: 'nepfr',
        title: 'Adopted for NEDO Entrepreneus Program',
        date: 'Apr. 2025',
        summary: 'My R&D project "Construction of an Immersive Story Editing Experience using Deep Generative Models and Virtual Reality" has been selected for the NEDO Entrepreneurs Program to implement it into society by launching a startup.',
    },
    {
        id: 'joinxr',
        title: 'Joined XRGroup at Osaka University as a PhD Student',
        date: 'Apr. 2025',
        summary: 'I have started my PhD studies at the XRGroup in the Graduate School of Engineering Science, Osaka University.',
    },
    {
        id: 'siggraphasia2024',
        title: 'Presented Research at SIGGRAPH Asia 2024',
        date: 'Dec. 2024',
        summary: 'First-authored a poster and co-authored a student demo presentation at SIGGRAPH Asia 2024.',
    }
];

const visibleCount = 3;

const News: React.FC = () => {
    const [showAll, setShowAll] = React.useState(false);
    const visibleItems = showAll ? newsItems : newsItems.slice(0, visibleCount);
    const canToggle = newsItems.length > visibleCount;
    const featured = visibleItems[0];
    const rest = visibleItems.slice(1);

    return (
        <section id="news" className="news">
            <div className="news-header">
                <div>
                    <h2>News</h2>
                    <p>Latest update</p>
                </div>
                {canToggle ? (
                    <button
                        type="button"
                        onClick={() => setShowAll((value) => !value)}
                        className="news-toggle"
                        aria-label={showAll ? 'Show fewer news items' : 'Show all news items'}
                    >
                        {showAll ? 'Show fewer' : 'Show all'}
                    </button>
                ) : null}
            </div>
            {newsItems.length === 0 ? (
                <div className="news-empty">
                    <p>No news entries yet.</p>
                    <p>Add items in `src/components/News.tsx`.</p>
                </div>
            ) : (
                <div className="news-shell">
                    <div className="news-list">
                        {featured ? (
                            <div className="news-item news-item-featured">
                                <p className="news-date">{featured.date}</p>
                                <div>
                                    <h4>{featured.title}</h4>
                                    <p className="news-summary">{featured.summary}</p>
                                </div>
                            </div>
                        ) : null}
                        {rest.map((item) => (
                            <div key={item.id} className="news-item">
                                <p className="news-date">{item.date}</p>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p className="news-summary">{item.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default News;
