"""
conftest.py
-----------
pytest auto-discovers this file and applies its fixtures/hooks to every test.

What it does and WHY:
- Loads `.env` so BASE_URL (and future settings) are configurable per environment.
- Sets a consistent browser viewport so layout-dependent assertions are stable.
- Exposes ready-to-use Page Objects as fixtures (tests stay short & readable).
- On any test failure, grabs a screenshot and attaches it to the Allure report,
  so a red test comes with visual evidence instead of just a stack trace.
"""

import os
import pytest
import allure
from dotenv import load_dotenv

from pages.home_page import HomePage
from pages.login_page import LoginPage
from pages.register_page import RegisterPage
from pages.courses_page import CoursesPage
from pages.header import Header

# Load variables from automation/.env (if present) into the process environment.
load_dotenv()


# --- Browser configuration --------------------------------------------------
@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """Override pytest-playwright's default context: a fixed desktop viewport
    keeps responsive layouts deterministic across machines/CI."""
    return {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 900},
        "ignore_https_errors": True,  # tolerate the local TLS-interception quirk
    }


# --- Page Object fixtures ---------------------------------------------------
# Each returns a page object bound to the current Playwright `page`. Function
# scope => a fresh, isolated object per test (no state bleed between tests).
@pytest.fixture
def home_page(page):
    return HomePage(page)


@pytest.fixture
def login_page(page):
    return LoginPage(page)


@pytest.fixture
def register_page(page):
    return RegisterPage(page)


@pytest.fixture
def courses_page(page):
    return CoursesPage(page)


@pytest.fixture
def header(page):
    return Header(page)


# --- Screenshot-on-failure -> Allure ----------------------------------------
@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Runs after each test phase. If the 'call' phase failed and the test used
    a Playwright `page`, attach a PNG screenshot to the Allure result."""
    outcome = yield
    report = outcome.get_result()
    if report.when == "call" and report.failed:
        page = item.funcargs.get("page")
        if page is not None:
            try:
                allure.attach(
                    page.screenshot(full_page=True),
                    name="failure-screenshot",
                    attachment_type=allure.attachment_type.PNG,
                )
            except Exception:
                # Never let screenshot capture itself break the test report.
                pass
