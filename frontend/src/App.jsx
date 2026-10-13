import { useEffect, useSyncExternalStore } from 'react'
import { MotionConfig, motion, useScroll } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Stack from './components/Stack'
import Contact from './components/Contact'
import ProjectsPage from './components/ProjectsPage'

const MotionDiv = motion.div

// Tiny hash router: "#/projects" is the all-projects page, anything else is the home page
const subscribe = (cb) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const getRoute = () => (window.location.hash.startsWith('#/projects') ? 'projects' : 'home')

function Home() {
  // arriving from another page with a section in the URL, e.g. "#contact"
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <main>
      <Hero />
      {/* everything below slides up over the pinned hero */}
      <div className="over">
        <Ticker />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Stack />
        <Contact />
      </div>
    </main>
  )
}

function App() {
  const route = useSyncExternalStore(subscribe, getRoute)
  const { scrollYProgress } = useScroll()

  return (
    <MotionConfig reducedMotion="user">
      <MotionDiv className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Navbar onHome={route === 'home'} />
      {route === 'projects' ? <ProjectsPage /> : <Home />}
      <Analytics />
    </MotionConfig>
  )
}

export default App
