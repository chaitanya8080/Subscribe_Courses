"""
courses_page.py
---------------
Page Object for the course catalogue ("/courses").
"""

import re
from .base_page import BasePage


class CoursesPage(BasePage):
    PATH = "/courses"

    def __init__(self, page):
        super().__init__(page)
        self.heading = page.get_by_role("heading", name="All Courses")
        # The pill search box (matched by its placeholder).
        self.search_input = page.get_by_placeholder(re.compile("Search a course", re.IGNORECASE))
        # Empty-state text shown when the catalogue/search returns nothing.
        self.empty_state = page.get_by_text("No courses found")

    def open(self, path: str = PATH):
        return super().open(path)

    def search(self, term: str):
        """Type into the live search box (results filter as you type)."""
        self.search_input.fill(term)
        return self

    def select_category(self, name: str):
        """Click a category filter chip by its visible text, e.g. 'Yoga'."""
        self.page.get_by_role("button", name=name, exact=True).click()
        return self

    def course_card_count(self) -> int:
        """How many course cards are currently shown — used to assert that the
        grid rendered (>0) or that an empty search shows none."""
        # Course cards expose a "Watch Now" button; counting them counts cards.
        return self.page.get_by_role("button", name="Watch Now").count()
