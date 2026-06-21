"""
register_page.py
----------------
Page Object for the Register screen ("/register").

Note: registration was simplified to name + email + password only (the avatar
upload was removed), so this object intentionally has no file-upload step.
"""

from .base_page import BasePage


class RegisterPage(BasePage):
    PATH = "/register"

    def __init__(self, page):
        super().__init__(page)
        self.heading = page.get_by_role("heading", name="Create your account")
        # Three labelled fields.
        self.name_input = page.get_by_label("Name")
        self.email_input = page.get_by_label("Email Address")
        self.password_input = page.get_by_label("Password")
        # Scope to the <form>: the header drawer also has a "Sign Up" button,
        # so we must disambiguate to the form's submit button (strict mode).
        self.submit_button = page.locator("form").get_by_role("button", name="Sign Up")

    def open(self, path: str = PATH):
        return super().open(path)

    def register(self, name: str, email: str, password: str):
        """Complete the registration form and submit."""
        self.name_input.fill(name)
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_button.click()
        return self
