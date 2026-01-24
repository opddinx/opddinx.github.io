import React from 'react';

type NewsItem = {
    id: string;
    title: string;
    date: string;
    summary: string;
    details: string;
};

const newsItems: NewsItem[] = [
    {
        id: 'news1',
        title: 'Joined XRGroup at Osaka University as a PhD Student',
        date: 'April 2024',
        summary: 'I have started my PhD studies at the XRGroup in the Graduate School of Engineering Science, Osaka University.',
        details: 'I am excited to join the XRGroup and look forward to contributing to cutting-edge research in computer science and graphics.',
    },
    {
        id: 'news2',
        title: 'Presented Research at SIGGRAPH Asia 2024',
        date: 'December 2024',
        summary: 'Co-authored a student demo presentation at SIGGRAPH Asia 2024.',
        details: 'Our work on "Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands" was recognized with the Best Student Demo in Show Award.',
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
                    <p>Latest updates</p>
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
