import './styling/App.css'
import './styling/TabContent.css'
import { useState } from 'react'
import { Background } from './components/Canvas'
import { Exit } from './components/tab_buttons/Exit';
import { Header } from './components/Header';
import { Home } from './components/tab_buttons/Home';
import { About } from './components/tab_buttons/About';
import { Contact } from './components/tab_buttons/Contact';
import { Projects } from './components/tab_buttons/Projects';
import { BGSelector } from './components/BGSelector';
import { AboutPage } from './components/tabs/AboutPage';
import { ProjectsPage } from './components/tabs/ProjectsPage';
import { ContactPage } from './components/tabs/ContactPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [currentBackground, setBackground] = useState(1);
  const [currentSection, setCurrentSection] = useState('Home');

  return (
    <>
      <Analytics />
      <Background backgroundNumber={currentBackground} current={currentSection} />
      <BGSelector current={currentBackground} set={setBackground} />
      <Exit current={currentSection} set={setCurrentSection} />
      <main id="main" className="flex page-padding w-full h-full absolute -z-50">
        <section id="content-frame" className="relative w-full h-full canvas-border -z-50">
          <section id="tabs" className={`tabs-styling ${currentSection == 'Home' ? 'w-[30%]' : 'w-0 pointer-events-none'}`}>
            <Header />
            <Home current={currentSection} set={setCurrentSection} />
            <About current={currentSection} set={setCurrentSection} />
            <Projects current={currentSection} set={setCurrentSection} />
            <Contact current={currentSection} set={setCurrentSection} />
          </section>

          <section id="tab-content" className={`tab-content-styling ${currentSection == 'Home' ? 'w-0 pointer-events-none' : 'w-full'}`}>
            <AboutPage current={currentSection} />
            <ProjectsPage current={currentSection} />
            <ContactPage current={currentSection} />
          </section>
        </section>
      </main >
    </>
  )
}

export default App
