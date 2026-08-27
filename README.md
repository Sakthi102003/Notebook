# 🌅 SAKTHI MURUGAN // PORTFOLIO

> "The same room, lit differently — morning to midnight."

A personal developer portfolio built around one idea: **light, not identity, should change with the hour.** Instead of forcing visitors to pick between two unrelated looks, the entire palette flows continuously across a time-of-day gradient — morning, midday, golden hour, evening, and night each carry their own mood, while layout, typography, and structure stay exactly the same.

![Status](https://img.shields.io/badge/STATUS-LIVE-3F6C5D?style=for-the-badge&logo=vercel&logoColor=white)
![Build](https://img.shields.io/badge/BUILD-VITE-E2A33D?style=for-the-badge&logo=vite&logoColor=white)
![Type Safety](https://img.shields.io/badge/TYPESCRIPT-STRICT-2C4C41?style=for-the-badge&logo=typescript&logoColor=white)

---

## ⚡ Core Systems

### 🕰️ **Time-Aware Theme Engine**
- **Continuous day cycle**: Background and accent colors interpolate smoothly across five anchor moods — morning, midday, golden hour, evening, night — based on the visitor's local time. No hard-coded presets, no jarring snaps between states.
- **One identity, not two**: Layout, shapes, and typography never change — only color temperature and brightness shift, so the site always reads as the same design at any hour.
- **Smooth transitions**: Every color shift crossfades over 300–500ms, and gracefully falls back to an instant swap for visitors with `prefers-reduced-motion` enabled.

### 👋 **Multilingual Greeting Loader**
- The loading screen cycles through *"Hello"* in over a dozen languages and scripts — Tamil, Hindi, Japanese, Korean, Arabic, and more — before smoothly revealing the page.
- Font fallbacks ensure every script renders cleanly, with the sequence closing back on English right before reveal for a natural handoff into the site.

### 🎛️ **Interactive Modules**
- **Live Writing Feed**: Pulls real-time articles from Medium via an RSS-to-JSON proxy.
- **Project Showcase**: Each project presented as a case-study card with tech stack chips and live/source links.
- **Visitor Insights**: Lightweight real-time visitor tracking with graceful fallback if the backend is unreachable.

---

## 🎨 Design System

| Layer | Choice |
|---|---|
| **Display font** | Fraunces — warm serif for headings & hero |
| **Body font** | Inter — clean sans for readable text |
| **Accent font** | IBM Plex Mono — tags & small labels |
| **Color model** | Continuous time-of-day interpolation via CSS custom properties |
| **Motion** | Smooth crossfades, scroll reveals, reduced-motion aware |

---

## 🛠️ Technical Stack

| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | React 19 + TypeScript | High-performance component architecture |
| **System** | Vite | Lightning-fast build tool |
| **Design** | Tailwind CSS | Utility-first styling with custom theme tokens |
| **Motion** | Framer Motion | Transitions, scroll reveals, and sequences |
| **Icons** | Lucide React | High-fidelity vector system icons |
| **Data** | Firebase Realtime DB | Live visitor traffic analysis |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sakthi102003/Stealth-Portfolio.git
cd Stealth-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Firebase Configuration (Visitor Counter)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Run Locally
```bash
npm run dev
```
Visit `http://localhost:5173`.

---

## 📂 Project Structure (`src/`)

```bash
src/
├── components/
│   ├── ThemeProvider/     # Time-of-day color interpolation
│   ├── LoadingScreen/     # Multilingual "Hello" sequence + reveal
│   ├── ProjectCard/       # Project showcase cards
│   └── ...
├── pages/
│   ├── Home.tsx           # Main landing page
│   └── ...
├── services/               # Firebase connection & fallback handling
└── index.css                # Theme tokens & CSS custom properties
```

---

## 🛡️ Reliability & Performance

- **Graceful degradation**: If Firebase is unreachable, the site falls back to read-only mode instead of breaking.
- **Type safety**: Strict TypeScript across all modules to prevent runtime errors.
- **Accessible by default**: Contrast checked across every point in the color cycle; motion respects user preferences.
- **Optimized assets**: Zero-bloat SVG icons and code-split bundles.

---

<div align="center">
  <p>Designed & built by <b>Sakthi Murugan</b></p>
  <p><i>"Same room, different light."</i></p>

  [Email](mailto:sakthimurugan102003@gmail.com) • [LinkedIn](https://www.linkedin.com/in/sakthimurugan-s/) • [GitHub](https://github.com/Sakthi102003)
</div>
