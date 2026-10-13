import { useState, useEffect } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { scrollToSection } from '../utils/scrollToSection'
import styles from '../styles/Navbar.module.css'

const LINKS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
]

// `onHome` is false on the all-projects page, where links navigate back instead of scrolling
function Navbar({ onHome = true }) {
    const [theme, setTheme] = useState(
        () => document.documentElement.getAttribute('data-theme') || 'light'
    )

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        try { localStorage.setItem('theme', next) } catch { /* private mode */ }
    }

    const go = (id) => (onHome ? scrollToSection(id) : undefined)

    return (
        <header className={styles.header}>
            <nav className={`wrap ${styles.navbar}`} aria-label="Primary">
                <a href="#top" className={`mono ${styles.logo}`} onClick={go('top')}>
                    HK<span className={styles.dot}>.</span>
                </a>
                <ul className={styles.navLinks}>
                    {LINKS.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`} onClick={go(link.id)}>{link.label}</a>
                        </li>
                    ))}
                </ul>
                <button
                    className={`mono ${styles.themeToggle}`}
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
                    <span className={styles.toggleText}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </button>
            </nav>
        </header>
    )
}

export default Navbar
