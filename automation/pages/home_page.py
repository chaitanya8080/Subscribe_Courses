"""
home_page.py
------------
Page Object for the landing page ("/").
"""

import re
from .base_page import BasePage


class HomePage(BasePage):
    PATH = "/"

    def __init__(self, page):
        super().__init__(page)
        # Hero <h1> "Learn from the experts" — the headline that proves the
        # themed landing page rendered. Matched on a stable substring.
        self.hero_heading = page.get_by_role(
            "heading", name=re.compile("Learn from the", re.IGNORECASE)
        )
        # The orange marketing pill above the headline.
        self.badge = page.get_by_text("Premium courses at a reasonable price")
        # Primary CTA that routes to /courses.
        self.explore_button = page.get_by_role(
            "button", name=re.compile("Explore Now", re.IGNORECASE)
        )

    def open(self, path: str = PATH):
        return super().open(path)

    def click_explore(self):
        self.explore_button.click()
        return self
