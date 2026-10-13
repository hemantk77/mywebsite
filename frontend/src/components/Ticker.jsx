import { ticker } from '../data/site'
import styles from '../styles/Ticker.module.css'

function Ticker() {
    // the list is repeated so the loop has no visible seam
    const run = (key) => (
        <span key={key}>
            {ticker.map((word) => (
                <span key={word}>{word} <span className={styles.slash}>/</span> </span>
            ))}
        </span>
    )

    return (
        <div className={styles.band} aria-hidden="true">
            <div className={styles.track}>{[0, 1, 2, 3].map(run)}</div>
        </div>
    )
}

export default Ticker
