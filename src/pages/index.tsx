import * as React from "react"
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet"
import type { HeadFC, PageProps } from "gatsby"
import LiquidBackground from "../components/LiquidBackground"
import PublicationInternationalList from '../components/PublicationInternationalList';
import PublicationDomesticList from '../components/PublicationDomesticList';
import WorkExperience from '../components/WorkExperience';
import AboutMe from '../components/AboutMe';
import Education from '../components/Education';
import Footer from '../components/Footer';
import Scholarships from '../components/Achievements';
import Awards from '../components/Awards';
import WebGl from '../components/WebGL';

// ToDo:
// Improve background simulation animation
// Add links as well as notion
// Add sub major programs
// Add research interests
// Add research projects and works
// redirect

const IndexPage: React.FC<PageProps> = () => {
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Get initial width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-COMPATIBLE" content="IE=edge" />
        <link rel="canonical" href="http://opddinx.github.io/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta httpEquiv="Content-Language" content="ja" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <style>
        {`
          body {
            overscroll-behavior: none;
            /* cursor: none; */
            touch-action: none;
          }

          canvas {
            position: fixed;
            top: 0;
            left: 0;
          }
        `}
        </style>
      </Helmet>
      <WebGl/>
      <main className="container">
        <h1 style={{ textDecoration: 'underline' }}>Kohei MIURA</h1>
        <AboutMe />
        <Education />
        <WorkExperience />
        <PublicationInternationalList />
        <PublicationDomesticList />
        <Awards />
        <Scholarships />
        <Footer />
      </main>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>opddinx - Kohei MIURA</title>
