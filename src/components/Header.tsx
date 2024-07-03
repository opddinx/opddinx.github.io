import React, { useState } from 'react';
import ScrollLink from './ScrollLink';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <button
                className="header-toggle"
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "Hide navigation" : "Show navigation"}
            >
                {isVisible ? '×' : '☰'}
            </button>
            <header className={`header ${isVisible ? 'visible' : ''}`}>
                <nav>
                    <ul>
                        <li><ScrollLink to="#about">About</ScrollLink></li>
                        <li><ScrollLink to="#education">Education</ScrollLink></li>
                        <li><ScrollLink to="#workexperience">Work Experience</ScrollLink></li>
                        <li><ScrollLink to="#pubinternational">Publications</ScrollLink></li>
                        <li><ScrollLink to="#awards">Awards</ScrollLink></li>
                        <li><ScrollLink to="#scholarships">Scholarships</ScrollLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;