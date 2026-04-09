import { motion } from 'framer-motion'
import styles from '../styles/Hero.module.css'

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>

                <motion.p
                    className={styles.greeting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Hey there, I'm
                </motion.p>

                <motion.h1
                    className={styles.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                {/* Write your name here */}
                    Hemant
                </motion.h1>

                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <span className={styles.keyword}>const</span> role =
                    <span className={styles.string}> "Full Stack Developer"</span>
                </motion.h2>

                <motion.p
                    className={styles.bio}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    I build clean, fast and modern solutions.
                    Passionate about writing code that actually matters.
                </motion.p>

                <motion.div
                    className={styles.buttons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <a href="#projects" clasName={styles.btnPrimary}>View My Work</a>
                    <a href="#contact" className={styles.btnSecondary}>Get IN Touch</a>
                </motion.div>
            </div>
            <div className={styles.codeBlock}>
                <pre>
                    <code>
                        <span className={styles.keyword}>const </span>
                        <span className={styles.variable}>developer</span>
                        <span> = </span>
                        <span>{"{"}</span>
                        {"\n"}
                        <span>{"  "}</span>
                        <span className={styles.teal}>name</span>
                        <span>: </span>
                        {/* Write your name here */}
                        <span className={styles.string}>"Hemant Kumar"</span>
                        {",\n"}
                        <span>{"  "}</span>
                        <span className={styles.teal}>role</span>
                        <span>: </span>
                        {/* Write your role here */}
                        <span className={styles.string}>"Full Stack Developer"</span>
                        {",\n"}
                        <span>{"  "}</span>
                        <span className={styles.teal}>location</span>
                        <span>: </span>
                        {/* Write your city here */}
                        <span className={styles.string}>"Berlin"</span>
                        {",\n"}
                        <span>{"  "}</span>
                        <span className={styles.teal}>available</span>
                        <span>: </span>
                        <span className={styles.keyword}>true</span>
                        {"\n"}
                        <span>{"}"}</span>
                    </code>
                </pre>
            </div>
        </section>
    )
}

export default Hero