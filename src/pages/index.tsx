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
import Background from '../components/Background';
import News from '../components/News';
import ProjectsTeaser from '../components/ProjectsTeaser';
import favicon from '../images/favicon.ico';

// ToDo:
// Improve background simulation animation
// Add research projects and works
// redirect

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="page-shell">
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
          
        `}
        </style>
      </Helmet>
      <Background />
      <div className="cg-glow" aria-hidden="true" />
      <Header />
      <main className="container" style={{ paddingTop: '60px' }}>
        <h1 className="hero-name"><AnimatedHoverText>Kohei Miura</AnimatedHoverText></h1>
        <section id="about">
          <AboutMe />
        </section>
        <News />
        <ProjectsTeaser />
        <section id="education">
          <h2>Education</h2>
          <Education />
        </section>
        <section id="workexperience">
          <h2>Work Experience</h2>
          <WorkExperience />
        </section>
        <section id="pubinternational">
          <h2>Publications</h2>
          <PublicationInternationalList />
        </section>
        <section id="awards">
          <h2>Awards</h2>
          <Awards />
        </section>
        <section id="scholarships">
          <h2>Grants, Fellowship, Scholarship</h2>
          <Scholarships />
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>opddinx - Kohei MIURA</title>
