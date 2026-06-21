
"""
header.py
---------
Page Object for the global Header / slide-out navigation drawer.

WHY a separate component:
- The header is rendered on EVERY page, so its locators/actions belong in one
  reusable object instead of being copy-pasted into each page class.
- We locate elements the way a USER perceives them (role + accessible name +
  visible text) instead of CSS classes. That keeps tests passing even when the
  styling changes (and we just retheme-d the whole app to purple/orange).
"""

import re
from .base_page import BasePage


class Header(BasePage):
    def __init__(self, page):
        super().__init__(page)
        # The floating circular button that opens the drawer (aria-label set in JSX).
        self.menu_button = page.get_by_role("button", name="Open menu")
        # The close (X) button inside the drawer.
        self.close_button = page.get_by_role("button", name="Close menu")
        # The light/dark toggle — its aria-label is "Switch to dark/light mode",
        # so we match on the stable "Switch to" prefix.
        self.theme_toggle = page.get_by_role(
            "button", name=re.compile("Switch to", re.IGNORECASE)
        )

    # -- Drawer open/close ---------------------------------------------------
    def open_menu(self):
        """Open the navigation drawer (no-op-safe: only clicks if button shown)."""
        self.menu_button.click()
        return self

    # -- Navigation ----------------------------------------------------------
    def go_to(self, link_text: str):
        """Open the drawer and click a nav link by its visible text, e.g.
        'Browse All Courses'. Returns self for chaining."""
        self.open_menu()
        self.page.get_by_role("link", name=link_text, exact=True).click()
        return self

    def go_to_login(self):
        self.open_menu()
        self.page.get_by_role("button", name="Login", exact=True).click()
        return self

    def go_to_signup(self):
        self.open_menu()
        self.page.get_by_role("button", name="Sign Up", exact=True).click()
        return self

    # -- Dark mode -----------------------------------------------------------
    def toggle_theme(self):
        """Flip light/dark mode via the floating toggle."""
        self.theme_toggle.click()
        return self

    def is_dark_mode(self) -> bool:
        """True when the <html> element has the `dark` class — that's how the app
        switches Tailwind's dark variant, so it's the source of truth."""
        return self.page.evaluate(
            "() => document.documentElement.classList.contains('dark')"
        )
