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

The exam section deliberately does not claim the lockdown is unbypassable. That
follows the project's own rule: friction, non-persistence and visibility.

## Theming

Light and dark follow `prefers-color-scheme` with no toggle. Sections marked
`data-deep` keep the deep-space palette in both schemes, because the imagery
only reads on black; everything around them follows the system.

All tokens are in `src/styles/tokens.css`.

## The hero scene

`src/three/` is a hand-written three.js scene: a shader-built planet with
procedural continents and night-side city lights, plus two parallax star layers.
No textures and no scene graph library.

It is gated behind `useRichScenes()` (`src/lib/useCapability.ts`), which needs
memory, cores, a real pointer and a WebGL context, and which returns false under
`prefers-reduced-motion`. When it declines, the hero shows a static poster —
which is also what paints first on every machine, so it doubles as the LCP
image. three.js is a lazy chunk and is never fetched on the fallback path.

## Images

`scripts/images.sh` regenerates `public/media` from the source wallpapers into
AVIF and WebP at two widths. It needs `cwebp` and `avifenc`:

```bash
brew install webp libavif
./scripts/images.sh ~/path/to/hoakaos-wallpaper
```

## Contact details

`src/lib/contact.ts` holds the email and phone used in the footer and the pilot
form. The form has no backend: it composes a message and hands it to the
visitor's mail client. Swapping in an endpoint is a change to `onSubmit` in
`src/pages/Pilot.tsx`.
