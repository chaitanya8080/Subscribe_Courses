"""
test_auth.py — Registration & login (end-to-end through the real backend).

User stories:
- "As a new user, I can create an account and land in my profile."
- "As a user, wrong credentials are rejected and I stay on the login page."
"""

import re
import uuid
import allure
import pytest
from playwright.sync_api import expect


def _unique_email() -> str:
    # A fresh email every run => the register flow works on any DB (no clashes
    # with an already-existing user, which the backend would reject).
    return f"e2e_{uuid.uuid4().hex[:10]}@example.com"


@allure.feature("Authentication")
class TestAuth:
    @pytest.mark.smoke
    @pytest.mark.auth
    @allure.story("Registration")
    @allure.title("A new user can register and is taken to their profile")
    def test_register_logs_user_in(self, register_page, page):
        register_page.open()
        register_page.register("E2E User", _unique_email(), "test123456")
        # On success the app sets the auth cookie and redirects to /profile.
        # Registration no longer uploads an image, so this is fast — but we still
        # allow generous time for the API round-trip.
        expect(page).to_have_url(re.compile(r"/profile$"), timeout=15000)

    @pytest.mark.smoke
    @pytest.mark.auth
    @allure.story("Login")
    @allure.title("Login page renders its form")
    def test_login_page_renders(self, login_page):
        login_page.open()
        expect(login_page.heading).to_be_visible()
        expect(login_page.email_input).to_be_visible()
        expect(login_page.password_input).to_be_visible()

    @pytest.mark.auth
    @allure.story("Login")
    @allure.title("Invalid credentials keep the user on the login page")
    def test_invalid_credentials_rejected(self, login_page, page):
        login_page.open()
        login_page.login("nobody_{}@example.com".format(uuid.uuid4().hex[:6]), "wrongpass")
        # The login endpoint returns 401; the app shows a toast and does NOT
        # navigate away from /login.
        page.wait_for_timeout(2000)  # give the failed request time to resolve
        expect(page).to_have_url(re.compile(r"/login$"))
