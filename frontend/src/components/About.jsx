import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, about } from '../data/site'
import portrait from '../assets/portrait.webp'
import Reveal from './Reveal'
import styles from '../styles/About.module.css'

const MotionImg = motion.img

function About() {
    const ref = useRef(null)

    // the portrait drifts slower than the page
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [40, -40])

    return (
        <section id="about" ref={ref}>
            <div className="sweep" aria-hidden="true" />
            <div className="wrap sec">
                <div className={styles.layout}>
                    <div className={styles.left}>
                        <h2 className="sectionTitle arrive"><span className="sectionNo">01</span>About</h2>
                        <MotionImg
                            src={portrait}
                            alt={`Portrait of ${profile.name}`}
                            className={styles.image}
                            style={{ y }}
                        />
                    </div>

                    <Reveal className={styles.right}>
                        <p className={styles.lead}>
                            I'm a software developer based in Berlin, building things that{' '}
                            <span className={styles.accent}>live on the internet.</span>
                        </p>
                        <p className={styles.bio}>
                            I care about clean code, good UI and fast performance, and I like exploring
                            new tech and contributing to open source.
                        </p>
                        <p className={styles.bio}>
                            Away from the keyboard I play football and chess, listen to rap, and
                            watch Formula 1.
                        </p>
                    </Reveal>
                </div>

                <ul className={styles.cards}>
                    {about.map((fact, i) => {
                        const Icon = fact.Icon
                        return (
                            <li key={fact.label}>
                                <Reveal delay={i * 0.1} className={styles.card}>
                                    <div className={styles.media}>
                                        {fact.image ? (
                                            <img src={fact.image} alt="" style={{ objectFit: fact.fit }} />
                                        ) : (
                                            <Icon aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className={styles.cardText}>
                                        <p className={`mono ${styles.label}`}>{fact.label}</p>
                                        <p className={styles.value}>{fact.value}</p>
                                    </div>
                                </Reveal>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default About
