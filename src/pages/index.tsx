import * as React from "react"
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

// ToDo:
// Add links as well as notion
// Add sub major programs
// Add research interests
// Add research projects and works
// redirect

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>opddinx - Kohei MIURA</title>
        <link rel="canonical" href="http://opddinx.github.io/" />
      </Helmet>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LiquidBackground />
      </React.Suspense>
      <main className="container">
        <h1 style={{ textDecoration: 'underline' }}>Kohei MIURA</h1>
        <AboutMe />
        <Education />
        <WorkExperience />
        <PublicationInternationalList />
        <PublicationDomesticList />
        <Awards />
        <Scholarships />
      </main>
      <Footer />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
