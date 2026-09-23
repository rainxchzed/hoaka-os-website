import { CanvasTexture, MeshStandardMaterial, SRGBColorSpace } from 'three'

export type BoardState = 'clean' | 'notes' | 'lecture' | 'exam' | 'traces'
type Drawn = Exclude<BoardState, 'lecture'>
type Ctx = CanvasRenderingContext2D

const W = 1024
const H = 600
const BLUE = '#2344c4'
const RED = '#c9383d'
const INK = '#23262e'
const FONT = "'Onest Variable'"

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function pen(ctx: Ctx, color: string, width: number) {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
}

// Loose zigzags in word-sized runs read as handwriting from across the room.
function writing(ctx: Ctx, x: number, y: number, width: number, size: number, random: () => number) {
  let cx = x
  while (cx < x + width) {
    const word = size * (2 + random() * 4)
    ctx.beginPath()
    ctx.moveTo(cx, y)
    for (let t = 0; t <= word; t += size * 0.3) {
      ctx.lineTo(cx + t, y - Math.abs(Math.sin(t * (1.1 / size) + random() * 3)) * size * (0.6 + random() * 0.5))
    }
    ctx.stroke()
    cx += word + size * (1 + random())
  }
}

function box(ctx: Ctx, x: number, y: number, w: number, h: number) {
  const r = 10
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  ctx.stroke()
}

function arrow(ctx: Ctx, x0: number, y0: number, x1: number, y1: number) {
  const a = Math.atan2(y1 - y0, x1 - x0)
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.moveTo(x1 - Math.cos(a - 0.45) * 22, y1 - Math.sin(a - 0.45) * 22)
  ctx.lineTo(x1, y1)
  ctx.lineTo(x1 - Math.cos(a + 0.45) * 22, y1 - Math.sin(a + 0.45) * 22)
  ctx.stroke()
}

function ghosts(ctx: Ctx, random: () => number) {
  ctx.save()
  pen(ctx, 'rgba(90,100,120,0.05)', 38)
  for (let i = 0; i < 7; i += 1) {
    const x = random() * W
    const y = random() * H
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x + 80, y - 30 + random() * 60, x + 140 + random() * 160, y + random() * 40)
    ctx.stroke()
  }
  ctx.restore()
}

function notes(ctx: Ctx, random: () => number) {
  pen(ctx, BLUE, 6)
  writing(ctx, 70, 90, 380, 26, random)
  pen(ctx, INK, 5)
  box(ctx, 90, 220, 190, 110)
  box(ctx, 560, 170, 170, 90)
  box(ctx, 560, 330, 170, 90)
  box(ctx, 780, 250, 170, 90)
  arrow(ctx, 290, 260, 548, 215)
  arrow(ctx, 290, 290, 548, 372)
  arrow(ctx, 740, 215, 772, 280)
  writing(ctx, 118, 285, 130, 18, random)
  writing(ctx, 588, 225, 110, 16, random)
  writing(ctx, 588, 385, 110, 16, random)
  writing(ctx, 808, 305, 110, 16, random)
  pen(ctx, RED, 5)
  writing(ctx, 90, 470, 520, 20, random)
  writing(ctx, 90, 530, 340, 20, random)
}

function exam(ctx: Ctx, random: () => number) {
  pen(ctx, BLUE, 6)
  ctx.font = `500 124px ${FONT}, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('14:00 – 15:30', W / 2, 250)
  writing(ctx, 250, 110, 520, 24, random)
  pen(ctx, INK, 5)
  writing(ctx, 250, 410, 520, 20, random)
  writing(ctx, 250, 470, 360, 20, random)
}

function erase(ctx: Ctx, random: () => number) {
  ctx.save()
  pen(ctx, 'rgba(246,247,249,0.86)', 90)
  for (let i = 0; i < 5; i += 1) {
    const y = 120 + i * 95 + random() * 30
    ctx.beginPath()
    ctx.moveTo(140 + random() * 120, y)
    ctx.bezierCurveTo(360, y - 40, 560, y + 50, 760 + random() * 140, y - 10)
    ctx.stroke()
  }
  ctx.restore()
}

function draw(state: Drawn) {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('lab: no 2d context for the board')
  const random = seeded(17)
  ctx.fillStyle = '#f6f7f9'
  ctx.fillRect(0, 0, W, H)
  ghosts(ctx, random)
  if (state === 'notes') notes(ctx, random)
  if (state === 'exam' || state === 'traces') exam(ctx, random)
  if (state === 'traces') erase(ctx, random)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

export async function boardMaterials(): Promise<Record<Drawn, MeshStandardMaterial>> {
  await document.fonts?.load(`500 124px ${FONT}`).catch(() => undefined)
  const states: Drawn[] = ['clean', 'notes', 'exam', 'traces']
  return Object.fromEntries(
    states.map((state) => [state, new MeshStandardMaterial({ map: draw(state), roughness: 0.24 })]),
  ) as Record<Drawn, MeshStandardMaterial>
}
