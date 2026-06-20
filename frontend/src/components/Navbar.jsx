import { useState, useEffect } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import styles from '../styles/Navbar.module.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
    }

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} `}>
            <div className={styles.logo}>
                <span>HK</span>
            </div>
            <ul className={styles.navLinks}>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button className={styles.themeToggle} onClick={toggleTheme}>
                {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20}/>}
            </button>
        </nav>
    )
}

export default Navbar

