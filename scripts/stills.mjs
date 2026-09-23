// Renders the still frames that stand in for the live scenes: the sky posters, the
// lab still, and one social preview per locale. Needs a running dev server, a local
// Chrome, and cwebp + avifenc on the PATH.
//
//   npm run dev            # in one terminal
//   npm run stills         # in another; BASE and CHROME_PATH override the defaults
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MEDIA = join(ROOT, 'public/media')
const BASE = process.env.BASE ?? 'http://localhost:5173'
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const tmp = mkdtempSync(join(tmpdir(), 'hoaka-stills-'))

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'],
})
const hideAll = 'header, .page-main { visibility: hidden !important; } [class*="_grain_"] { display: none !important; }'

async function page(options) {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, colorScheme: 'dark', ...options })
  return { ctx, page: await ctx.newPage() }
}

// The live sky starts from this exact frame, so the still must be taken before the rise.
{
  const { ctx, page: p } = await page({})
  await p.clock.install({ time: 0 })
  await p.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' })
  await p.waitForFunction(() => document.documentElement.dataset.skyMode === 'live', null, { timeout: 20000 })
  await p.clock.runFor(120)
  await p.addStyleTag({ content: hideAll })
  await p.clock.runFor(60)
  await p.screenshot({ path: join(tmp, 'sky-dawn.png') })
  await ctx.close()
}

{
  const { ctx, page: p } = await page({ reducedMotion: 'reduce' })
  await p.goto(`${BASE}/en`, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.querySelector('[data-sky="dusk"]')?.scrollIntoView({ block: 'start' }))
  await p.waitForTimeout(1500)
  await p.addStyleTag({ content: hideAll })
  await p.waitForTimeout(400)
  await p.screenshot({ path: join(tmp, 'sky-dusk.png') })
  await ctx.close()
}

{
  const { ctx, page: p } = await page({ reducedMotion: 'reduce' })
  await p.goto(`${BASE}/en`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  await p.evaluate(() => document.querySelector('[data-moment="boot"]')?.scrollIntoView({ block: 'center' }))
  await p.waitForTimeout(3500)
  await p.addStyleTag({
    content: 'header, [class*="_track_"], [class*="_scrim_"], .lab-labels { visibility: hidden !important; }',
  })
  await p.waitForTimeout(300)
  await p.screenshot({ path: join(tmp, 'lab-still.png') })
  await ctx.close()
}

for (const locale of ['uz', 'ru', 'en']) {
  const { ctx, page: p } = await page({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' })
  await p.goto(`${BASE}/${locale}`, { waitUntil: 'networkidle' })
  await p.addStyleTag({
    content: 'header, [class*="_lede_"], [class*="_actions_"] { display: none !important; } [class*="_hero_"] { padding-top: 150px !important; }',
  })
  await p.waitForTimeout(1500)
  await p.screenshot({ path: join(MEDIA, `og-${locale}.jpg`), type: 'jpeg', quality: 86 })
  await ctx.close()
}

await browser.close()

for (const name of ['sky-dawn', 'sky-dusk', 'lab-still']) {
  const src = join(tmp, `${name}.png`)
  execFileSync('cwebp', ['-quiet', '-q', '80', '-m', '6', src, '-o', join(MEDIA, `${name}.webp`)])
  execFileSync('avifenc', ['-q', '62', '-s', '6', '-j', 'all', src, join(MEDIA, `${name}.avif`)], { stdio: 'ignore' })
}
rmSync(tmp, { recursive: true, force: true })
console.log('stills written to public/media')
