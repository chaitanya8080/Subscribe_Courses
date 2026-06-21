"""
test_navigation.py — Global navigation drawer + theme toggle.

User story: "As a visitor, I can use the menu to move around the app and switch
between light and dark themes."
"""

import re
import allure
import pytest
from playwright.sync_api import expect


@allure.feature("Navigation")
class TestNavigation:
    @pytest.mark.smoke
    @pytest.mark.navigation
    @allure.story("Drawer navigation")
    @allure.title("Menu drawer navigates to the Courses page")
    def test_navigate_to_courses(self, home_page, header, page):
        home_page.open()
        header.go_to("Browse All Courses")
        expect(page).to_have_url(re.compile(r"/courses$"))

    @pytest.mark.navigation
    @allure.story("Drawer navigation")
    @allure.title("Menu drawer navigates to the About page")
    def test_navigate_to_about(self, home_page, header, page):
        home_page.open()
        header.go_to("About")
        expect(page).to_have_url(re.compile(r"/about$"))
        expect(page.get_by_role("heading", name="About Us")).to_be_visible()

    @pytest.mark.smoke
    @allure.story("Theme")
    @allure.title("Dark-mode toggle switches the theme")
    def test_dark_mode_toggle(self, home_page, header):
        home_page.open()
        before = header.is_dark_mode()
        header.toggle_theme()
        after = header.is_dark_mode()
        # Toggling must flip the <html>.dark state.
        assert before != after, "Theme did not change after clicking the toggle"
