"""
base_page.py
------------
The parent class for every Page Object.

WHY a BasePage:
- Every page needs the same plumbing: the Playwright `page` handle, the site's
  base URL, and helpers to navigate / wait. Putting that here avoids repeating it
  in every page class (DRY) and gives all pages one consistent way to behave.
"""

import os


class BasePage:
    # BASE_URL is read from the environment (set in conftest from .env / CI),
    # defaulting to the local React dev server. This lets the SAME tests run
    # against localhost, staging, or a CI-hosted build without code changes.
    BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")

    def __init__(self, page):
        # `page` is Playwright's browser-tab object; every action goes through it.
        self.page = page

    # -- Navigation ----------------------------------------------------------
    def open(self, path: str = "/"):
        """Go to a route on the app (e.g. '/login'). Waits for the DOM to be
        ready so the next action doesn't race the page load."""
        self.page.goto(f"{self.BASE_URL}{path}", wait_until="domcontentloaded")
        return self

    def title(self) -> str:
        """Browser tab title — handy for a basic 'did the app load' assertion."""
        return self.page.title()

    def current_path(self) -> str:
        """The path part of the current URL (e.g. '/profile'). Used to assert
        that navigation/redirects landed where we expect."""
        return self.page.url.replace(self.BASE_URL, "") or "/"
