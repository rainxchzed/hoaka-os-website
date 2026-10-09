// Turns the product's own screenshots into the site's images. The PNGs come from the
// product's shot runs, one folder per language under console/ and lab/; this writes WebP
// at the widths the pages ask for, and the sizes the pages reserve before they load.
// Needs ImageMagick 6 (convert, identify) with WebP.
//
//   node scripts/screens.mjs <shots>   # <shots>/console/<lang>/*.png and <shots>/lab/<lang>/*.png
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public/media/screens')
const SIZES = join(ROOT, 'src/lib/screens.json')
const shots = process.argv[2]
if (!shots) throw new Error('usage: node scripts/screens.mjs <shots folder>')

const LOCALES = ['uz', 'ru', 'en']
// Whole console windows, shot at twice their size: a phone and a laptop width.
const WINDOWS = ['rooms', 'exam', 'devices', 'websites']
// Parts of a console page, shot at twice their size: shown at half, sharp at full.
const PARTS = ['setup', 'licence', 'create-room', 'installer', 'enrolled']
// Lab screens fill 1920x1080 around a centred column; only the column is kept.
const COLUMNS = ['installer-disk', 'name']
const WINDOWS_LAB = ['store']

const tmp = mkdtempSync(join(tmpdir(), 'hoaka-screens-'))
const sizes = {}

const size = (file) =>
  execFileSync('identify', ['-format', '%w %h', file], { encoding: 'utf8' }).trim().split(' ').map(Number)

function webp(src, dest, width) {
  const args = [src]
  if (width) args.push('-resize', `${width}x`)
  args.push('-strip', '-quality', '80', '-define', 'webp:method=6', dest)
  execFileSync('convert', args)
}

for (const locale of LOCALES) {
  const dir = join(OUT, locale)
  mkdirSync(dir, { recursive: true })
  sizes[locale] = {}

  for (const name of WINDOWS) {
    const src = join(shots, 'console', locale, `${name}.png`)
    const [w, h] = size(src)
    webp(src, join(dir, `${name}-1280.webp`), 1280)
    webp(src, join(dir, `${name}-2400.webp`), 2400)
    sizes[locale][name] = [w, h]
  }

  for (const name of PARTS) {
    const src = join(shots, 'console', locale, `${name}.png`)
    const [w, h] = size(src)
    webp(src, join(dir, `${name}-1x.webp`), Math.round(w / 2))
    webp(src, join(dir, `${name}-2x.webp`))
    sizes[locale][name] = [Math.round(w / 2), Math.round(h / 2)]
  }

  for (const name of COLUMNS) {
    const src = join(shots, 'lab', locale, `${name}.png`)
    const ground = execFileSync('convert', [src, '-format', '%[pixel:p{8,540}]', 'info:'], { encoding: 'utf8' }).trim()
    const cut = join(tmp, `${locale}-${name}.png`)
    execFileSync('convert', [
      src, '-crop', '640x1080+640+0', '+repage', '-fuzz', '3%', '-trim', '+repage',
      '-bordercolor', ground, '-border', '40x40', cut,
    ])
    webp(cut, join(dir, `${name}-1x.webp`))
    sizes[locale][name] = size(cut)
  }

  for (const name of WINDOWS_LAB) {
    const src = join(shots, 'lab', locale, `${name}.png`)
    webp(src, join(dir, `${name}-1x.webp`))
    sizes[locale][name] = size(src)
  }
}

rmSync(tmp, { recursive: true, force: true })
writeFileSync(SIZES, `${JSON.stringify(sizes, null, 2)}\n`)
console.log(`screens written to public/media/screens and ${SIZES.slice(ROOT.length + 1)}`)
