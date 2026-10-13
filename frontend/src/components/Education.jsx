import { education } from '../data/site'
import Reveal from './Reveal'
import styles from '../styles/Education.module.css'

function Education() {
    return (
        <section id="education" className={styles.education}>
            <div className="sweep" aria-hidden="true" />
            <div className="wrap sec">
                <div className={`arrive ${styles.head}`}>
                    <h2 className="sectionTitle"><span className="sectionNo">04</span>Education</h2>
                    <p className="note">Where I've studied</p>
                </div>

                <div className={styles.grid}>
                    {education.map((item, i) => (
                        <Reveal key={item.school} delay={i * 0.15} className={styles.card}>
                            <div className={styles.photo}>
                                {item.image ? (
                                    <img src={item.image} alt={item.school} />
                                ) : (
                                    <span className="note">Photo of {item.school}</span>
                                )}
                            </div>
                            <div className={styles.text}>
                                <p className={`mono ${styles.period}`}>{item.period}</p>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                <p className={styles.school}>{item.school}</p>
                                <p className={`mono ${styles.grade}`}>{item.note}</p>
                                <p className={styles.detail}>{item.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Education
