# Hoaka OS — website

Marketing site for Hoaka OS, a managed lab image and console for university
computer labs. Three locales, prerendered to static HTML, no server.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # static site in dist/
npm run preview      # serve the build
npm run typecheck
```

`npm run build` runs three steps: the client bundle, an SSR bundle, and
`scripts/prerender.mjs`, which renders every route to HTML and writes the
sitemap and robots.txt. Set `SITE_URL` to change the canonical host:

```bash
SITE_URL=https://hoaka.uz npm run build
```

Deploy `dist/` to any static host. Nothing needs Node at runtime.

### One host requirement

An extensionless path must resolve to the directory's `index.html`: `/en` has to
serve `dist/en/index.html`, not the SPA fallback. The build writes `_redirects`
(Netlify, Cloudflare Pages) and `vercel.json` for the hosts that read them. On
nginx use:

```nginx
location / {
  try_files $uri $uri/ $uri/index.html /index.html;
}
```

If a host gets this wrong the site still works — `/` and every `/xx/` path serve
correctly, and the root page refuses to redirect when it is served for anything
other than `/`, so there is no redirect loop. A visitor landing on a bare `/en`
would just see the three language links instead of the page.

## Routes

Every locale is an explicit prefix. `/` carries no content: it redirects to a
remembered choice, then the browser's languages, then Uzbek, and ships links to
all three so a crawler never lands on a dead end.

| Page    | uz             | ru               | en             |
| ------- | -------------- | ---------------- | -------------- |
| Home    | `/uz`          | `/ru`            | `/en`          |
| Pricing | `/uz/narxlar`  | `/ru/stoimost`   | `/en/pricing`  |
| Pilot   | `/uz/sinov`    | `/ru/pilot`      | `/en/pilot`    |

Slugs live in `src/i18n/locales.ts`. Adding a page means adding a `PageKey`, its
slugs, a view in `src/pages/`, and an entry in `VIEWS` in `src/App.tsx`. The
prerenderer, sitemap, hreflang tags and language switcher all read from the same
table, so nothing else needs touching.

## Copy

`src/i18n/dict/uz.ts` is the source of truth and defines the `Dict` type;
`ru.ts` and `en.ts` are typed against it, so a missing or misspelled key is a
build error rather than a blank on the page.

Most strings come from the project's own papers (`service-sheet.html`,
`cost-one-pager.html`, `slides.html`) so the site says what those documents say.
The cost figures were read from vendor pages on 15 September 2026 and are
presented as an indicator, not a quote — the pricing page says so.

The exam step deliberately does not claim the lockdown is unbypassable. That
follows the project's own rule: friction, non-persistence and visibility.

## Design

The home page is one day in a lab. It opens at dawn, walks through 07:58 boot,
09:00 open, 11:00 lecture, 14:00 exam and 17:30 last logout, and ends at dusk.
The timestamps are the only labels on the page because they carry real order.

Type is Montserrat (light, large) for display and Onest for everything else; the
dark scheme is blue hour rather than black, and gold is kept for the sun and the
one primary action. Light and dark follow `prefers-color-scheme` with no toggle.
Sections marked `data-deep` keep the deep palette in both schemes. All tokens are
in `src/styles/tokens.css`.

## The sky

`src/sky/` renders the hero and the closing section with a single fixed WebGL2
canvas: single scattering after Nishita (Rayleigh, Mie and an ozone layer)
integrated along each view ray, with Earth's own shadow in the air, a thin
airglow shell, stars, and filmic tone mapping. The sun rises over the limb when
the page opens and sets as the last section scrolls in. It renders only while a
`[data-sky]` section is on screen, only when something changed, and drops
resolution if the GPU falls behind.

## The lab

`src/lab/` is a three.js scene of a 24-seat lab: window light with soft shadows,
ambient occlusion, bloom on the screens, and a wall clock that follows the
timeline. Each timeline step sets a moment in `src/lab/moments.ts` (light,
camera, what every screen shows), and the screens change seat by seat. The
monitors show the real Hoaka states: the clean desktop, a blocked page, the blue
Lecture bar, the red Exam bar, a seat that left the exam. three.js is a lazy
chunk fetched only when the section comes within a screen of view.

## Without WebGL or JavaScript

Both scenes have stills in `public/media`: the sky's first frame, its dusk frame,
and the lab at 07:58. They show until the live scene takes over, and stay when it
cannot. Nothing on the page is hidden unless the script that reveals it is
running, so a disabled or stalled bundle still leaves every word readable.

Reduced motion keeps both scenes but stops the sunrise, the camera moves and the
seat-by-seat changes.

## Images

`npm run stills` renders the stills and one 1200×630 social preview per locale
from a running dev server, using the local Chrome through `playwright-core`. It
also needs `cwebp` and `avifenc`:

```bash
brew install webp libavif
npm run dev
BASE=http://localhost:5173 npm run stills
```

`scripts/images.sh` regenerates the desktop wallpaper shown on the lab's screens
from the source image.

## Contact details

`src/lib/contact.ts` holds the email and phone used in the footer and the pilot
form. The form has no backend: it composes a message and hands it to the
visitor's mail client. Swapping in an endpoint is a change to `onSubmit` in
`src/pages/Pilot.tsx`.
