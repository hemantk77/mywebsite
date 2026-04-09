import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from '../styles/About.module.css'

function About() {
    const ref = useREf(null)
    const inInView = useInView(ref, {once: true, margin: '-100px'})

    return (
        <section id='about' className={styles.about} ref={ref}>

            <motion.div
                className={styles.left}
                initial={{ opacity: 0, x: -40 }}
                animate={ isInView ? { opacity: 1, x: 0} : {}}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.imageWrapper}>
                    <div className={styles.imageWrapper}>
                        <span>Your Photo</span>
                    </div>
                    <div className={styles.imageBorder} />
                </div>
            </motion.div>

            <motion.div
                className={styles.right}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? {opacity: 1, X:0 } :{}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <p className={styles.sectionLabel}>// about me</p>
                <h2 className={styles.heading}>
                    I turn <span className={styles.accent}>ideas</span> into real <span ClassName={styles.accent}>products</span>
                </h2>
                <p className={styles.bio}>
                     I'm a full stack developer based in Berlin, passionate about
                    building things that live on the internet. I care deeply about
                    clean code, great UI and fast performance.
                </p>
                <p className={styles.bio}>
                    When I'm not coding, you'll find me exploring new tech,
                    contributing to open source, or just vibing with good music.
                </p>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>5+</span>
                        <span className={styles.statLabel}>Projects Built</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>2+</span>
                        <span className={styles.statLabel}>Years Coding</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>5+</span>
                        <span className={styles.statLabel}>Clients</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default About