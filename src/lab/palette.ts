import { CanvasTexture, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from 'three'

const TILE_PX = 128
const TILES = 4
export const TILE_M = 0.6

// Four by four vinyl tiles with a slight shade per tile, grout lines and a fine fleck.
function tileTexture() {
  const size = TILE_PX * TILES
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('lab: no 2d context for the floor')

  let seed = 7
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }

  for (let ty = 0; ty < TILES; ty += 1) {
    for (let tx = 0; tx < TILES; tx += 1) {
      const shade = 226 + Math.round((random() - 0.5) * 10)
      ctx.fillStyle = `rgb(${shade - 4},${shade - 1},${shade + 3})`
      ctx.fillRect(tx * TILE_PX, ty * TILE_PX, TILE_PX, TILE_PX)
    }
  }
  for (let i = 0; i < 5200; i += 1) {
    const light = random() > 0.5
    ctx.fillStyle = light ? 'rgba(255,255,255,0.22)' : 'rgba(60,68,86,0.14)'
    ctx.fillRect(random() * size, random() * size, 1 + random() * 1.4, 1 + random() * 1.4)
  }
  ctx.fillStyle = 'rgba(120,128,146,0.55)'
  for (let i = 0; i < TILES; i += 1) {
    ctx.fillRect(i * TILE_PX, 0, 2, size)
    ctx.fillRect(0, i * TILE_PX, size, 2)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(1 / (TILE_M * TILES), 1 / (TILE_M * TILES))
  texture.anisotropy = 8
  return texture
}

export function createPalette() {
  const standard = (color: string, roughness: number, metalness = 0) =>
    new MeshStandardMaterial({ color, roughness, metalness })

  return {
    floor: new MeshStandardMaterial({ color: '#c9ced8', map: tileTexture(), roughness: 0.6 }),
    base: standard('#16244f', 0.9),
    cut: standard('#1b2c66', 0.95),
    wall: standard('#edebe7', 0.92),
    dado: standard('#b4bfd2', 0.62),
    trim: standard('#2c323e', 0.55),
    pvc: standard('#f6f5f2', 0.42),
    radiator: standard('#e6e4df', 0.48),
    desk: standard('#e2ded6', 0.55),
    laminate: standard('#d9dde4', 0.6),
    steel: standard('#6b7280', 0.45, 0.45),
    chairFrame: standard('#1d2027', 0.5, 0.2),
    plastic: standard('#101319', 0.36, 0.1),
    keys: standard('#272c36', 0.62),
    fabric: standard('#1e2a4f', 0.96),
    clay: standard('#d9d4cb', 0.85),
    board: standard('#f6f7f9', 0.22),
    alu: standard('#c8cdd6', 0.32, 0.78),
    clock: standard('#fbfbfc', 0.4),
    ink: {
      blue: standard('#2f5bea', 0.5),
      red: standard('#e5484d', 0.5),
      black: standard('#1b1e25', 0.5),
    },
  }
}

export type Palette = ReturnType<typeof createPalette>
