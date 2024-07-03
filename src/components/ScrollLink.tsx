import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface ScrollLinkProps {
    to: string;
    children: React.ReactNode;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ to, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector(to);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    return (
        <GatsbyLink to={to} onClick={handleClick}>
            {children}
        </GatsbyLink>
    );
};

export default ScrollLink;