import { MdArrowUpward, MdArrowOutward } from 'react-icons/md'
import { profile } from '../data/site'
import { scrollToSection } from '../utils/scrollToSection'
import Reveal from './Reveal'
import styles from '../styles/Contact.module.css'

function Contact() {
    const links = [
        { label: 'GitHub', href: profile.github },
        { label: 'LinkedIn', href: profile.linkedin },
        { label: 'HackerRank', href: profile.hackerrank },
        { label: 'Résumé (PDF)', href: profile.resume },
    ].filter((link) => link.href)

    return (
        <section id="contact" className={styles.contact}>
            <div className={`sweep ${styles.sweep}`} aria-hidden="true" />
            <div className={`wrap sec ${styles.inner}`}>
                <p className={`mono arrive ${styles.eyebrow}`}>06 — Contact</p>
                <h2 className={styles.heading}>
                    Let's build<br />something<span className={styles.accent}>.</span>
                </h2>
                <Reveal className={styles.bottom}>
                    <p className={styles.lead}>{profile.openTo}. Tell me what you're working on.</p>
                    <div className={styles.links}>
                        {links.map((link) => (
                            <a key={link.label} href={link.href} className={styles.link} target="_blank" rel="noreferrer">
                                {link.label} <MdArrowOutward aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </Reveal>
            </div>

            <footer className={`wrap mono ${styles.footer}`}>
                <span>{profile.name} · Berlin</span>
                <a href="#top" className={styles.top} onClick={scrollToSection('top')}>
                    Back to top <MdArrowUpward aria-hidden="true" />
                </a>
            </footer>
        </section>
    )
}

export default Contact
