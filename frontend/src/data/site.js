import {
    SiPython, SiJavascript, SiCplusplus, SiC, SiOpenjdk, SiHtml5, SiCss,
    SiReact, SiVite, SiTailwindcss, SiChakraui, SiThreedotjs, SiFramer,
    SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiPostgresql, SiFirebase, SiScikitlearn,
    SiGit, SiGithub, SiVercel, SiNetlify, SiRailway, SiRender,
} from 'react-icons/si'
import { MdWorkOutline, MdLocationCity, MdRocketLaunch, MdSchool } from 'react-icons/md'
import bizowlLogo from '../assets/bizowl-logo.png'
import axentraLogo from '../assets/axentra-logo.webp'
import berlin from '../assets/berlin.jpg'
import aerospace from '../assets/aerospace.webp'
import ueCampus from '../assets/ue-campus.webp'
import dunraven from '../assets/dunraven.jpg'
import onside from '../assets/onside.jpg'
import chess from '../assets/chess.png'
import spacecraft from '../assets/spacecraft.jpg'

// Everything in [brackets] is a placeholder — fill these in once and the whole site updates.
// Images: drop the file in src/assets, import it at the top of this file, and set it on `image` / `logo`.

export const profile = {
    name: 'Hemant Kumar',
    role: 'Software developer',
    location: 'Berlin, Germany',
    timeZone: 'Europe/Berlin',
    openTo: 'Open to Werkstudent roles in Berlin',
    githubUser: 'hemantk77',
    github: 'https://github.com/hemantk77',
    linkedin: 'https://www.linkedin.com/in/hemant-kumar7',
    hackerrank: 'https://www.hackerrank.com/profile/hemant11uk',
    resume: '',                      // e.g. '/resume.pdf' (put the file in /public)
    email: 'hemant11uni@gmail.com',
}

// The four cards in the About section. `fit` is 'contain' for logos and 'cover' for photos.
export const about = [
    { label: 'Currently', value: 'Full Stack Developer at BizOwl', Icon: MdWorkOutline, image: bizowlLogo, fit: 'contain' },
    { label: 'Looking for', value: 'Werkstudent roles in Berlin', Icon: MdLocationCity, image: berlin, fit: 'cover' },
    { label: 'Focus', value: 'Aiming to build software for the aerospace sector', Icon: MdRocketLaunch, image: aerospace, fit: 'cover' },
    { label: 'Education', value: 'BSc Software Engineering @ UE Potsdam (graduating Aug 2027)', Icon: MdSchool, image: ueCampus, fit: 'cover' },
]

// The three featured projects. `repo` links to github.com/<githubUser>/<repo>.
export const projects = [
    {
        title: 'OnSide',
        repo: 'onside-tracker',
        summary: 'A gamified personal finance app for students: track income, expenses and subscriptions, and level up based on real spending behaviour.',
        points: ['Token-based authentication', 'Interactive charts with light and dark mode', 'Frontend on Vercel, backend on Render'],
        stack: ['React', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL'],
        live: 'https://onside-tracker.vercel.app',
        image: onside,
        imagePosition: 'left top',   // which part of the screenshot stays visible when cropped
    },
    {
        title: 'Chess Game',
        repo: 'Chess-Game',
        summary: 'A two-player chess game for the desktop, built as a team of three with Python and Pygame.',
        points: ['Drag-and-drop piece movement', 'Legal move validation', 'Move highlighting and game reset'],
        stack: ['Python', 'Pygame'],
        live: '',
        image: chess,
    },
    {
        title: 'Antriks',
        repo: 'antriks',
        summary: 'A platform for upcoming rocket launches and spacecraft. It started as a static HTML, CSS and JavaScript site, then I rebuilt it on Django.',
        points: ['Live launch data from the Space Devs API', 'Spacecraft information pages', 'Re-architected from static pages to Django'],
        stack: ['Python', 'Django', 'JavaScript'],
        live: '',
        image: spacecraft,           // stand-in until there is a real screenshot
    },
]

// Forks are hidden on the all-projects page unless they are listed here.
export const showForks = ['Chess-Game']

// One-liners for repos that have no description on GitHub (shown on the all-projects page).
export const repoNotes = {
    'Chess-Game': 'Two-player chess built with Python and Pygame, as a team of three.',
    'internship-tracker': 'Full-stack tracker for job and internship applications: React, FastAPI and PostgreSQL.',
    'onside-tracker': 'Gamified personal finance app for students: React, Django REST Framework and PostgreSQL.',
    'OnSide_Tracker': 'Earlier version of the OnSide finance app.',
    'osi_visualizer_Hemant': 'Simulates and visualises data moving through all seven OSI layers.',
    'Parallel-Heat-equation': 'Parallel heat-equation solver using finite differences and OpenMP, compared with a serial version.',
    'Heart-Attack-Prediction-with-Logistic-Regression': 'Logistic regression classifier trained and evaluated on clinical risk-factor data.',
    'mywebsite': 'This portfolio site.',
}

export const experience = [
    {
        role: 'Full Stack Developer',
        type: 'Working student / intern',
        company: 'BizOwl',
        period: 'Apr 2026 — Present',
        place: 'Remote',
        logo: bizowlLogo,
        points: [
            'Integrated Razorpay live payments end to end on the production platform, and added a ledger write so every transaction is stored and auditable.',
            'Built a soft sign-up system with the Firebase Admin SDK that provisions users server-side, without a full registration flow.',
            'Replaced hard-coded booking forms with config-driven ones that render per programme from a single data hook.',
            'Work across four Firebase projects, a Node and Express backend on Railway, and React frontends on Netlify.',
            'Maintain the internal admin dashboard and wrote its architecture reference for new contributors.',
        ],
    },
    {
        role: 'Backend Developer Intern',
        type: 'Internship',
        company: 'Axentra OS',
        period: 'Nov 2025 — Feb 2026',
        place: 'Remote',
        logo: axentraLogo,
        points: [
            'Contributed backend features to a production Shopify application supporting core business workflows.',
            'Built and maintained services and REST APIs in Python (FastAPI) with PostgreSQL.',
        ],
    },
]

export const education = [
    {
        school: 'University of Europe for Applied Sciences, Potsdam',
        degree: 'BSc Software Engineering',
        period: 'Mar 2024 — Aug 2027',
        note: 'Current GPA: 84.23',
        detail: 'Coursework: Frontend & Backend Development, Big Data & Analytics, Machine Learning & AI, Agile Development.',
        image: ueCampus,
    },
    {
        school: 'The Dunraven School, London',
        degree: 'GCE A-Levels',
        period: 'Sep 2021 — Aug 2023',
        note: 'Grades: ABB',
        detail: 'Physics, Mathematics and Further Mathematics. UKMT Senior Mathematics Challenge Gold in 2022 and 2023.',
        image: dunraven,
    },
]

// `big` makes the tile larger. `color` is the logo's brand colour; logos without one are black.
export const skills = [
    { name: 'Python', color: '#3776AB', Icon: SiPython, big: true },
    { name: 'JavaScript', color: '#F7DF1E', Icon: SiJavascript, big: true },
    { name: 'React', color: '#61DAFB', Icon: SiReact, big: true },
    { name: 'Node.js', color: '#5FA04E', Icon: SiNodedotjs },
    { name: 'Express', Icon: SiExpress },
    { name: 'Django', color: '#092E20', Icon: SiDjango },
    { name: 'FastAPI', color: '#009688', Icon: SiFastapi },
    { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql, big: true },
    { name: 'Firebase', color: '#DD2C00', Icon: SiFirebase },
    { name: 'C++', color: '#00599C', Icon: SiCplusplus },
    { name: 'C', color: '#A8B9CC', Icon: SiC },
    { name: 'Java', color: '#E76F00', Icon: SiOpenjdk },
    { name: 'HTML', color: '#E34F26', Icon: SiHtml5 },
    { name: 'CSS', color: '#663399', Icon: SiCss },
    { name: 'Tailwind CSS', color: '#06B6D4', Icon: SiTailwindcss },
    { name: 'Chakra UI', color: '#1BB2A9', Icon: SiChakraui },
    { name: 'Vite', color: '#646CFF', Icon: SiVite },
    { name: 'Three.js', Icon: SiThreedotjs },
    { name: 'Framer Motion', color: '#0055FF', Icon: SiFramer },
    { name: 'scikit-learn', color: '#F7931E', Icon: SiScikitlearn },
    { name: 'Git', color: '#F05032', Icon: SiGit, big: true },
    { name: 'GitHub', Icon: SiGithub },
    { name: 'Vercel', Icon: SiVercel },
    { name: 'Netlify', color: '#00C7B7', Icon: SiNetlify },
    { name: 'Railway', Icon: SiRailway },
    { name: 'Render', Icon: SiRender },
]

export const ticker = ['Frontend', 'Backend', 'APIs', 'Databases', 'Deployment']
