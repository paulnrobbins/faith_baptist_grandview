# Faith Baptist Grandview

> *"Jesus can Save You."* A small country church in Grandview, Tennessee. Pastor Justin Dannel preaches the gospel that delivered him from 18 years of meth addiction. Come as you are.

This is the production website for [Faith Baptist Church](https://www.faithbaptistgrandview.com) — Grandview, TN. Built using the Immersive 3D System framework, **Option B Appalachian Documentary** aesthetic.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router + React 18 + TypeScript |
| 3D engine | React Three Fiber + drei + Three.js (procedural country church model) |
| Scroll | Lenis smooth scroll, bound to GSAP ticker |
| Animation | GSAP + ScrollTrigger |
| Styling | Tailwind CSS + CSS variable design tokens |
| Fonts | Fraunces (display) + Geist (body) + Geist Mono (captions) — all SIL OFL |
| Deployment | Vercel (free Hobby tier) |

---

## Quick Start

Requires Node.js 18.17 or higher.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The 3D scene boots in about 200ms on a modern phone; low-end devices automatically fall back to a static dawn-gradient.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type-check (no emit) |

---

## Project Structure

```
faith-baptist-grandview/
├── app/
│   ├── layout.tsx                Root layout (fonts, providers, structured data)
│   ├── page.tsx                  Home — orchestrates the six scenes
│   ├── about-us/page.tsx         /about-us standalone
│   ├── statement-of-faith/       /statement-of-faith standalone
│   ├── sitemap.ts                Auto-generates /sitemap.xml
│   ├── robots.ts                 Auto-generates /robots.txt
│   ├── globals.css               Base styles + reduced-motion + a11y
│   └── not-found.tsx             404 in the same documentary world
├── components/
│   ├── layout/                   Nav, Footer, Providers (Lenis + GSAP boot)
│   ├── sections/                 Six scenes — Scene1Approach → Scene6FacingDoors
│   └── three/                    R3F Canvas, ChurchModel, Lighting, SceneCamera, Mist
├── lib/
│   ├── content.ts                ★ All editable copy (Paul edits here)
│   ├── scrollState.ts            Module-level scroll singleton (powers 3D)
│   ├── gsap.ts                   GSAP registration
│   ├── lenis.ts                  Lenis smooth scroll setup
│   └── utils.ts                  cn() class merger
├── hooks/
│   ├── useReducedMotion          a11y: prefers-reduced-motion
│   ├── useResponsive             mobile/tablet/desktop breakpoints
│   ├── useLowEndDevice           drops 3D on weak hardware (80% mobile audience)
│   └── useScrollProgress         0..1 document progress
├── styles/
│   └── tokens.css                ★ Design tokens — edit colors/type/motion here
├── public/
│   ├── images/                   Optimized photography (church/, pastor/, ministries/)
│   ├── og-image.jpg              Social share card
│   ├── icon.png, apple-icon.png  Favicons
│   └── favicon.ico               Multi-size favicon
├── PHASE-1-BRIEF.md              ★ Canonical reference for the full build
├── DEPLOYMENT.md                 ★ How to deploy to Vercel + custom domain
└── MAINTENANCE.md                ★ How to edit content post-launch
```

---

## Documentation

Three docs you should know about:

| Document | When to read |
|---|---|
| `PHASE-1-BRIEF.md` | The full canonical reference. Every decision, every aesthetic choice, every phase summarized. Send to any developer or AI assistant who needs to understand the project. |
| `DEPLOYMENT.md` | Before launch. Walks through GitHub setup, Vercel deployment, and DNS configuration to point the custom domain at the site. |
| `MAINTENANCE.md` | Whenever you need to edit something. Covers the most common edits in plain language, no code knowledge required for 95% of changes. |

---

## The Six Scenes

```
01 → Approach           3D country church appears in dawn fog
02 → The Promise        "Come as you are. God meets us in our messiness."
03 → The Doors Open     Pastor Justin's testimony — meth addiction to pulpit
04 → Down the Aisle     Plan Your Visit + service times + what to expect
05 → At the Pulpit      Ministries (Bible Quizzing / Sportsman / Outreach)
06 → Facing the Doors   Mark 5:19 sending + mission + contact + beliefs
```

Each scene was built with editorial dignity. The 3D church anchor on Scenes 1-3 maps to the gospel narrative (approach → welcome → doors open → invitation). Scenes 4-6 are carried by documentary photographs from the actual church and congregation — the dream becomes the place.

---

## Accessibility & Performance

- **Mobile-first.** 80% of Faith Baptist's traffic is mobile; this is the primary canvas, not a responsive afterthought.
- **`prefers-reduced-motion`** disables Lenis smooth-scroll, all GSAP scroll-scrubs, and the 3D church animation. Static dawn-gradient is shown instead.
- **Low-end device detection** (`hardwareConcurrency < 4`, `deviceMemory < 4`, 2G/3G, Save-Data) drops 3D entirely. Site stays fully readable.
- **No-JavaScript fallback.** Content is server-rendered. The `<noscript>` block forces scroll-revealed elements visible so crawlers + a11y tools see everything.
- **Native `<details>`** for the Statement of Faith accordion — works without JavaScript.
- **Performance posture:** module-level scroll state read in `useFrame` (zero React re-renders during scroll), DPR capped per device, shadows disabled on mobile, mist particle count tuned per device.

---

## Project Status

✅ **Phase 1** — Foundation Brief (`PHASE-1-BRIEF.md`)
✅ **Phase 2** — Scaffolding + design tokens + content store
✅ **Phase 3** — Hero + 3D anchor + door-opening animation
✅ **Phase 4a** — Pastor testimony scene polish
✅ **Phase 4b** — Visit + Ministries scenes polish
✅ **Phase 4c** — Statement of Faith + Scene 6 + standalone pages
✅ **Phase 5** — Polish, mobile pass, SEO, deployment docs

**The project is launch-ready.** See `DEPLOYMENT.md` to push to Vercel.

---

## Credits

Photography by Faith Baptist Church.
Site code MIT.
Pastor Justin Dannel's testimony reproduced with permission.

> *"Go home to your own people and tell them how much the Lord has done for you, and how he has had mercy on you."* — Mark 5:19
