import { Color, Group, Mesh, PlaneGeometry, ShaderMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { Mason, instanced } from './parts'
import type { Palette } from './palette'

export const ROOM = { left: -6.22, right: 6.22, front: -4.2, back: 3.6, wall: 0.24, height: 3, low: 0.45 }
export const SILL = 0.95
export const HEAD = 2.45
export const TRANSOM = 1.95
export const WINDOWS = [
  [-3.2, -1.7],
  [-0.9, 0.6],
  [1.4, 2.9],
] as const
// The glazing line, set back into the thickness of the left wall.
export const GLASS_X = ROOM.left - 0.16

const DOOR = [-3.95, -3.0] as const
const BAR = 0.06
const RADIATOR_PITCH = 0.085
const RADIATOR_FINS = 15

function outsideMaterial() {
  return new ShaderMaterial({
    uniforms: { uTop: { value: new Color('#6f8fd8') }, uBottom: { value: new Color('#ffc79a') } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop;
      uniform vec3 uBottom;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(uBottom, uTop, smoothstep(0.05, 0.95, vUv.y)) * 1.6, 1.0);
        #include <colorspace_fragment>
      }
    `,
  })
}

function walls(m: Mason, p: Palette) {
  const L = ROOM.left - ROOM.wall
  const R = ROOM.right + ROOM.wall
  const F = ROOM.front - ROOM.wall
  const B = ROOM.back + ROOM.wall
  const H = ROOM.height
  const inner = ROOM.left

  m.box([L, -0.34, F], [R, 0, B], { all: p.base, py: p.floor, ny: null, nx: null, nz: null })

  m.box([L, 0, F], [inner, SILL, B], { all: p.wall, px: p.dado, pz: p.cut, nx: null, ny: null, nz: null })
  m.box([L, HEAD, F], [inner, H, B], { all: p.wall, py: p.cut, pz: p.cut, nx: null, nz: null })
  const piers = [F, ...WINDOWS.flat(), B]
  for (let i = 0; i < piers.length; i += 2) {
    const [z0, z1] = [piers[i], piers[i + 1]]
    m.box([L, SILL, z0], [inner, HEAD, z1], {
      all: p.wall,
      pz: z1 === B ? p.cut : p.wall,
      nz: z0 === F ? null : p.wall,
      nx: null,
      py: null,
      ny: null,
    })
  }

  m.box([inner, 0, F], [R, SILL, ROOM.front], { all: p.wall, pz: p.dado, px: p.cut, nx: null, ny: null, nz: null, py: null })
  m.box([inner, SILL, F], [R, H, ROOM.front], { all: p.wall, py: p.cut, px: p.cut, nx: null, ny: null, nz: null })

  const low = ROOM.low
  m.box([ROOM.right, 0, ROOM.front], [R, low, DOOR[0]], { all: p.dado, py: p.cut, px: p.wall, ny: null, nz: null })
  m.box([ROOM.right, 0, DOOR[1]], [R, low, ROOM.back], { all: p.dado, py: p.cut, px: p.wall, ny: null, pz: null })
  m.box([inner, 0, ROOM.back], [R, low, B], { all: p.dado, py: p.cut, pz: p.wall, px: p.wall, nx: null, ny: null })

  const kick = 0.08
  const proud = 0.012
  const skirting = { all: p.trim, ny: null }
  m.box([inner, 0, ROOM.front], [inner + proud, kick, ROOM.back], { ...skirting, nx: null })
  m.box([inner, 0, ROOM.front], [ROOM.right, kick, ROOM.front + proud], { ...skirting, nz: null })
  m.box([inner, 0, ROOM.back - proud], [ROOM.right, kick, ROOM.back], { ...skirting, pz: null })
  m.box([ROOM.right - proud, 0, ROOM.front], [ROOM.right, kick, DOOR[0]], { ...skirting, px: null })
  m.box([ROOM.right - proud, 0, DOOR[1]], [ROOM.right, kick, ROOM.back], { ...skirting, px: null })
}

function windows(m: Mason, p: Palette) {
  const x0 = GLASS_X
  const x1 = GLASS_X + 0.07
  const frame = { all: p.pvc }
  for (const [a, b] of WINDOWS) {
    const zc = (a + b) / 2
    m.box([x0, HEAD - BAR, a], [x1, HEAD, b], frame)
    m.box([x0, SILL, a], [x1, SILL + BAR, b], frame)
    m.box([x0, SILL + BAR, a], [x1, HEAD - BAR, a + BAR], frame)
    m.box([x0, SILL + BAR, b - BAR], [x1, HEAD - BAR, b], frame)
    m.box([x0, SILL + BAR, zc - BAR / 2], [x1, TRANSOM, zc + BAR / 2], frame)
    m.box([x0, TRANSOM, a + BAR], [x1, TRANSOM + 0.05, b - BAR], frame)
    m.box([x1, SILL - 0.03, a - 0.06], [ROOM.left + 0.16, SILL + 0.006, b + 0.06], { all: p.pvc, nx: null })
  }
}

export function buildShell(p: Palette) {
  const group = new Group()
  const m = new Mason()
  walls(m, p)
  windows(m, p)
  group.add(...m.build())

  const outside = outsideMaterial()
  for (const [a, b] of WINDOWS) {
    const pane = new Mesh(new PlaneGeometry(b - a, HEAD - SILL), outside)
    pane.position.set(GLASS_X - 0.004, (SILL + HEAD) / 2, (a + b) / 2)
    pane.rotation.y = Math.PI / 2
    group.add(pane)
  }

  const fin = new RoundedBoxGeometry(0.09, 0.5, 0.05, 1, 0.014)
  group.add(
    instanced(fin, p.radiator, WINDOWS.length * RADIATOR_FINS, (o, i) => {
      const [a, b] = WINDOWS[Math.floor(i / RADIATOR_FINS)]
      const k = (i % RADIATOR_FINS) - (RADIATOR_FINS - 1) / 2
      o.position.set(ROOM.left + 0.11, 0.39, (a + b) / 2 + k * RADIATOR_PITCH)
    }),
  )

  return { group, outside }
}
