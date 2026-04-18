# Supermarket Comparison Web App

A React + TypeScript + Vite web application for comparing supermarket offers across regions.
Original design: [Figma](https://www.figma.com/design/lf6jJSfRJjUmTpui3nMMbn/Supermarket-Comparison-Web-App)

---

## Project Structure

```
Supermarket_Comparison_Web_App/
├── .vscode/                        # VS Code workspace settings
│   ├── settings.json               # Editor & Tailwind config
│   ├── extensions.json             # Recommended extensions
│   └── launch.json                 # Chrome debug launcher
├── guidelines/
│   └── Guidelines.md               # Design/product guidelines
├── src/
│   ├── main.tsx                    # App entry point
│   ├── app/
│   │   ├── App.tsx                 # Root component (state + layout)
│   │   ├── components/
│   │   │   ├── Hero.tsx            # Landing hero section
│   │   │   ├── RegionSelector.tsx  # Region picker
│   │   │   ├── ProductSelector.tsx # Product multi-select
│   │   │   ├── ComparisonView.tsx  # Main results/comparison grid
│   │   │   ├── StoreCard.tsx       # Individual store offer card
│   │   │   ├── FloatingNav.tsx     # Sticky floating action bar
│   │   │   ├── Footer.tsx          # Page footer
│   │   │   ├── LoadingState.tsx    # Loading skeleton
│   │   │   ├── EmptyState.tsx      # Empty/no-results state
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx  # Figma asset image helper
│   │   │   └── ui/                 # shadcn/ui component library
│   │   │       └── *.tsx           # (accordion, button, card, etc.)
│   │   └── data/
│   │       └── mockData.ts         # Mock supermarket offer generator
│   └── styles/
│       ├── index.css               # Global styles + Tailwind imports
│       ├── tailwind.css            # Tailwind base layer
│       ├── theme.css               # CSS custom properties / design tokens
│       └── fonts.css               # Font face declarations
├── utils/
│   └── supabase/
│       └── info.tsx                # Supabase project info helper
├── supabase/
│   └── functions/server/
│       ├── index.tsx               # Supabase Edge Function entry
│       └── kv_store.tsx            # Key-value store utility
├── index.html                      # HTML shell
├── vite.config.ts                  # Vite + Tailwind + React config
├── postcss.config.mjs              # PostCSS config
├── tsconfig.json                   # TypeScript config (app)
├── tsconfig.node.json              # TypeScript config (Vite/Node)
├── package.json                    # Dependencies & scripts
├── .gitignore
├── README.md
└── ATTRIBUTIONS.md
```

---

## Getting Started in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node)
- [VS Code](https://code.visualstudio.com/)

### 1. Open in VS Code
```bash
code Supermarket_Comparison_Web_App
```
When prompted, install the **recommended extensions** (Tailwind CSS IntelliSense, ESLint, Prettier).

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Backend (optional) | Supabase Edge Functions |

---

## Notes

- The app uses **mock data** (`src/app/data/mockData.ts`) — no backend required to run locally.
- Supabase files under `supabase/` and `utils/supabase/` are optional and only needed if connecting to a live Supabase project.
- Path alias `@/` maps to the `src/` directory (configured in `vite.config.ts` and `tsconfig.json`).
