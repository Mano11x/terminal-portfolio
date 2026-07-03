# ============================================================================
# terminal_app/views.py
# ----------------------------------------------------------------------------
# One view, one job: render the terminal page and hand it Manoj's data.
# The data itself lives in data.py, so this file stays short and this is
# the only place you'd touch if you wanted the page to, say, read from a
# database or an API instead of a plain Python module later on.
# ============================================================================
from django.shortcuts import render
from .data import get_terminal_data


def terminal_home(request):
    context = {
        "terminal_data": get_terminal_data(),
    }
    return render(request, "terminal_app/index.html", context)
