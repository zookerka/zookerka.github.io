# zookerka.github.io

Personal site of Dmitrii, Software Engineer. Live at **[zookerka.github.io](https://zookerka.github.io)**.

A single-page card: about, stack, current research and selected projects, on a quiet dark theme
with a canvas background (drifting constellation, orbiting satellites, a slow scan sweep) and a
pointer-reactive dot grid.

## Stack

React 19, TypeScript, Vite. Plain CSS, no UI libraries. Inter and JetBrains Mono via Fontsource.
Deployed to GitHub Pages by a workflow on every push to `main`.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. `npm run build` outputs a static site to `dist/`.

## Editing content

All copy lives in [`src/data/profile.ts`](src/data/profile.ts): headline, about, experience,
stack, projects and contact links. Project screenshots are in `public/projects/`.
