import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import styles from '../styles/HKLanding.module.scss'

const COLORS = [0xff7a18, 0x66e0ff, 0x9b7bff, 0x4ec9b0, 0xff5d8f, 0xf4d35e, 0xffffff]
const TABS = ['Bio', 'Skills', 'Interests', 'Contact']
const DEFAULT_HINT = 'drag to orbit · scroll / pinch to zoom in'

function HKLanding() {
    const mountRef = useRef(null)
    const apiRef = useRef(null)

    const [theme, setTheme] = useState('dark')
    const [activeColor, setActiveColor] = useState(COLORS[0])
    const [menuOpen, setMenuOpen] = useState(false)
    const [hint, setHint] = useState(DEFAULT_HINT)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300)

        const THEMES = {
            dark:  { bg: 0x0b0e17, amb: 0x405066, grid: 0x1f6f8b, gridC: 0x2aa0c4, dust: 0x6fa8c7 },
            light: { bg: 0xf4efe6, amb: 0xfff2e0, grid: 0xcdbfae, gridC: 0xb5a48f, dust: 0xb08968 },
        }
        let currentTheme = 'dark'

        // lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.5)
        const hemi = new THREE.HemisphereLight(0xffffff, 0x202030, 0.45)
        const keyL = new THREE.DirectionalLight(0xffffff, 1.2)
        keyL.position.set(8, 18, 12)
        keyL.castShadow = true
        keyL.shadow.mapSize.set(1024, 1024)
        keyL.shadow.camera.left = -14; keyL.shadow.camera.right = 14
        keyL.shadow.camera.top = 14; keyL.shadow.camera.bottom = -14
        const rim = new THREE.PointLight(0x66e0ff, 0.7, 80)
        rim.position.set(-12, 6, -10)
        scene.add(ambient, hemi, keyL, rim)

        // floor + grid
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.3 }))
        floor.rotation.x = -Math.PI / 2
        floor.receiveShadow = true
        scene.add(floor)
        let grid = new THREE.GridHelper(200, 100)
        scene.add(grid)

        // ---------- voxel / pixel HK ----------
        const Hbits = ['1...1', '1...1', '1...1', '11111', '1...1', '1...1', '1...1']
        const Kbits = ['1...1', '1..1.', '1.1..', '11...', '1.1..', '1..1.', '1...1']
        const cellsFor = (bm, off) => {
            const o = []
            for (let r = 0; r < bm.length; r++)
                for (let c = 0; c < bm[r].length; c++)
                    if (bm[r][c] === '1') o.push({ x: c + off, y: 6 - r })
            return o
        }
        const cells = [...cellsFor(Hbits, 0), ...cellsFor(Kbits, 6)]
        const xCenter = (11 - 1) / 2
        const figH = 7

        const cube = new THREE.BoxGeometry(0.9, 0.9, 0.9)
        const hkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 })
        const hk = new THREE.InstancedMesh(cube, hkMat, cells.length)
        hk.castShadow = true; hk.receiveShadow = true
        const _m = new THREE.Matrix4()
        cells.forEach((cell, i) => hk.setMatrixAt(i, _m.makeTranslation(cell.x - xCenter, cell.y + 0.5, 0)))
        hk.instanceMatrix.needsUpdate = true
        scene.add(hk)

        const _tmp = new THREE.Color(), _hsl = {}
        const setVoxelColor = (hex) => {
            new THREE.Color(hex).getHSL(_hsl)
            cells.forEach((cell, i) => {
                _tmp.setHSL(_hsl.h, _hsl.s, Math.min(0.95, _hsl.l * (0.78 + (cell.y / 6) * 0.22)))
                hk.setColorAt(i, _tmp)
            })
            hk.instanceColor.needsUpdate = true
        }
        setVoxelColor(COLORS[0])

        // ---------- lively background ----------
        const N = 450, posArr = new Float32Array(N * 3)
        for (let i = 0; i < N; i++) {
            posArr[i * 3] = (Math.random() - 0.5) * 70
            posArr[i * 3 + 1] = Math.random() * 40
            posArr[i * 3 + 2] = (Math.random() - 0.5) * 70
        }
        const dustGeo = new THREE.BufferGeometry()
        dustGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
        const dustMat = new THREE.PointsMaterial({ size: 0.18, color: THEMES.dark.dust, transparent: true, opacity: 0.55, sizeAttenuation: true })
        const dust = new THREE.Points(dustGeo, dustMat)
        scene.add(dust)

        const orbiters = []
        const oGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55)
        const oMat = new THREE.MeshStandardMaterial({ color: 0x66e0ff, emissive: 0x1d6f8b, emissiveIntensity: 0.6, roughness: 0.4 })
        for (let i = 0; i < 7; i++) {
            const c = new THREE.Mesh(oGeo, oMat)
            c.castShadow = true
            c.userData = { r: 8 + Math.random() * 8, sp: (0.2 + Math.random() * 0.4) * (Math.random() < 0.5 ? -1 : 1),
                           ph: Math.random() * Math.PI * 2, yB: 1 + Math.random() * 8, yA: 1 + Math.random() * 2, ys: 0.3 + Math.random() }
            scene.add(c); orbiters.push(c)
        }

        // ---------- camera orbit ----------
        const home = new THREE.Vector3(0, figH * 0.5, 0)
        const target = home.clone()
        let theta = 0, phi = 1.2, radius = 30
        const R_MIN = 11, R_MAX = 34, PHI_MIN = 0.5, PHI_MAX = 1.46
        let autoRotate = true, zoomT = 0, jsMenuOpen = false

        const applyCamera = () => {
            const sp = Math.sin(phi), cp = Math.cos(phi)
            camera.position.set(target.x + radius * sp * Math.sin(theta), target.y + radius * cp, target.z + radius * sp * Math.cos(theta))
            camera.lookAt(target)
        }

        const applyTheme = () => {
            const t = THEMES[currentTheme]
            scene.background = new THREE.Color(t.bg)
            scene.fog = new THREE.Fog(t.bg, 28, 80)
            ambient.color.setHex(t.amb)
            dustMat.color.setHex(t.dust)
            scene.remove(grid); grid.geometry.dispose(); grid.material.dispose()
            grid = new THREE.GridHelper(200, 100, t.gridC, t.grid)
            grid.material.transparent = true
            grid.material.opacity = currentTheme === 'dark' ? 0.4 : 0.55
            scene.add(grid)
        }
        applyTheme()

        // ---------- interaction ----------
        const dom = renderer.domElement
        let dragging = false, lastX = 0, lastY = 0, pinch = 0
        const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hitPt = new THREE.Vector3()

        const pointerToGround = (px, py) => {
            const r = dom.getBoundingClientRect()
            ndc.x = ((px - r.left) / r.width) * 2 - 1
            ndc.y = -((py - r.top) / r.height) * 2 + 1
            ray.setFromCamera(ndc, camera)
            plane.constant = -target.y
            return ray.ray.intersectPlane(plane, hitPt) ? hitPt.clone() : null
        }
        const clampTarget = () => {
            target.x = Math.max(-7, Math.min(7, target.x))
            target.z = Math.max(-7, Math.min(7, target.z))
        }
        const zoom = (delta, px, py) => {
            autoRotate = false
            const zoomingIn = delta < 0
            const p = px != null ? pointerToGround(px, py) : null
            radius = Math.max(R_MIN, Math.min(R_MAX, radius + delta))
            if (zoomingIn && p) { target.x += (p.x - target.x) * 0.25; target.z += (p.z - target.z) * 0.25 }
            else if (!zoomingIn) { target.x += (home.x - target.x) * 0.18; target.z += (home.z - target.z) * 0.18 }
            clampTarget()
        }

        const onMouseDown = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; autoRotate = false }
        const onMouseMove = (e) => {
            if (!dragging) return
            theta -= (e.clientX - lastX) * 0.006
            phi = Math.max(PHI_MIN, Math.min(PHI_MAX, phi - (e.clientY - lastY) * 0.006))
            lastX = e.clientX; lastY = e.clientY
        }
        const onMouseUp = () => { dragging = false }
        const onWheel = (e) => { e.preventDefault(); zoom(e.deltaY * 0.025, e.clientX, e.clientY) }
        const onTouchStart = (e) => {
            if (e.touches.length === 1) { dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; autoRotate = false }
            else if (e.touches.length === 2) pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
        }
        const onTouchMove = (e) => {
            if (e.touches.length === 1 && dragging) {
                theta -= (e.touches[0].clientX - lastX) * 0.006
                phi = Math.max(PHI_MIN, Math.min(PHI_MAX, phi - (e.touches[0].clientY - lastY) * 0.006))
                lastX = e.touches[0].clientX; lastY = e.touches[0].clientY
            } else if (e.touches.length === 2) {
                const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
                const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2, my = (e.touches[0].clientY + e.touches[1].clientY) / 2
                zoom((pinch - d) * 0.05, mx, my); pinch = d
            }
        }
        const onTouchEnd = () => { dragging = false }

        dom.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        dom.addEventListener('wheel', onWheel, { passive: false })
        dom.addEventListener('touchstart', onTouchStart, { passive: true })
        dom.addEventListener('touchmove', onTouchMove, { passive: true })
        dom.addEventListener('touchend', onTouchEnd)

        // imperative handle used by the React UI
        apiRef.current = {
            setColor: (hex) => setVoxelColor(hex),
            zoomOut: () => { for (let i = 0; i < 14; i++) setTimeout(() => zoom(2, null, null), i * 16) },
            toggleTheme: () => { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; applyTheme(); setTheme(currentTheme) },
        }

        const resize = () => {
            const w = mount.clientWidth, h = mount.clientHeight
            renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', resize)
        resize()

        const clock = new THREE.Clock()
        let rafId
        const animate = () => {
            rafId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()
            zoomT = (R_MAX - radius) / (R_MAX - R_MIN)
            if (autoRotate && !jsMenuOpen) theta += 0.0035

            if (!jsMenuOpen && zoomT > 0.96) { jsMenuOpen = true; setMenuOpen(true) }
            if (jsMenuOpen && zoomT < 0.7) { jsMenuOpen = false; setMenuOpen(false) }

            dust.rotation.y = t * 0.02
            orbiters.forEach((c) => {
                const u = c.userData, a = u.ph + t * u.sp
                c.position.set(Math.cos(a) * u.r, u.yB + Math.sin(t * u.ys) * u.yA, Math.sin(a) * u.r)
                c.rotation.x = t * u.sp; c.rotation.y = t * u.sp * 1.3
            })

            applyCamera()
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(rafId)
            dom.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            dom.removeEventListener('wheel', onWheel)
            dom.removeEventListener('touchstart', onTouchStart)
            dom.removeEventListener('touchmove', onTouchMove)
            dom.removeEventListener('touchend', onTouchEnd)
            window.removeEventListener('resize', resize)
            renderer.dispose()
            cube.dispose(); hkMat.dispose(); oGeo.dispose(); oMat.dispose(); dustGeo.dispose(); dustMat.dispose()
            if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
        }
    }, [])

    const pickColor = (hex) => { apiRef.current?.setColor(hex); setActiveColor(hex) }
    const flashHint = (msg) => { setHint(msg); setTimeout(() => setHint(DEFAULT_HINT), 1600) }
    const toHex = (n) => '#' + n.toString(16).padStart(6, '0')

    return (
        <section className={`${styles.root} ${theme === 'light' ? styles.light : ''}`}>
            <div ref={mountRef} className={styles.canvasMount} />
            <div className={styles.crt} />

            <div className={styles.hud}>
                <div className={styles.title}>
                    HEMANT KUMAR<span className={styles.titleSub}>// portfolio · v0</span>
                </div>
                <button className={styles.toggle} onClick={() => apiRef.current?.toggleTheme()}>
                    {theme === 'dark' ? '☾ DARK' : '☀ LIGHT'}
                </button>

                <div className={styles.palette} style={{ opacity: menuOpen ? 0 : 1 }}>
                    <span className={styles.paletteLabel}>pick a colour</span>
                    {COLORS.map((hex) => (
                        <button
                            key={hex}
                            className={`${styles.swatch} ${activeColor === hex ? styles.swatchActive : ''}`}
                            style={{ background: toHex(hex) }}
                            onClick={() => pickColor(hex)}
                            aria-label={`colour ${toHex(hex)}`}
                        />
                    ))}
                </div>

                <div className={styles.hint} style={{ opacity: menuOpen ? 0 : 1 }}>{hint}</div>

                <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.menuLabel}>where to?</div>
                    {TABS.map((tab) => (
                        <button key={tab} onClick={() => flashHint('→ ' + tab + ' (page coming next)')}>{tab}</button>
                    ))}
                    <button className={styles.menuClose} onClick={() => apiRef.current?.zoomOut()}>↩ zoom back out</button>
                </div>
            </div>
        </section>
    )
}

export default HKLanding