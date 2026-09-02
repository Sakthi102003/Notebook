# Sakthi Murugan | Digital Notebook Portfolio

A sleek single-page developer portfolio with a notebook-inspired interface, a dark/light theme toggle, and a cyberpunk-style personal brand. The experience blends portfolio content, project showcases, social links, GitHub activity insights, and a live Medium-style intelligence stream into one cohesive landing page.

![Status](https://img.shields.io/badge/STATUS-LIVE-3F6C5D?style=for-the-badge&logo=vercel&logoColor=white)
![Build](https://img.shields.io/badge/BUILD-VITE-E2A33D?style=for-the-badge&logo=vite&logoColor=white)
![Type Safety](https://img.shields.io/badge/TYPESCRIPT-STRICT-2C4C41?style=for-the-badge&logo=typescript&logoColor=white)

---

## Highlights

- Notebook/futuristic portfolio aesthetic with warm accent styling
- Dark and light mode support with theme-aware avatar switching
- Hover-activated WakaTime panel on the avatar
- GitHub contribution heatmap section
- Medium-style Intel stream / blog feed section
- Real-time visitor counter integration
- Contact form and social channel links
- Responsive layout for desktop and mobile views

---

## Current experience

### Theme system
- Uses a theme provider to toggle between dark and light modes
- The main avatar swaps between red and blue depending on the active theme
- UI styling is consistent while keeping the design language intact

### Profile features
- Hero section with intro, CTA buttons, and social icons
- WakaTime stats preview displayed in a compact hover popup
- GitHub heatmap for coding activity visibility
- Selected projects and writing sections
- Contact area with direct links and form
- Visitor counter to surface traffic metrics

### Interactive panels
- Intel stream for recent Medium updates
- WakaTime panel activated from the VS Code badge on the avatar
- Visitor count added near the end of the page

---

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Firebase Realtime Database

---

## Project structure

```bash
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── features/
│   │   ├── ThemeProvider.tsx
│   │   ├── WakatimeStats.tsx
│   │   ├── VisitorCounter.tsx
│   │   ├── GithubHeatmap.tsx
│   │   └── LatestCommit.tsx
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
│   ├── navigation.ts
│   ├── projects.ts
│   └── techStack.ts
├── pages/
│   ├── Home.tsx
│   ├── AllProjectsPage.tsx
│   └── CorporateDashboard.tsx
├── services/
│   ├── firebase.ts
│   └── openai.ts
└── utils/
```

---

## Local setup

### 1. Clone the repo

```bash
git clone https://github.com/Sakthi102003/Repo-name.git
cd Repo-Name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Start the app

```bash
npm run dev
```

Then open:

```bash
http://localhost:5173
```

---

## Notes

- The WakaTime panel uses the public WakaTime share URL and is designed as a compact hover detail.
- The visitor counter depends on Firebase for live counting and falls back gracefully when unavailable.
- The portfolio is intentionally styled with a journal-like, tech-forward look rather than a conventional corporate template.

---

<div align="center">
  <p>Designed and built by <b>Sakthi Murugan</b></p>
  <p><i>Notebook — code, craft, and curiosity.</i></p>

  [Email](mailto:sakthimurugan102003@gmail.com) • [LinkedIn](https://www.linkedin.com/in/sakthimurugan-s/) • [GitHub](https://github.com/Sakthi102003)
</div>
