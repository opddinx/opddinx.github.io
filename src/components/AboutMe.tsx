import React from 'react';
import SocialLinks from './SocialLinks';
import avatar from '../images/avatar.png';

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
                        <a href="https://www.xr.sys.es.osaka-u.ac.jp/" target="_blank" rel="noreferrer noopener">
                            XRGroup
                        </a>{" "}
                        at the University of Osaka, majoring in Computer Science and Computer Graphics. I want to extend
                        human ability by fusing our culture and cutting-edge technologies deeply. To achieve this, I
                        want to know how humans sense the world, feel, think, express our feelings, and interpret what
                        others express. I believe that understanding this process will give us insights into who we
                        are, and how to create new media for communication in order to live better lives.
                    </h4>
                </div>
            </div>
            <div className='interests'>
                <h3>Research Interests</h3>
                <p>Computer Vision, Computer Graphics, Geometry Processing, Machine Learning, Human-Computer Interaction, Fabrication, Physics Simulation, XR/AR/VR, Cognitive Science</p>
            </div>
            <div className='Contacts'>
                <h3>E-mail</h3>
                <p> miura.kohei.h75[at]ecs.osaka-u.ac.jp</p>
                <p> opddinx[at]gmail.com</p>
            </div>
            <div className='affiliation'>
                <h3>Affiliation</h3>
                <p><a href='https://www.es.osaka-u.ac.jp/en/'>Graduate School of Engineering Science, the University of Osaka</a></p>
                <p><a href='https://www.humanware.osaka-u.ac.jp/'>Humanware Innovation Program, the University of Osaka</a></p>
                <p>Kyoto research, Sony Computer Science Laboratories, Inc.</p>
            </div>
        </>
    );
};

export default AboutMe;
