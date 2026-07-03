# ============================================================================
# terminal_app/urls.py
# ----------------------------------------------------------------------------
# Routes for this app. Right now there's just one page, so this stays tiny —
# but keeping app-level urls.py separate from the project's config/urls.py
# is standard Django practice and makes it easy to add more routes later
# (e.g. a real /api/contact/ endpoint for the contact form).
# ============================================================================
from django.urls import path
from . import views

app_name = "terminal_app"

urlpatterns = [
    path("", views.terminal_home, name="home"),
]
