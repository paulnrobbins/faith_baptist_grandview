# Maintenance Guide — Faith Baptist Grandview

> How to edit the site after launch. No code knowledge required for most edits.

The site is built so that 95% of the changes you'll ever need to make happen in **one file**: `lib/content.ts`. Open it in any text editor, change words inside the quotes, save, and push to GitHub. Vercel deploys the change automatically in under a minute.

This guide walks through the most common edits in order of likelihood.

---

## The Golden Rule

When editing `lib/content.ts`:
- **Inside quotes is safe.** Change words to your heart's content.
- **Outside quotes is structure.** Don't touch commas, brackets, braces, or the names before `:` (like `name:`, `email:`).
- **Save the file with no errors.** If Vercel's build fails after your push, open the failed deployment to see what went wrong — usually a missing comma or unclosed quote.

---

## 1. Updating Service Times

Find this section in `lib/content.ts`:

```ts
serviceTimes: [
  { day: 'Sunday',    time: '10:00 a.m.', label: 'Sunday School' },
  { day: 'Sunday',    time: '11:00 a.m.', label: 'Morning Worship' },
  { day: 'Sunday',    time: '6:00 p.m.',  label: 'Evening Service' },
  { day: 'Wednesday', time: '6:00 p.m.',  label: 'Midweek Service' },
],
```

Change the words inside quotes. To add a service, copy a full line including the trailing comma and put it in. To remove one, delete the entire line.

**Heads up:** The hero pill on the home page shows only the two main Sunday services (`serviceTimesHero` array right below). Update those separately if you want different services in the hero.

---

## 2. Updating the Pastor's Testimony

Find this section:

```ts
pastor: {
  name: 'Justin Dannel',
  role: 'Pastor',
  ...
  testimony: [
    'Hi, my name is Justin Dannel...',
    'The last time I went to jail...',
    'The Lord placed it on my heart...',
  ],
  ...
}
```

Each item in the `testimony:` array is one paragraph. Add a new paragraph by adding a new line with quotes around it and a comma at the end. Remove one by deleting that line.

The **pull-quote** (`pullQuote: 'Jesus called me to repentance.'`) is the bold callout in red — make sure to update it if you change the surrounding paragraphs and it no longer matches.

---

## 3. Adding a New Ministry

Find the `ministries:` array in `lib/content.ts` (inside `scene5`). Copy an existing ministry block and add it to the list:

```ts
{
  slug: 'new-ministry-name',
  name: 'Display Name of the Ministry',
  tagline: 'A short, evocative tagline.',
  photo: '/images/ministries/new-photo.jpg',
  body: [
    'First paragraph of the ministry description.',
    'Second paragraph (optional).',
  ],
},
```

Important:
- `slug` must be lowercase with hyphens, no spaces. Used internally.
- The photo at `/images/ministries/new-photo.jpg` must exist in `public/images/ministries/`. Add the file first.
- Recommended photo size: ~1800px wide, JPG, under 500KB.

---

## 4. Swapping or Adding Photos

Photos live in `public/images/`. To replace an existing photo:
1. Open the corresponding folder (`church/`, `pastor/`, `ministries/`).
2. Replace the file with your new one. **Keep the exact same filename** to avoid editing `content.ts`.
3. Commit and push.

To use a new filename:
1. Drop the new file in the right folder.
2. Open `content.ts` and find the old filename. Update the path.
3. Commit and push.

**Photo optimization:** Photos should be JPG, under 500 KB each, around 1800-2400 px on the long side. Next.js automatically generates smaller WebP/AVIF versions on the fly.

If you have a photo that's too big, you can resize it with any free tool (Mac Preview, Windows Photos, or [squoosh.app](https://squoosh.app)).

---

## 5. Editing the Statement of Faith

Find the `beliefs` object in `lib/content.ts`. Each article has a `heading`, `body`, and `scripture` field:

```ts
{
  heading: 'The Bible',
  body: 'We believe the Holy Bible is...',
  scripture: '2 Timothy 3:16–17 · Psalm 19:7 · 2 Peter 1:20–21',
},
```

The same content is used in three places automatically:
- Scene 6 collapsible accordion on the home page
- The `/about-us` page beliefs preview
- The full `/statement-of-faith` standalone page

So one edit updates all three places.

---

## 6. Changing the Hero Headline

The "Jesus can Save You" headline is in `lib/content.ts`:

```ts
export const scene1 = {
  ...
  headline: 'Jesus can Save You',
  ...
};
```

The word `Save` gets the special italic red treatment automatically because of how the JSX picks it out. If you change the headline to something different, that emphasis will likely still work as long as one impactful word stands out, but you may want to verify the visual at `/` after pushing.

---

## 7. Changing Colors or Typography

Open `styles/tokens.css`. This is the design system in one file:

```css
--color-bg:           #E8E4DC;     /* warm fog-white */
--color-fg:           #1C1F1A;     /* cool-tinted black */
--color-accent:       #A0341E;     /* Cumberland-clay red */
```

Change a hex value, save, push. The whole site picks up the new color automatically.

**A word of caution:** The current palette was specifically chosen for the documentary aesthetic. Changing colors is fully supported but may affect the editorial feel. Small tweaks are safe; total overhauls deserve a design conversation first.

---

## 8. Updating Contact Info

In `lib/content.ts` under `church.contact`:

```ts
contact: {
  email: 'faithbaptistgrandview@gmail.com',
  phone: '+1 423-834-1877',
  phoneHref: 'tel:+14238341877',
  facebook: 'https://www.facebook.com/profile.php?id=61587382430656',
},
```

If you change the phone, update **both** `phone` (display) and `phoneHref` (link — must be `tel:` + digits, no spaces or dashes).

---

## 9. Regenerating OG Image or Favicon

If you change the brand identity significantly (new color, new headline, new building photo), regenerate the OG image:

```bash
cd /path/to/faith-baptist-grandview
python3 scripts/generate_assets.py
```

This rewrites:
- `public/og-image.jpg` — social share card with current photo + headline
- `public/favicon.ico` + `public/icon.png` + `public/apple-icon.png`

(The `scripts/` folder may not exist by default — see the project root for `generate_assets.py` reference if needed.)

---

## 10. When Something Breaks

**Vercel build fails:**
Open the failed deployment in Vercel's dashboard. Read the build logs from bottom to top. Look for words like `error`, `unexpected`, or a file path. Most often it's a typo in `lib/content.ts`. Fix locally, commit, push.

**A page is blank or shows raw code:**
Run `npm run dev` locally and open `http://localhost:3000`. The error message in the browser console will pinpoint the issue.

**An image is broken:**
The filename in `content.ts` doesn't match the actual file in `public/images/`. Case matters.

**The 3D doesn't load on some devices:**
That's intentional. Low-end devices and reduced-motion users get a static dawn-gradient fallback. Content is fully readable.

**You changed something and want to undo it:**
```bash
git log               # find the commit hash before your change
git revert <hash>     # creates a new commit undoing it
git push              # Vercel deploys the revert
```

Or in the Vercel dashboard, find a previous successful deployment and click **Promote to Production**.

---

## What Not To Touch (Unless You Mean To)

- `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json` — framework config; only touch if you know why
- `package.json` — dependency versions, only update with care
- Files in `components/three/` — the 3D scene. Touching these can break the WebGL rendering
- Files in `lib/scrollState.ts`, `lib/gsap.ts`, `lib/lenis.ts` — the scroll choreography engine

If you're not sure whether to touch a file, ask first.

---

## Need Help?

The full canonical reference for how this project is built — every decision, every phase, every why — lives in `PHASE-1-BRIEF.md` at the project root. That's the file to send to anyone (a developer, another AI assistant, or yourself in 6 months) who needs to understand the project.

---

*Built with the Immersive 3D System framework. Maintained by Faith Baptist Church.*
