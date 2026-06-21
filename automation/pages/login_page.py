"""
login_page.py
-------------
Page Object for the Login screen ("/login").
"""

import re
from .base_page import BasePage


class LoginPage(BasePage):
    PATH = "/login"

    def __init__(self, page):
        super().__init__(page)
        # "Welcome back" heading confirms we're on the login card.
        self.heading = page.get_by_role("heading", name="Welcome back")
        # Fields are matched by their <label> text (accessible + stable).
        self.email_input = page.get_by_label("Email Address")
        self.password_input = page.get_by_label("Password")
        # Submit button + the link to the register page.
        self.submit_button = page.get_by_role("button", name="Sign In")
        self.create_account_link = page.get_by_role(
            "link", name=re.compile("Create an account", re.IGNORECASE)
        )

    def open(self, path: str = PATH):
        return super().open(path)

    def login(self, email: str, password: str):
        """Fill credentials and submit — the core user action of this page."""
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_button.click()
        return self
