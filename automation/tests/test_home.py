"""
test_home.py — Landing page smoke checks.

User story: "As a visitor, I land on the home page and can start exploring."
"""

import re
import allure
import pytest
from playwright.sync_api import expect


@allure.feature("Home")
class TestHome:
    @pytest.mark.smoke
    @allure.story("Landing page renders")
    @allure.title("Home page shows the hero headline")
    def test_home_loads(self, home_page):
        home_page.open()
        # expect() auto-waits up to the default timeout for the element to appear.
        expect(home_page.hero_heading).to_be_visible()
        expect(home_page.explore_button).to_be_visible()

    @pytest.mark.smoke
    @allure.story("Primary CTA")
    @allure.title("'Explore Now' navigates to the courses catalogue")
    def test_explore_navigates_to_courses(self, home_page, page):
        home_page.open()
        home_page.click_explore()
        # The CTA links to /courses — assert the route changed.
        expect(page).to_have_url(re.compile(r"/courses$"))
