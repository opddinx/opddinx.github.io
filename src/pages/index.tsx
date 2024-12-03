import mainjs from '../js/main.js'
import * as React from "react"
import { Helmet } from "react-helmet"
import type { HeadFC, PageProps } from "gatsby"
import PublicationInternationalList from '../components/PublicationInternationalList';
import WorkExperience from '../components/WorkExperience';
import AboutMe from '../components/AboutMe';
import Education from '../components/Education';
import Footer from '../components/Footer';
import Scholarships from '../components/Achievements';
import Awards from '../components/Awards';
import Header from '../components/Header';
import AnimatedHoverText from '../components/AnimatedHoverText';
import favicon from '../images/favicon.ico';

// ToDo:
// Improve background simulation animation
// Add research projects and works
// redirect

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-COMPATIBLE" content="IE=edge" />
        <link rel="canonical" href="http://opddinx.github.io/" />
        <link rel="icon" href={favicon} />
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
          }

          canvas {
            position: fixed;
            top: 0;
            left: 0;
          }
          
        `}
        </style>
      </Helmet>
      <script src={mainjs}></script>
      <main className="container" style={{ paddingTop: '60px' }}>
      <Header />
        <h1><AnimatedHoverText>κοηει ΜΙυRA</AnimatedHoverText></h1>
        <section id="about">
          <AboutMe />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="workexperience">
          <WorkExperience />
        </section>
        <section id="pubinternational">
          <PublicationInternationalList />
        </section>
        <section id="awards">
          <Awards />
        </section>
        <section id="scholarships">
          <Scholarships />
        </section>
        <Footer />
      </main>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>opddinx - Kohei MIURA</title>
