# Social Media Scheduler (Frontend)

A landing page, login page and dashboard for a social media scheduling app.
Dashboard data is saved in the browser (localStorage), so no backend is needed yet.
Built with React, TypeScript, Vite and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```
## What I built

- The whole dashboard (layout, routing, the 4 pages, shared state, localStorage saving)
- Simplified the project setup: removed unused files and packages and merged the TypeScript config
- Refactored the login form into a reusable component
- GitHub Pages deployment (base path, router basename, 404 fallback, workflow)


## Project structure and why each part exists

| File / folder | Why it exists |
| --- | --- |
| `index.html` | The single HTML page; React renders into `<div id="root">`. |
| `src/main.tsx` | Starts React and turns on routing (`BrowserRouter`). |
| `src/App.tsx` | Maps URLs to pages: `/` is Home, `/login` is Login. |
| `src/pages/Home.tsx` | Puts the landing sections together in order. |
| `src/pages/Login.tsx` | Sign in / sign up form with a reusable `Field` input. |
| `src/pages/dashboard/DashboardLayout.tsx` | Sidebar + shared state (posts, accounts) for all dashboard pages. |
| `src/pages/dashboard/Overview.tsx` | Stats, upcoming posts and posts-per-platform chart. |
| `src/pages/dashboard/CreatePost.tsx` | Write a post, pick platforms, schedule it or post now, with live preview and character limits. |
| `src/pages/dashboard/Posts.tsx` | List, filter, mark as published and delete posts. |
| `src/pages/dashboard/Accounts.tsx` | Connect / disconnect platforms (demo toggle, no real login). |
| `src/hooks/useLocalStorage.ts` | Like `useState`, but saves to the browser so data survives refresh. |
| `src/hooks/useDashboard.ts` | Gives dashboard pages access to the shared data. |
| `src/lib/*`, `src/types.ts` | Platform info, date helpers, starter data and TypeScript types. |
| `src/components/Home/*` | One file per landing section (Hero, Features, Pricing...), so each is easy to edit. |
| `src/index.css` | Loads Tailwind and the two fonts (Outfit, Urbanist). |
| `vite.config.ts` | Turns on the React and Tailwind plugins. |
| `tsconfig.json` | TypeScript rules (one file is enough for this project). |
| `eslint.config.js` | Catches common mistakes when you run `npm run lint`. |

## Packages used

- `react`, `react-dom`: the UI library
- `react-router-dom`: moving between pages
- `tailwindcss`, `@tailwindcss/vite`: styling
- `lucide-react`: icons
