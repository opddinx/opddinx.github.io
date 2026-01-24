import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface ScrollLinkProps {
    to: string;
    children: React.ReactNode;
    onNavigate?: () => void;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ to, children, onNavigate }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector(to);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <GatsbyLink to={to} onClick={handleClick}>
            {children}
        </GatsbyLink>
    );
};

export default ScrollLink;
