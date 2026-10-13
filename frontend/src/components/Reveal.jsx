import { motion } from 'framer-motion'

const MotionDiv = motion.div

// Fades and lifts its children into place the first time they scroll into view
function Reveal({ children, delay = 0, className }) {
    return (
        <MotionDiv
            className={className}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
        >
            {children}
        </MotionDiv>
    )
}

export default Reveal
