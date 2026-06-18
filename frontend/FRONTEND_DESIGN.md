# Course Bundler — Frontend Design Document

A React + Redux course-subscription platform, styled with **inline Tailwind CSS**.
The design language is adapted from the **Zoobers Job-Finder UI Kit**: a vibrant
**purple primary**, a warm **orange accent**, a **light-lavender** app background,
clean **white rounded cards**, soft shadows, and full **light/dark** support.

---

## ⚠️ Known Issue (read first)

The Tailwind utility classes are **currently not rendering** in the browser — the
app paints as mostly-unstyled HTML. The raw CSS in `src/index.css` (lavender body
background, scrollbar) loads fine, but the `@tailwind base/components/utilities`
output is not being generated/injected by the build.

- **Cause:** Tailwind's PostCSS plugin is not running through the CRA → CRACO
  pipeline (so no utility CSS is emitted), even though the class names exist in the
  compiled JS.
- **Effect:** Every visual change (Chakra → Tailwind migration, redesign, and the
  purple/orange theme) is present in the code but invisible on screen.
- **Fix:** correct the CRACO / PostCSS wiring (`craco.config.js`,
  `postcss.config.js`, `tailwind.config.js` content paths) so utilities compile.
  Once fixed, every screen below renders as intended.

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `primary` (purple) | `#6d5dfc` (500), 50–900 scale | Buttons, logos, links, focus rings, active nav |
| `accent` (orange) | `#fb7318` (500), 50–700 scale | Selected states, highlights, badges |
| App background | `#f4f3fb` lavender (light) / `#030712` (dark) | Page canvas |
| Surfaces | white / `gray-900` (dark) | Cards, modals, drawers |
| Status | green (success/online), red (delete/fail) | Feedback |
| Radii | `rounded-xl / 2xl / 3xl` | Cards, inputs, buttons |
| Elevation | `shadow-sm → 2xl`, colored `shadow-primary-500/20` | Depth, glow on CTAs |
| Typography | bold tracking-tight headings, `gray-500` subtext | Hierarchy |

- **Dark mode:** class-based (`dark` on `<html>`), toggled by the floating
  sun/moon button (top-right), persisted to `localStorage('color-mode')`.
- **Responsiveness:** mobile-first; `sm:` / `lg:` breakpoints turn stacked layouts
  into rows/grids; `max-w-*` containers; off-canvas drawer on mobile.

---

## Global Layout

### Header / Drawer — `components/Layout/Header/Header.jsx`
- Floating circular **purple menu button** (top-left) opens a left **slide-out
  drawer** with a blurred overlay (plain React state — no UI library).
- Drawer: brand logo (`C` purple-gradient tile + "Course**Bundler**"), icon-led
  nav links (Home, Courses, Request, Contact, About), and a footer that swaps
  between **Login / Sign Up** (guest) and **Profile / Logout** + **Admin
  Dashboard** (authenticated/admin).
- Top-right floating **dark-mode toggle**.

### Footer — `components/Layout/Footer/Footer.jsx`
- Dark bar: brand mark + "All Rights Reserved" + credit; circular social icons
  (YouTube, Instagram, GitHub) that fill on hover.

### Loader — `components/Layout/Loader/Loader.jsx`
- Centered **dual-ring spinner** (outer purple, inner orange, counter-rotating).

### NotFound (404) — `components/Layout/NotFound/NotFound.jsx`
- Centered card: warning icon tile, giant `404`, purple "Go to Home" button.

---

## Public Pages

### Home — `components/Home/Home.jsx`
- **Hero:** blurred background color blobs, an **orange pill badge**, large
  headline with a purple→orange gradient word ("experts"), subtext, two CTAs
  (**Explore Now** solid purple, **View Plans** outline), and a 3-stat row
  (Lectures / Students / Rating); animated floating logo on the right.
- **Brands strip:** "Trusted by" grayscale brand icons → orange on hover.
- **Featured video:** framed, rounded, shadowed.
- Hero stacks on mobile, splits left/right on `lg`.

### Courses — `components/Courses/Courses.jsx`
- Title + subtitle, a **pill search bar** with leading icon.
- **Category chips** — active chip is solid **orange** (mirrors the kit's selected
  "Specialization" tile); inactive are outline pills.
- **Responsive course grid** (1 → 2 → 3 cols) of cards: poster + views badge,
  clamped title/description, creator, lecture count, **Watch Now** (purple) +
  add-to-playlist icon button. Empty state when no results.

### CoursePage — `components/CoursePage/CoursePage.jsx`
- Two-pane (`lg`): large **framed video player** + lecture title/description, and a
  **lecture playlist sidebar** with the active lecture highlighted purple. Non-
  subscribers are redirected to `/subscribe`.

### About — `components/About/About.jsx`
- Founder card (gradient avatar tile + bio), a lavender/orange CTA band, framed
  intro video, a scrollable **Terms & Conditions** card, "secured by Razorpay" line.

### Contact / Request — `components/Contact`, `components/Request`
- Centered **white form cards** with icon-prefixed inputs + textarea, purple submit,
  and a cross-link (Contact ↔ Request ↔ Courses).

### Subscribe — `components/Payments/Subscribe.jsx`
- **Pricing card**: purple gradient header with crown + big **₹399**, a
  green-checked **perk list**, full-width **Buy Now**, fine print.

### Payment Status — `Payments/PaymentSuccess.jsx`, `Payments/PaymentFail.jsx`
- Result cards: colored gradient header (green success / red fail), icon, message,
  follow-up button (Go to Profile / Try Again).

---

## Auth Pages — `components/Auth/*`

All four are **centered cards** (`max-w-md`) with a logo, title + subtitle,
icon-prefixed inputs, and a purple gradient submit.

| Page | Contents |
|------|----------|
| `Login.jsx` | Email + password (icon inputs), "Forgot password?", **Sign In**, link to Register |
| `Register.jsx` | Name + email + password, **Sign Up**, link to Login (image upload removed) |
| `ForgetPassword.jsx` | Email field, **Send Reset Link**, back-to-login link |
| `ResetPassword.jsx` | New-password field, **Reset Password** (→ login on success) |

---

## Profile Pages — `components/Profile/*`

### Profile — `Profile.jsx`
- **Two-column** (`lg`): an **avatar card** (ringed avatar + green online dot, name,
  role, **Change Photo**) and a **details card** with icon info-rows (Name, Email,
  Joined On, Subscription) + **Update Profile** / **Change Password**.
- **Playlist grid** (2 → 3 → 4 cols) of poster cards with **Watch** + delete.
- **Change-Photo modal:** blurred backdrop, avatar preview, styled file input,
  purple **Change**.

### UpdateProfile / ChangePassword
- Centered white form cards, icon inputs, purple submit.

---

## Admin Section — `components/Admin/*`

A **dashboard shell**: left **sticky Sidebar** + content `main`
(`lg:grid-cols-[16rem_1fr]`), purple/violet emphasis.

| Page / Component | Design |
|------------------|--------|
| `Sidebar.jsx` | "Admin Panel" mark + vertical nav (Dashboard, Create Course, Courses, Users); active route = filled purple gradient pill; horizontal scroll on mobile |
| `Dashboard/Dashboard.jsx` | **Stat cards** (Views/Users/Subscriptions) with icon tiles + green/red trend pills; **line chart** + **doughnut** panels; gradient **progress bars** |
| `Users/Users.jsx` | Card-wrapped **table**: id, name, email, **role badge**, **status dot**, Change Role / Delete |
| `Courses/AdminCourses.jsx` | Card-wrapped **table**: poster thumb, title, category pill, creator, views, lectures; Lectures / Delete |
| `Courses/CourseModel.jsx` | Full-screen **lecture manager**: sticky header, lecture cards (delete), **Add Lecture** form (title, description, file, preview, Upload) |
| `CreateCourse/CreateCourse.jsx` | Form card: title, description, creator, **category select**, image upload with **live preview**, purple **Create Course** |
| `Dashboard/Chart.js` | chart.js Line + Doughnut config (logic untouched, panels restyled) |

---

## Tech Notes

- **Stack:** React 18 (CRA + CRACO), Redux Toolkit, React Router v6,
  react-hot-toast, chart.js. UI fully migrated **off Chakra UI** to inline Tailwind.
- **Styling:** `tailwind.config.js` defines `primary` + `accent`; `src/index.css`
  holds the `@tailwind` directives, lavender body, and scrollbar.
- **Dark mode:** `darkMode: 'class'`, synced via `ColorModeSwitcher`.
- **Run:** `npm start` (CRACO dev server, port 3000). Backend API at
  `http://localhost:4000/api/v1`.
