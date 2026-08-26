# 🌅 Sakthi Murugan — Portfolio

> One identity, changing light. A developer portfolio that shifts its color palette across the day — the same calm design at 9am and 9pm, just lit differently.

**Live:** [sakthimurugan.dev](https://sakthimurugan.dev)

---

## ✨ What this is

A personal portfolio built around a single idea: **the site should feel like the same room at a different hour**, not a different site depending on a toggle. Instead of switching between unrelated visual identities, the entire palette interpolates continuously across a time-of-day gradient — morning, midday, golden hour, evening, and night each get their own mood, but the layout, typography, and shapes never change.

- 🕰️ **Time-aware theming** — background and accent colors shift based on the visitor's local time, blended smoothly rather than snapped between presets
- 👋 **Multilingual greeting loader** — the loading screen cycles through "Hello" in over a dozen languages and scripts before revealing the page
- 🧩 **One consistent typographic voice** — a warm serif for headings, a clean sans for body text, and a monospace accent for tags — held constant across every theme state

---

## 🎨 Design system

| Layer | Choice |
|---|---|
| Display font | Fraunces (serif, headings & hero) |
| Body font | Inter (paragraphs & UI) |
| Accent font | IBM Plex Mono (tags, labels) |
| Color model | Continuous time-of-day interpolation via CSS custom properties |
| Motion | Smooth 300–500ms crossfades; respects `prefers-reduced-motion` |

Colors are never hardcoded per component — every surface reads from a small set of CSS variables that the theme engine updates, so the whole site re-tints itself in one pass.

---

## 🛠️ Tech stack

| Category | Technology | Purpose |
|---|---|---|
| **Core** | React 19 + TypeScript | Component architecture & type safety |
| **Build** | Vite | Fast dev server & bundling |
| **Styling** | Tailwind CSS | Utility-first styling, custom theme tokens |
| **Motion** | Framer Motion | Transitions & scroll reveals |
| **Icons** | Lucide React | Vector icon system |
| **Data** | Firebase Realtime Database | Live visitor count, graceful read-only fallback if unreachable |

---

## 🚀 Getting started

### 1. Clone the repository
```bash
git clone https://github.com/Sakthi102003/Stealth-Portfolio.git
cd Stealth-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the root:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Run locally
```bash
npm run dev
```
Visit `http://localhost:5173`.

---

## 📂 Project structure

```
src/
├── components/
│   ├── ThemeProvider/     # Time-of-day color interpolation
│   ├── LoadingScreen/     # Multilingual "Hello" sequence + reveal transition
│   ├── ProjectCard/       # Project showcase cards
│   └── ...
├── pages/
│   ├── Home.tsx
│   └── ...
├── services/              # Firebase connection & fallback handling
└── index.css              # Theme tokens & CSS custom properties
```

---

## 🛡️ Reliability

- **Graceful degradation** — if Firebase is unreachable, the site falls back to read-only mode instead of breaking
- **Type safety** — strict TypeScript across all modules
- **Accessible by default** — contrast checked across every point in the color cycle, motion respects user preferences

---

## 📬 Contact

Built by **Sakthi Murugan** — CS student specializing in Cloud Technology & Information Security.

[Email](mailto:sakthimurugan102003@gmail.com) • [LinkedIn](https://www.linkedin.com/in/sakthimurugan-s/) • [GitHub](https://github.com/Sakthi102003)
