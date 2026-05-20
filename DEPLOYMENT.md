# Deployment Guide — Faith Baptist Grandview

> The full path from local dev to live at `faithbaptistgrandview.com`.

This site is a Next.js 14 app designed to deploy to Vercel's free Hobby tier. Faith Baptist's expected traffic comfortably fits within Vercel's free quotas. No credit card needed.

---

## 1. First-Time Setup (one-time, ~30 minutes)

### Prerequisites
- A computer with Node.js 18.17 or newer (`node -v` to check)
- A GitHub account (free) — to host the code
- A Vercel account (free) — to host the live site
- Access to the domain registrar where `faithbaptistgrandview.com` is registered (Squarespace, GoDaddy, Namecheap, etc.)

### Step 1: Get the code into GitHub

```bash
# In the faith-baptist-grandview project folder:
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create a new repo at github.com/new (Private is fine), then:
git remote add origin https://github.com/<your-username>/faith-baptist-grandview.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
2. Click **Add New → Project**.
3. Import your `faith-baptist-grandview` repository.
4. Vercel auto-detects it's a Next.js app — keep all defaults.
5. Click **Deploy**.
6. Wait ~2 minutes. Vercel gives you a URL like `faith-baptist-grandview.vercel.app` — that's the live site.

### Step 3: Connect the custom domain

1. In Vercel, open the project → **Settings → Domains**.
2. Click **Add** and type `faithbaptistgrandview.com`. Click **Add**.
3. Vercel shows you DNS records to add. There are two ways depending on what you want:

#### Option A — Use Vercel's nameservers (recommended, simplest)
1. Vercel will show two nameservers like `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
2. Go to your domain registrar (Squarespace / GoDaddy / etc.), find DNS settings, and change the nameservers to those two.
3. Save. Propagation takes 5 minutes to 24 hours. The site is live at the custom domain when done.

#### Option B — Keep your current nameservers, add records manually
1. In your registrar's DNS, add an **A record**:
   - Name: `@`
   - Value: `76.76.21.21`
2. Add a **CNAME record**:
   - Name: `www`
   - Value: `cname.vercel-dns.com`
3. Save. Propagation takes 5 minutes to 24 hours.

### Step 4: Set environment variable (optional but recommended)

In Vercel project → **Settings → Environment Variables**:

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.faithbaptistgrandview.com` | Production, Preview |

Click **Save**. Redeploy from the **Deployments** tab to pick up the new variable.

---

## 2. Day-to-Day Updates (recurring, ~2 minutes)

Every time you edit `lib/content.ts` or any other file:

```bash
git add .
git commit -m "Update [what you changed]"
git push
```

That's it. Vercel automatically rebuilds and deploys within 60 seconds. The live site updates without you doing anything else.

If you want to preview changes before they go live, push to a different branch:

```bash
git checkout -b preview-changes
# make your edits
git commit -am "Trying out new copy"
git push -u origin preview-changes
```

Vercel gives you a temporary preview URL for that branch. When happy, merge into `main`.

---

## 3. What's Where

| What | Where |
|---|---|
| All site copy (testimony, ministries, contact, etc.) | `lib/content.ts` |
| Colors, type, spacing | `styles/tokens.css` |
| Photos | `public/images/` |
| 3D church model | `components/three/ChurchModel.tsx` |
| Scene layout/structure | `components/sections/Scene[1-6]*.tsx` |
| About page | `app/about-us/page.tsx` |
| Statement of Faith page | `app/statement-of-faith/page.tsx` |
| Favicon + OG image | `public/` (regenerate via `scripts/` if needed) |

See `MAINTENANCE.md` for the most common edits.

---

## 4. Troubleshooting

**The site shows a 404 at the custom domain.**
DNS hasn't propagated yet. Wait 15 minutes and try again. You can check propagation at [dnschecker.org](https://dnschecker.org).

**Vercel build fails after a code change.**
Open the failed deployment in Vercel and read the build logs. The most common issue is a syntax error in `lib/content.ts` (missing comma, unmatched quote). Fix locally, commit, and push again.

**Photos aren't showing up.**
File path in `lib/content.ts` must exactly match the file in `public/images/`. Case matters: `Justin-Dannel.jpg` ≠ `justin-dannel.jpg`.

**The 3D church doesn't appear on a visitor's device.**
That's correct behavior on low-end devices or `prefers-reduced-motion` — the site automatically falls back to a calm dawn-gradient. The content is fully readable. Verified intentional behavior.

**The site is slow.**
Run `npm run build` locally and check the bundle size. The build report shows which routes are largest. The biggest cost is usually images — if you added new photos, they should be under 500 KB each (the existing ones are pre-optimized).

---

## 5. Vercel Free Tier Limits

For reference, Vercel's free Hobby tier includes:
- 100 GB bandwidth/month — far more than Faith Baptist will need
- Unlimited deployments
- Custom domains with auto-SSL
- Preview deployments per branch

If the site ever exceeds these (unlikely), upgrading to Pro is $20/month.

---

*Built with the Immersive 3D System framework. Last updated: launch.*
