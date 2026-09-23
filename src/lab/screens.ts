import { CanvasTexture, SRGBColorSpace } from 'three'

export type ScreenState = 'off' | 'desktop' | 'browser' | 'blocked' | 'lecture' | 'exam' | 'examLeft'

const W = 512
const H = 300

const COLORS = {
  chrome: '#e6eaf1',
  page: '#fbfcfe',
  line: '#cfd6e2',
  heading: '#1c2743',
  link: '#2448d8',
  lecture: '#2f5bea',
  exam: '#e5484d',
  taskbar: 'rgba(8, 14, 32, 0.82)',
}

function canvas() {
  const el = document.createElement('canvas')
  el.width = W
  el.height = H
  const ctx = el.getContext('2d')
  if (!ctx) throw new Error('2d canvas unavailable')
  return { el, ctx }
}

function lines(ctx: CanvasRenderingContext2D, x: number, y: number, widths: number[], gap = 16) {
  ctx.fillStyle = COLORS.line
  widths.forEach((w, i) => ctx.fillRect(x, y + i * gap, w, 7))
}

function page(ctx: CanvasRenderingContext2D, top: number) {
  ctx.fillStyle = COLORS.page
  ctx.fillRect(0, top, W, H - top)
  ctx.fillStyle = COLORS.heading
  ctx.fillRect(48, top + 30, 250, 16)
  ctx.fillStyle = COLORS.link
  ctx.fillRect(48, top + 58, 120, 7)
  lines(ctx, 48, top + 86, [410, 380, 400, 250])
  ctx.fillStyle = '#e3e8f1'
  ctx.fillRect(48, top + 162, 190, 72)
  lines(ctx, 256, top + 168, [200, 180, 196, 120])
}

function chrome(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = COLORS.chrome
  ctx.fillRect(0, 0, W, 34)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(70, 8, 372, 18, 9)
  ctx.fill()
  ctx.fillStyle = '#9aa6bb'
  ctx.fillRect(84, 15, 150, 4)
}

function banner(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, W, 30)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
  ctx.fillRect(18, 12, 86, 7)
}

function taskbar(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = COLORS.taskbar
  ctx.fillRect(0, H - 26, W, 26)
  ctx.fillStyle = 'rgba(210, 222, 255, 0.85)'
  for (let i = 0; i < 5; i += 1) ctx.fillRect(12 + i * 24, H - 19, 14, 12)
}

function draw(state: ScreenState, wallpaper: HTMLImageElement | null) {
  const { el, ctx } = canvas()

  switch (state) {
    case 'off':
      ctx.fillStyle = '#04060b'
      ctx.fillRect(0, 0, W, H)
      break
    case 'desktop':
    case 'examLeft':
      if (wallpaper) {
        ctx.drawImage(wallpaper, 0, 0, W, H)
      } else {
        ctx.fillStyle = '#0b1633'
        ctx.fillRect(0, 0, W, H)
      }
      taskbar(ctx)
      if (state === 'examLeft') {
        ctx.strokeStyle = COLORS.exam
        ctx.lineWidth = 14
        ctx.strokeRect(7, 7, W - 14, H - 14)
      }
      break
    case 'browser':
      chrome(ctx)
      page(ctx, 34)
      break
    case 'blocked':
      chrome(ctx)
      ctx.fillStyle = '#f1f3f7'
      ctx.fillRect(0, 34, W, H - 34)
      ctx.strokeStyle = COLORS.exam
      ctx.lineWidth = 9
      ctx.beginPath()
      ctx.arc(W / 2, 140, 34, 0, Math.PI * 2)
      ctx.moveTo(W / 2 - 24, 164)
      ctx.lineTo(W / 2 + 24, 116)
      ctx.stroke()
      lines(ctx, W / 2 - 90, 196, [180, 120])
      break
    case 'lecture':
      banner(ctx, COLORS.lecture)
      page(ctx, 30)
      break
    case 'exam':
      banner(ctx, COLORS.exam)
      ctx.fillStyle = COLORS.page
      ctx.fillRect(0, 30, W, H - 30)
      ctx.fillStyle = COLORS.heading
      ctx.fillRect(48, 58, 220, 14)
      for (let q = 0; q < 4; q += 1) {
        ctx.strokeStyle = '#9aa6bb'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(58, 104 + q * 40, 9, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = COLORS.line
        ctx.fillRect(80, 100 + q * 40, 260 - q * 30, 8)
      }
      break
  }

  const texture = new CanvasTexture(el)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function load(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export async function screenTextures() {
  const wallpaper = await load('/media/wall-3-800.webp')
  const states: ScreenState[] = ['off', 'desktop', 'browser', 'blocked', 'lecture', 'exam', 'examLeft']
  return Object.fromEntries(states.map((s) => [s, draw(s, wallpaper)])) as Record<ScreenState, CanvasTexture>
}
