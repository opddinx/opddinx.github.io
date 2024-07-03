import React from 'react';

interface AnimatedHoverTextProps {
    children: React.ReactNode;
    hoverColor?: string;
    hoverBgColor?: string;
}

const AnimatedHoverText: React.FC<AnimatedHoverTextProps> = ({
    children,
    hoverColor = 'white',
    hoverBgColor = 'black'
}) => {
    return (
        <span
            className="animatedText"
            style={{
                '--hover-color': hoverColor,
                '--hover-bg-color': hoverBgColor
            } as React.CSSProperties}
        >
            {children}
        </span>
    );
};

export default AnimatedHoverText;