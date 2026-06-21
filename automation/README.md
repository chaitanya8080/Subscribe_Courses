# Subscribe Courses — E2E Test Automation

End-to-end UI tests for the Course Bundler app, built with **Python + pytest +
Playwright**, organised with the **Page Object Model (POM)**, and reported via
**Allure**. Runs locally and in CI (GitHub Actions **and** Jenkins).

---

## Why this stack

| Tool | Role | Why it was chosen |
|------|------|-------------------|
| **pytest** | Test runner | Fixtures, markers, clean assertions |
| **Playwright** | Browser driver | Auto-waiting → low flakiness; multi-browser |
| **pytest-playwright** | Integration | Ready `page`/`browser` fixtures, CLI flags |
| **Page Object Model** | Design pattern | Locators live in one class per page → UI changes touch one file, tests stay readable |
| **Allure** | Reporting | Step-by-step report, screenshots on failure, history/trends |

---

## Structure

```
automation/
├── pages/                 # Page Object Model — one class per screen/component
│   ├── base_page.py       #   shared plumbing (navigation, base URL)
│   ├── header.py          #   nav drawer + dark-mode toggle (on every page)
│   ├── home_page.py
│   ├── login_page.py
│   ├── register_page.py
│   └── courses_page.py
├── tests/                 # test scenarios (user stories)
│   ├── test_home.py
│   ├── test_navigation.py
│   ├── test_courses.py
│   └── test_auth.py
├── conftest.py            # fixtures: page objects + screenshot-on-failure → Allure
├── pytest.ini             # markers + default options (Allure dir, browser)
├── requirements.txt       # pinned deps (commented with the "why")
├── .env.example           # BASE_URL template
└── README.md
```

---

## Prerequisites

- **Python 3.10+** (tested on 3.13)
- The **app must be running** (the tests drive the real UI/API):
  - frontend → http://localhost:3000
  - backend  → http://localhost:4000
  - MongoDB  → mongodb://127.0.0.1:27017
- **Java 8+** *only if you want to view the Allure HTML report locally* (the
  Allure CLI is Java-based). Not needed to run the tests.

---

## Setup

```bash
cd automation

# 1) Create an isolated virtual environment (keeps deps off your global Python)
python -m venv .venv

# 2) Install the Python dependencies
.venv/Scripts/python -m pip install -r requirements.txt      # Windows
# source .venv/bin/activate && pip install -r requirements.txt   # macOS/Linux

# 3) Download the browser Playwright drives
.venv/Scripts/python -m playwright install chromium

# 4) (optional) point tests at a different URL
cp .env.example .env      # then edit BASE_URL
```

> **Note:** if your network does TLS inspection and the Playwright browser
> download fails with a certificate error, prefix the install with
> `NODE_TLS_REJECT_UNAUTHORIZED=0`.

---

## Running the tests

```bash
# everything
.venv/Scripts/python -m pytest

# only the smoke set (the build gate)
.venv/Scripts/python -m pytest -m smoke

# a single file / a marker combo
.venv/Scripts/python -m pytest tests/test_auth.py
.venv/Scripts/python -m pytest -m "auth or navigation"

# watch it in a real browser window
.venv/Scripts/python -m pytest --headed

# run in parallel (faster)
.venv/Scripts/python -m pytest -n auto
```

Allure result files are written to `allure-results/` on every run (configured in
`pytest.ini`).

### Markers (agile categorisation)

| Marker | Meaning |
|--------|---------|
| `smoke` | Critical-path checks that gate every build |
| `regression` | Broader functional checks |
| `auth` | Login / registration |
| `navigation` | Routing / menu / drawer |

---

## Viewing the Allure report

Tests produce raw results in `allure-results/`. To turn them into the HTML
dashboard you need the **Allure CLI** (requires Java):

```bash
# install the CLI once (e.g. scoop install allure  /  npm i -g allure-commandline)
allure serve allure-results      # opens the report in your browser
# or generate a static site:
allure generate allure-results -o allure-report --clean
```

In **CI** this is automated — the workflow generates and publishes the report,
so you don't need Java locally.

---

## How the tests map to user stories (agile)

Each test is a small acceptance check for a user story, e.g.:

- *"As a visitor, I land on the home page and can start exploring."* → `test_home.py`
- *"As a visitor, I can navigate via the menu and switch themes."* → `test_navigation.py`
- *"As a new user, I can register and reach my profile."* → `test_auth.py`
- *"As a visitor, I can browse and search the catalogue."* → `test_courses.py`

Smoke tests are the **Definition-of-Done gate**: CI runs them on every push/PR,
so a change can't merge if a critical path breaks.

---

## CI/CD

- **GitHub Actions:** `.github/workflows/e2e-tests.yml` — boots MongoDB + backend
  + frontend, runs the suite, and publishes the Allure report on every push/PR.
- **Jenkins:** `Jenkinsfile` (repo root) — the same pipeline for a Jenkins server,
  with an Allure report stage.
