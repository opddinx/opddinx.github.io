import React from 'react';
import SocialLinks from './SocialLinks';
import avatar from '../images/avatar.png';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    bio: 'I study how humans perceive, feel, think, express, and interpret through the design of novel capture/display systems and experimental experiences. My goal is to reveal how subjective experience is formed and communicated, and to translate this understanding into new forms of human-computer interaction and expressive media.',
    interests: 'Computer Vision, Computer Graphics, Geometry Processing, Machine Learning, Human-Computer Interaction, Fabrication, Physics Simulation, XR/AR/VR, Cognitive Science',
    emails: ['miura.kohei.h75[at]ecs.osaka-u.ac.jp', 'opddinx[at]gmail.com'],
    affiliations: [
        { name: 'Graduate School of Engineering Science, the University of Osaka', url: 'https://www.es.osaka-u.ac.jp/en/' },
        { name: 'Humanware Innovation Program, the University of Osaka', url: 'https://www.humanware.osaka-u.ac.jp/' },
        ,
    ],
} as const;

const AboutMe = () => {
    return (
        <>
            <div className='intro-container'>
                <div className="image-container">
                    <img src={avatar} alt="My avatar" width={120} height={120} className="hover-animate"/>
                    <SocialLinks />
                </div>
                <div className='introduction' style={{ marginLeft: '10px' }}>
                    <h4>
                        I am a PhD student at{" "}
                        <a href={ABOUT_DATA.xrgroupUrl} target="_blank" rel="noreferrer noopener">
                            XRGroup
                        </a>{" "}
                        of the University of Osaka, majoring in Computer Vision, Graphics, Interaction.{" "}
                        {ABOUT_DATA.bio}
                    </h4>
                </div>
            </div>
            <div className='interests'>
                <h3>Research Interests</h3>
                <p>{ABOUT_DATA.interests}</p>
            </div>
            <div className='Contacts'>
                <h3>E-mail</h3>
                {ABOUT_DATA.emails.map((e) => <p key={e}>{e}</p>)}
            </div>
            <div className='affiliation'>
                <h3>Affiliation</h3>
                {ABOUT_DATA.affiliations.map((a) => (
                    <p key={a.name}>
                        {a.url ? <a href={a.url}>{a.name}</a> : a.name}
                    </p>
                ))}
            </div>
        </>
    );
};

export default AboutMe;
