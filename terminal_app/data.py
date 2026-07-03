# ============================================================================
# terminal_app/data.py
# ----------------------------------------------------------------------------
# The single source of truth for everything shown in the terminal. This is
# now real Python/Django data (not hand-duplicated JavaScript) — edit it here
# and it flows into the page through the view + template automatically.
#
# ANY field left as "" prints an honest "not added yet" message in the
# terminal instead of a guess (see the linkedin/resume fields below).
# ============================================================================

# Verified 5x7-bitmap ASCII banner for "MANOJ" — every row is exactly the
# same character length, so it can never render lopsided in the terminal.
BANNER = (
    "█   █   ███   █   █   ███       █  \n"
    "██ ██  █   █  ██  █  █   █      █  \n"
    "█ █ █  █   █  █ █ █  █   █      █  \n"
    "█   █  █████  █  ██  █   █      █  \n"
    "█   █  █   █  █   █  █   █  █   █  \n"
    "█   █  █   █  █   █  █   █  █   █  \n"
    "█   █  █   █  █   █   ███    ███   "
)

PROFILE = {
    "name": "Manoj S",
    "title": "Aspiring Cloud Engineer · Python & Django Developer",
    "location": "Chennai, Tamil Nadu, India",
    "email": "manomaghi6@gmail.com",
    "phone": "+91 91506 94370",
    "github": "https://github.com/Mano11x",
    "linkedin": "",  # EDIT ME: add your LinkedIn URL
    "resume": "",    # EDIT ME: add a link to your resume PDF
}

ABOUT = [
    "I'm Manoj — a developer based in Chennai, building my way from a",
    "B.Com background into cloud engineering. I learn by building real",
    "things, not just tutorials — right now that means Python, Django,",
    "and a self-hosted AI assistant of my own called JARVIS.",
    "",
    "I get genuinely absorbed in what I'm building — obsessed enough that",
    "I once stepped out of the bath mid-shower because I'd figured out",
    "a bug fix and needed to write it down before I lost it.",
]

EDUCATION = [
    {"school": "University of Madras", "detail": "B.Com", "years": "2021 – 2024"},
    {"school": "UNIQ Technologies", "detail": "Python Full-Stack Development", "years": "2021 – 2024"},
]

SKILLS = [
    {"name": "Python", "status": "active"},
    {"name": "Django", "status": "active"},
    {"name": "HTML & CSS", "status": "active"},
    {"name": "MySQL", "status": "active"},
    {"name": "Git & GitHub", "status": "active"},
    {"name": "Communication", "status": "active"},
    {"name": "Data Structures & Algorithms (LeetCode)", "status": "learning"},
    {"name": "AWS (EC2, S3, Lambda)", "status": "learning"},
]

PROJECTS = [
    {
        "slug": "jarvis",
        "name": "JARVIS",
        "oneLiner": "A self-hosted personal AI assistant with local LLM, voice, and a live neural visualization UI.",
        "stack": ["Django", "Ollama (llama3.2:1b)", "Three.js", "SQLite", "Text-to-Speech"],
        "status": "In development",
        "github": "https://github.com/Mano11x/JARVIS",
        "live": "",  # EDIT ME: add a live URL if/when it's deployed
    },
    {
        "slug": "resume-scanner",
        "name": "Resume Scanner",
        "oneLiner": "Scans a resume, scores it out of 10 against ATS + skill criteria, and recommends exactly what to fix.",
        "stack": ["Python"],
        "status": "In development",
        "github": "",  # EDIT ME: add the specific repo link once it's up
        "live": "",
    },
    {
        "slug": "blog-platform",
        "name": "Blog Platform",
        "oneLiner": "A full-stack blog application built end-to-end in Python.",
        "stack": ["Python", "Django"],
        "status": "In development",
        "github": "",
        "live": "",
    },
]


def get_terminal_data():
    """
    Bundles everything above into one dict. The view passes this straight
    to the template, which drops it into the page as JSON — the frontend
    JS terminal engine reads it from there instead of hardcoding anything.
    """
    return {
        "profile": PROFILE,
        "about": ABOUT,
        "education": EDUCATION,
        "skills": SKILLS,
        "projects": PROJECTS,
        "banner": BANNER,
    }
