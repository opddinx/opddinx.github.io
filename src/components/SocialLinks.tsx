import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
    url: string;
    icon: React.ReactElement;
    label: string;
}

const socialLinks: SocialLink[] = [
    {
        url: 'https://github.com/opddinx',
        icon: <FaGithub size={36} />,
        label: 'GitHub'
    },
    {
        url: 'https://linkedin.com/in/kohei-miura-opddinx',
        icon: <FaLinkedin size={36} />,
        label: 'LinkedIn'
    }
];

const SocialLinks: React.FC = () => {
    return (
        <div className="social-links">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;