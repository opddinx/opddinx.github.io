import React from 'react';
import avatar from '../images/avatar.png';

const AboutMe = () => {
    return (
    <>
        <h2>Introduction</h2>
        <div className='intro-container'>
            <div className="image-container">
                <img src={avatar} alt="My avatar" width={150} height={150} className="hover-animate"/>
            </div>
            <div className='introduction' style={{ marginLeft: '10px' }}> 
                <h4>I’m a master student at SENSLab in Osaka University majoring in Computer Vision. I want to extend human ability by understanding our culture deeply and using cutting-edge technologies (especially from optical/light technologies with computers). To achieve this, I want to know how human sense world, feel, think, express our feelings, and interpret what others express. I believe that understanding this process through will give us insights of what we are, how to create new media for communication, in order to live better lives.</h4>
            </div>
        </div>
        <h3>E-mail</h3>
        <p>(Public): opddinx[at]gmail.com</p>
        <p>(Academic): kouhei.miura[at]sens.sys.es.osaka-u.ac.jp</p>
    </>
    );
};

export default AboutMe;