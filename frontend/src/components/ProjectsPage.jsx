import { useEffect, useState } from 'react'
import { MdArrowBack, MdArrowOutward } from 'react-icons/md'
import { profile, repoNotes, showForks } from '../data/site'
import snapshot from '../data/repos.json'
import styles from '../styles/ProjectsPage.module.css'

const API = `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`

const updated = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

function ProjectsPage() {
    // starts from the saved snapshot, then refreshes from GitHub if it can
    const [repos, setRepos] = useState(snapshot)
    const [live, setLive] = useState(false)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        window.scrollTo(0, 0)
        const controller = new AbortController()

        fetch(API, { signal: controller.signal })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((data) => {
                setRepos(data.filter((repo) => (!repo.fork || showForks.includes(repo.name)) && repo.name !== profile.githubUser))
                setLive(true)
            })
            .catch(() => { /* keep the snapshot */ })

        return () => controller.abort()
    }, [])

    const languages = ['All', ...new Set(repos.map((repo) => repo.language).filter(Boolean))]
    const shown = filter === 'All' ? repos : repos.filter((repo) => repo.language === filter)

    return (
        <main className={`wrap ${styles.page}`}>
            <a href="#projects" className={`mono ${styles.back}`}>
                <MdArrowBack aria-hidden="true" /> Back to home
            </a>

            <div className={styles.head}>
                <h1 className={styles.title}>All projects<span className={styles.accent}>.</span></h1>
                <p className="note">
                    {shown.length} of {repos.length} · {live ? 'live from GitHub' : 'saved copy'}
                </p>
            </div>

            <div className={styles.filters} role="group" aria-label="Filter by language">
                {languages.map((language) => (
                    <button
                        key={language}
                        className={`mono ${styles.filter} ${language === filter ? styles.filterActive : ''}`}
                        onClick={() => setFilter(language)}
                        aria-pressed={language === filter}
                    >
                        {language}
                    </button>
                ))}
            </div>

            <ul className={styles.list}>
                {shown.map((repo, i) => (
                    <li key={repo.name} style={{ animationDelay: `${Math.min(i, 12) * 0.04}s` }}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.row}>
                            <span className={styles.text}>
                                <span className={styles.name}>{repo.name.replace(/[-_]/g, ' ')}</span>
                                <span className={styles.desc}>{repo.description || repoNotes[repo.name] || ''}</span>
                            </span>
                            <span className={`mono ${styles.meta}`}>{repo.language || '—'}</span>
                            <span className={`mono ${styles.meta} ${styles.date}`}>{updated(repo.pushed_at)}</span>
                            <MdArrowOutward className={styles.arrow} size={20} aria-hidden="true" />
                        </a>
                    </li>
                ))}
            </ul>

            <a href={profile.github} target="_blank" rel="noreferrer" className={`ghost ${styles.github}`}>
                See everything on GitHub <MdArrowOutward aria-hidden="true" />
            </a>
        </main>
    )
}

export default ProjectsPage
