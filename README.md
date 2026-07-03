# Manoj — Terminal Portfolio (Django)

The same interactive macOS-Terminal-style portfolio as before, now rebuilt
as a proper Django project instead of a single static HTML file.

## What changed vs. the static version

| Before (static)              | Now (Django)                                      |
|-------------------------------|----------------------------------------------------|
| One `index.html` with inline `<style>`/`<script>` | Separate `templates/`, `static/css/`, `static/js/` |
| Data hardcoded in JS          | Data lives in Python (`terminal_app/data.py`)       |
| No backend                    | Real Django app — easy to extend later (e.g. a real contact-form endpoint, an admin panel to edit content without touching code) |

## Project structure

```
portfolio_django/
├── manage.py
├── requirements.txt
├── config/                  # Django project settings
│   ├── settings.py
│   └── urls.py
└── terminal_app/            # The actual portfolio app
    ├── data.py              # <-- EDIT YOUR CONTENT HERE
    ├── views.py
    ├── urls.py
    ├── templates/terminal_app/index.html
    └── static/terminal_app/
        ├── css/style.css
        └── js/terminal.js
```

## Run it locally

```powershell
# from inside the portfolio_django folder
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Then open **http://127.0.0.1:8000/** — same terminal, same commands
(`help`, `about`, `projects`, `contact`, `neofetch`, `sudo make coffee`...).

## Editing your content

Everything real about you — name, email, education, skills, projects — is
in **`terminal_app/data.py`**. Change it there; the template and JS pick it
up automatically. Nothing else needs to change for normal content edits.

## Important: this needs a real host, not GitHub Pages

GitHub Pages only serves static files (plain HTML/CSS/JS) — it can't run
Python, so this Django version **will not work there**. Free options that
do run Django:

- **Render** (render.com) — free tier, connects directly to a GitHub repo
- **Railway** (railway.app)
- **PythonAnywhere** — free tier, popular for first Django deployments

Before deploying, remember to:
1. Set `DEBUG = False` in `config/settings.py`
2. Add your real domain to `ALLOWED_HOSTS`
3. Run `python manage.py collectstatic`
4. Set `SECRET_KEY` from an environment variable instead of the hardcoded
   value currently in `settings.py` (fine for local dev, not for production)
