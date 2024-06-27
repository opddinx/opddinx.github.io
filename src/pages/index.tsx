import * as React from "react"
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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
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
