import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { experience } from '../data/site'
import Reveal from './Reveal'
import styles from '../styles/Experience.module.css'

const MotionDiv = motion.div

function Experience() {
    const ref = useRef(null)

    // the accent line draws itself down the timeline as you scroll
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

    return (
        <section id="experience" className={styles.experience}>
            <div className="sweep" aria-hidden="true" />
            <div className={`wrap sec ${styles.layout}`}>
                <div className={`arrive ${styles.head}`}>
                    <h2 className="sectionTitle"><span className="sectionNo">03</span>Experience</h2>
                    <p className="note">Where I've worked</p>
                </div>

                <ol className={styles.timeline} ref={ref}>
                    <MotionDiv className={styles.fill} style={{ scaleY: scrollYProgress }} aria-hidden="true" />
                    {experience.map((job, i) => (
                        <li key={job.company} className={styles.job}>
                            <Reveal delay={i * 0.1}>
                                <div className={styles.top}>
                                    <div className={styles.logo}>
                                        {job.logo ? (
                                            <img src={job.logo} alt={`${job.company} logo`} />
                                        ) : (
                                            <span aria-hidden="true">{job.company[0]}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className={`mono ${styles.period}`}>{job.period} · {job.place}</p>
                                        <h3 className={styles.role}>{job.role}</h3>
                                        <p className={styles.company}>{job.company} <span className={styles.type}>· {job.type}</span></p>
                                    </div>
                                </div>
                                <ul className={styles.points}>
                                    {job.points.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default Experience
