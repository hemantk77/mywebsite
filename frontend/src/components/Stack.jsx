import { skills } from '../data/site'
import Reveal from './Reveal'
import styles from '../styles/Stack.module.css'

function Stack() {
    return (
        <section id="skills" className={styles.stack}>
            <div className="sweep" aria-hidden="true" />
            <div className={`wrap sec ${styles.inner}`}>
                <div className={`arrive ${styles.head}`}>
                    <h2 className="sectionTitle"><span className="sectionNo">05</span>Skills</h2>
                    <p className="note">The tools I reach for</p>
                </div>

                <Reveal>
                    <ul className={styles.cloud}>
                        {skills.map((skill) => {
                            const Icon = skill.Icon
                            return (
                                <li key={skill.name} className={styles.chip}>
                                    <span className={`${styles.tile} ${skill.big ? styles.big : ''}`}>
                                        <Icon aria-hidden="true" style={{ color: skill.color }} />
                                    </span>
                                    <span className={`mono ${styles.label}`}>{skill.name}</span>
                                </li>
                            )
                        })}
                    </ul>
                </Reveal>
            </div>
        </section>
    )
}

export default Stack
