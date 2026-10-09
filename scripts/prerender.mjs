import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SITE = (process.env.SITE_URL ?? 'https://hoakaos.com').replace(/\/$/, '')

const { render, ROUTES, LOCALES, LOCALE_HTML_LANG, pathFor, dictFor } = await import(
  join(DIST, '../dist-ssr/entry-server.js')
)

const template = await readFile(join(DIST, 'index.html'), 'utf8')

// Link previews are cached by image URL, so the URL changes whenever the image does.
const ogImage = Object.fromEntries(
  await Promise.all(
    LOCALES.map(async (code) => {
      const file = `media/og-${code}.jpg`
      const hash = createHash('sha256').update(await readFile(join(DIST, file))).digest('hex').slice(0, 8)
      return [code, `${SITE}/${file}?v=${hash}`]
    }),
  ),
)

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function socialTags({ locale, url, title, description }) {
  return `<meta property="og:type" content="website" />
    <meta property="og:site_name" content="Hoaka OS" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${ogImage[locale]}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />`
}

function headFor({ locale, page, path }) {
  const t = dictFor(locale)
  const meta = t.meta[page]
  const url = `${SITE}${path}`

  const alternates = LOCALES.map(
    (code) =>
      `<link rel="alternate" hreflang="${code}" href="${SITE}${pathFor(code, page)}" />`,
  ).join('\n    ')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hoaka OS',
    applicationCategory: 'OperatingSystem',
    operatingSystem: 'Debian 13',
    description: meta.description,
    inLanguage: locale,
    url,
    offers: {
      '@type': 'Offer',
      price: '15',
      priceCurrency: 'USD',
      description: t.pricing.lede,
    },
  }

  return `<title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}/" />
    ${socialTags({ locale, url, title: meta.title, description: meta.description })}
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
}

function page(route) {
  const html = render(route.path)
  return template
    .replace('<html lang="uz-Latn-UZ">', `<html lang="${LOCALE_HTML_LANG[route.locale]}">`)
    .replace('<title>Hoaka OS</title>', headFor(route))
    .replace('<!--app-html-->', html)
}

function rootPage() {
  const links = LOCALES.map((code) => {
    const t = dictFor(code)
    return `<li><a hreflang="${code}" lang="${code}" href="${pathFor(code, 'home')}">${esc(t.footer.language)}: ${esc(t.meta.home.title)}</a></li>`
  }).join('\n      ')

  const alternates = LOCALES.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${SITE}${pathFor(code, 'home')}" />`,
  ).join('\n    ')
  const fallback = pathFor('uz', 'home')
  const home = dictFor('uz').meta.home

  return `<!doctype html>
<html lang="uz-Latn-UZ">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hoaka OS</title>
    <meta name="description" content="${esc(home.description)}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="canonical" href="${SITE}${fallback}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}${fallback}" />
    ${socialTags({ locale: 'uz', url: `${SITE}${fallback}`, title: home.title, description: home.description })}
    <meta http-equiv="refresh" content="0; url=${fallback}" />
    <style>
      body { font-family: system-ui, sans-serif; margin: 3rem auto; max-width: 34rem; padding: 0 1.25rem; line-height: 1.6 }
      li { margin: 0.5rem 0 }
    </style>
    <script>
      (function () {
        // This page is also what a misconfigured host serves for /uz, /ru and /en.
        // Redirecting from there would bounce the browser back here forever, so
        // anything that is not the root just shows the three links below.
        var path = location.pathname
        if (path !== '/' && path !== '/index.html') { return }

        var tags = navigator.languages || [navigator.language || 'uz']
        var stored = null
        try { stored = localStorage.getItem('hoaka.locale') } catch (e) { stored = null }
        var pick = stored
        if (pick !== 'uz' && pick !== 'ru' && pick !== 'en') {
          pick = 'uz'
          for (var i = 0; i < tags.length; i++) {
            var tag = String(tags[i]).toLowerCase()
            if (tag.indexOf('uz') === 0) { pick = 'uz'; break }
            if (tag.indexOf('ru') === 0 || tag.indexOf('kk') === 0 || tag.indexOf('ky') === 0) { pick = 'ru'; break }
            if (tag.indexOf('en') === 0) { pick = 'en'; break }
          }
        }
        location.replace('/' + pick + '/')
      })()
    </script>
  </head>
  <body>
    <h1>Hoaka OS</h1>
    <ul>
      ${links}
    </ul>
  </body>
</html>
`
}

// Paths that were live before every path became English, each sent on to where it lives now.
const MOVED = [
  ['/uz/narxlar/', pathFor('uz', 'pricing')],
  ['/ru/stoimost/', pathFor('ru', 'pricing')],
  ['/uz/sinov/', pathFor('uz', 'pilot')],
]

function movedPage(to) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <title>Hoaka OS</title>
    <link rel="canonical" href="${SITE}${to}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
  </head>
  <body>
    <a href="${to}">${SITE}${to}</a>
  </body>
</html>
`
}

// GitHub Pages serves this for any path it has no file for.
function notFoundPage() {
  const lines = LOCALES.map((code) => {
    const t = dictFor(code)
    return `<li lang="${code}">${esc(t.notFound)}. <a hreflang="${code}" href="${pathFor(code, 'home')}">${esc(t.nav.home)}</a></li>`
  }).join('\n        ')

  return `<!doctype html>
<html lang="uz-Latn-UZ">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Hoaka OS</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <style>
      :root { color-scheme: dark }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #191919; color: #ededed; font: 1.05rem/1.6 system-ui, sans-serif }
      main { padding: 0 1.25rem; max-width: 30rem }
      svg { display: block; width: 2rem; height: 2.5rem }
      ul { list-style: none; padding: 0 }
      li { margin: 0.6rem 0; color: #b3b3b3 }
      a { color: #9cc4ff; text-underline-offset: 0.2em }
    </style>
  </head>
  <body>
    <main>
      <svg viewBox="0 0 25 31" role="img" aria-label="Hoaka OS"><path fill="currentColor" fill-rule="evenodd" d="M0 0h11v31H0zM13 0h12v31h-4V13h-8zm4 4v5h4V4z" /></svg>
      <ul>
        ${lines}
      </ul>
    </main>
  </body>
</html>
`
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ROUTES.map((route) => {
    const alts = LOCALES.map(
      (code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE}${pathFor(code, route.page)}" />`,
    ).join('\n')

    return `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.page === 'home' ? '1.0' : '0.8'}</priority>
${alts}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

for (const route of ROUTES) {
  const dir = join(DIST, route.path)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), page(route), 'utf8')
}

for (const [from, to] of MOVED) {
  const dir = join(DIST, from)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), movedPage(to), 'utf8')
}

await writeFile(join(DIST, 'index.html'), rootPage(), 'utf8')
await writeFile(join(DIST, 'sitemap.xml'), sitemap(), 'utf8')
await writeFile(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  'utf8',
)

await writeFile(join(DIST, '404.html'), notFoundPage(), 'utf8')

await rm(join(ROOT, 'dist-ssr'), { recursive: true, force: true })

console.log(`prerendered ${ROUTES.length} routes + / to dist/`)
