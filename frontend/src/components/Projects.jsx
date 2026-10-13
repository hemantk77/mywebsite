import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MdArrowForward, MdArrowOutward } from 'react-icons/md'
import { profile, projects } from '../data/site'
import repos from '../data/repos.json'
import Reveal from './Reveal'
import styles from '../styles/Projects.module.css'

const MotionArticle = motion.article

const no = (i) => String(i + 1).padStart(2, '0')

// Each card pins under the nav; later cards slide over it while it shrinks back
function Card({ project, i, total, progress }) {
    const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.05])
    const code = `${profile.github}/${project.repo}`

    return (
        <MotionArticle className={styles.card} style={{ scale, top: `calc(var(--nav-h) + ${24 + i * 20}px)` }}>
            <div className={styles.body}>
                <span className={`mono ${styles.no}`}>{no(i)} / {no(total - 1)}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
                <ul className={styles.points}>
                    {project.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <ul className={`mono ${styles.tags}`}>
                    {project.stack.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                <div className={styles.links}>
                    <a href={code} target="_blank" rel="noreferrer" className={styles.link}>
                        Code <MdArrowOutward aria-hidden="true" />
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className={styles.link}>
                            Live site <MdArrowOutward aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>

            <div className={styles.visual}>
                {project.image ? (
                    <img src={project.image} alt={project.title} style={{ objectPosition: project.imagePosition }} />
                ) : (
                    <>
                        <span className={styles.bigNo} aria-hidden="true">{no(i)}</span>
                        <span className={`mono ${styles.repo}`}>{profile.githubUser}/{project.repo}</span>
                    </>
                )}
            </div>
        </MotionArticle>
    )
}

function Projects() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

    return (
        <section id="projects" className={styles.projects}>
            <div className="sweep" aria-hidden="true" />
            <div className="wrap sec">
                <div className={`arrive ${styles.head}`}>
                    <h2 className="sectionTitle"><span className="sectionNo">02</span>Projects</h2>
                    <p className="note">Three I'd show you first · keep scrolling</p>
                </div>

                <div className={styles.stack} ref={ref}>
                    {projects.map((project, i) => (
                        <Card key={project.repo} project={project} i={i} total={projects.length} progress={scrollYProgress} />
                    ))}
                </div>

                <Reveal className={styles.more}>
                    <p className={styles.moreText}>There are {repos.length} public projects on my GitHub.</p>
                    <a href="#/projects" className="btn">
                        View all projects <MdArrowForward aria-hidden="true" />
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

export default Projects
