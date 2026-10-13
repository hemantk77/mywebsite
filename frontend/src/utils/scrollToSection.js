// Smooth-scrolls to a section and replays its arrival animation (see .sweep in global.css)
export function scrollToSection(id) {
    return (e) => {
        const el = document.getElementById(id)
        if (!el) return
        e.preventDefault()

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const behavior = reduced ? 'auto' : 'smooth'

        // the hero is pinned, so "top" means the very start of the page
        if (id === 'top') {
            window.scrollTo({ top: 0, behavior })
            history.replaceState(null, '', window.location.pathname)
            return
        }

        el.scrollIntoView({ behavior, block: 'start' })
        history.replaceState(null, '', `#${id}`)

        el.removeAttribute('data-arrived')
        void el.offsetWidth // restart the animation
        el.setAttribute('data-arrived', '')
    }
}
