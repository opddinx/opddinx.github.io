import React, { useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import ScrollLink from './ScrollLink';

type HeaderProps = {
    variant?: 'home' | 'page';
};

const Header: React.FC<HeaderProps> = ({ variant = 'home' }) => {
    const [isVisible, setIsVisible] = useState(false);

    const closeMenu = () => setIsVisible(false);

    return (
        <>
            <button
                className="header-toggle"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                aria-expanded={isVisible}
                aria-controls="site-navigation"
                aria-label={isVisible ? "Hide navigation" : "Show navigation"}
            >
                {isVisible ? '×' : '☰'}
            </button>
            {isVisible && (
                <button
                    type="button"
                    className="header-scrim"
                    aria-label="Close navigation overlay"
                    onClick={closeMenu}
                />
            )}
            <header className={`header ${isVisible ? 'visible' : ''}`} id="site-navigation">
                <nav>
                    <ul>
                        {variant === 'home' ? (
                            <>
                                <li><ScrollLink to="#news" onNavigate={closeMenu}>News</ScrollLink></li>
                                <li><ScrollLink to="#about" onNavigate={closeMenu}>About</ScrollLink></li>
                                <li><ScrollLink to="#projects" onNavigate={closeMenu}>Projects</ScrollLink></li>
                                <li><GatsbyLink to="/projects" onClick={closeMenu}>All Projects</GatsbyLink></li>
                                <li><ScrollLink to="#education" onNavigate={closeMenu}>Education</ScrollLink></li>
                                <li><ScrollLink to="#workexperience" onNavigate={closeMenu}>Work Experience</ScrollLink></li>
                                <li><ScrollLink to="#pubinternational" onNavigate={closeMenu}>Publications</ScrollLink></li>
                                <li><ScrollLink to="#awards" onNavigate={closeMenu}>Awards</ScrollLink></li>
                                <li><ScrollLink to="#scholarships" onNavigate={closeMenu}>Scholarships</ScrollLink></li>
                            </>
                        ) : (
                            <>
                                <li><GatsbyLink to="/" onClick={closeMenu}>Home</GatsbyLink></li>
                                <li><GatsbyLink to="/projects" onClick={closeMenu}>Projects</GatsbyLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
