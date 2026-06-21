"""
test_courses.py — Course catalogue page.

User story: "As a visitor, I can open the catalogue, search, and filter by
category."
"""

import allure
import pytest
from playwright.sync_api import expect


@allure.feature("Courses")
class TestCourses:
    @pytest.mark.smoke
    @allure.story("Catalogue renders")
    @allure.title("Courses page loads with title and search box")
    def test_courses_page_loads(self, courses_page):
        courses_page.open()
        expect(courses_page.heading).to_be_visible()
        expect(courses_page.search_input).to_be_visible()

    @pytest.mark.regression
    @allure.story("Search")
    @allure.title("Typing in the search box keeps its value")
    def test_search_input_accepts_text(self, courses_page):
        courses_page.open()
        courses_page.search("python")
        # The controlled input should reflect what we typed.
        expect(courses_page.search_input).to_have_value("python")

    @pytest.mark.regression
    @pytest.mark.navigation
    @allure.story("Category filter")
    @allure.title("Selecting a category keeps the catalogue usable")
    def test_select_category(self, courses_page):
        courses_page.open()
        courses_page.select_category("Yoga")
        # After filtering, the page must still be the catalogue (no crash/blank).
        expect(courses_page.heading).to_be_visible()
