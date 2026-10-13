import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MdArrowDownward } from 'react-icons/md'
import { profile } from '../data/site'
import { scrollToSection } from '../utils/scrollToSection'
import styles from '../styles/Hero.module.css'

const MotionDiv = motion.div

const localTime = () =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timeZone })

function Hero() {
    const [time, setTime] = useState(localTime)
    const [first, last] = profile.name.split(' ')

    // the hero stays pinned and sinks back while the next section slides over it
    const { scrollY } = useScroll()
    const scale = useTransform(scrollY, [0, 700], [1, 0.9])
    const opacity = useTransform(scrollY, [0, 600], [1, 0.15])
    const y = useTransform(scrollY, [0, 700], [0, -60])

    useEffect(() => {
        const id = setInterval(() => setTime(localTime()), 30000)
        return () => clearInterval(id)
    }, [])

    // the accent dots follow the cursor
    const track = (e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }

    const letters = (word, offset) =>
        [...word].map((ch, i) => (
            <span key={i} className={styles.ch} style={{ animationDelay: `${offset + i * 0.04}s` }}>{ch}</span>
        ))

    return (
        <section id="top" className={styles.hero} onMouseMove={track}>
            <div className={styles.dots} aria-hidden="true" />
            <div className={styles.dotsAccent} aria-hidden="true" />

            <MotionDiv className={`wrap ${styles.inner}`} style={{ scale, opacity, y }}>
                <div className={`mono ${styles.meta} ${styles.fade}`}>
                    <span>{profile.role}</span>
                    <span>
                        <span className={styles.pulse} aria-hidden="true" />
                        {profile.openTo}
                    </span>
                    <span>{profile.location} · {time} local</span>
                </div>

                <h1 className={styles.name} aria-label={profile.name}>
                    <span className={styles.line} aria-hidden="true">{letters(first, 0)}</span>
                    <span className={styles.line} aria-hidden="true">
                        {letters(last, 0.26)}
                        <span className={`${styles.ch} ${styles.accent}`} style={{ animationDelay: '0.5s' }}>.</span>
                    </span>
                </h1>

                <div className={`${styles.bottom} ${styles.fade}`}>
                    <p className={styles.bio}>
                        I turn ideas into real products. Clean code, considered interfaces, and pages that load fast.
                    </p>
                    <div className={styles.buttons}>
                        <a href="#projects" className={`btn ${styles.cta}`} onClick={scrollToSection('projects')}>
                            View work <MdArrowDownward className={styles.down} aria-hidden="true" />
                        </a>
                        <a href="#contact" className={`ghost ${styles.cta}`} onClick={scrollToSection('contact')}>
                            Get in touch
                        </a>
                    </div>
                </div>
            </MotionDiv>
        </section>
    )
}

export default Hero
