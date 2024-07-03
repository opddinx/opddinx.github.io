import React from 'react';
import SocialLinks from './SocialLinks';
import avatar from '../images/avatar.png';

const AboutMe = () => {
    return (
    <>
        <h2>Introduction</h2>
        <div className='intro-container'>
            <div className="image-container">
                <img src={avatar} alt="My avatar" width={180} height={180} className="hover-animate"/>
                <SocialLinks />
            </div>
            <div className='introduction' style={{ marginLeft: '10px' }}> 
                <h4>I’m a master student at <a href="https://www.sens.sys.es.osaka-u.ac.jp/" target="_blank" rel="noreferrer noopener">SENSLab</a> in Osaka University majoring in Computer Vision. I want to extend human ability by understanding our culture deeply and using cutting-edge technologies. To achieve this, I want to know how human sense world, feel, think, express our feelings, and interpret what others express. I believe that understanding this process through will give us insights of what we are, how to create new media for communication, in order to live better lives.</h4>
            </div>
        </div>
        <h3>E-mail</h3>
        <p>(Public): opddinx[at]gmail.com</p>
        <p>(Academic): kouhei.miura[at]sens.sys.es.osaka-u.ac.jp</p>
        <div className='affiliation'>
            <h3>Affiliation</h3>
            <p><a href='https://www.es.osaka-u.ac.jp/en/'>Graduate School of Engineering Science, Osaka University</a></p>
            <p><a href='https://www.humanware.osaka-u.ac.jp/'>Humanware Innovation Program, Osaka University</a></p>
        </div>
    </>
    );
};

export default AboutMe;