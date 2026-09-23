import {
  BoxGeometry,
  CircleGeometry,
  Color,
  CylinderGeometry,
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  RingGeometry,
  ShaderMaterial,
  Vector3,
} from 'three'
import type { BufferGeometry, Material } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

export const ROWS = [
  { id: 'A', z: -2.3 },
  { id: 'B', z: -0.4 },
  { id: 'C', z: 1.5 },
] as const

export const SEAT_X = [-4.4, -3.45, -2.5, -1.55, 1.55, 2.5, 3.45, 4.4]

const DESK_H = 0.74
const BENCH_X = [-2.975, 2.975]
const WINDOWS = [
  [-3.2, -1.7],
  [-0.9, 0.6],
  [1.4, 2.9],
] as const

export type Seat = { id: string; order: number; x: number; z: number; screen: Mesh }

type Place = (o: Object3D, i: number) => void

function instanced(geometry: BufferGeometry, material: Material, count: number, place: Place) {
  const mesh = new InstancedMesh(geometry, material, count)
  const o = new Object3D()
  for (let i = 0; i < count; i += 1) {
    o.position.set(0, 0, 0)
    o.rotation.set(0, 0, 0)
    o.scale.set(1, 1, 1)
    place(o, i)
    o.updateMatrix()
    mesh.setMatrixAt(i, o.matrix)
  }
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function solid(geometry: BufferGeometry, material: Material | Material[], x: number, y: number, z: number) {
  const mesh = new Mesh(geometry, material)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function buildRoom() {
  const group = new Group()

  const mat = {
    floor: new MeshStandardMaterial({ color: '#8f9bb1', roughness: 0.72 }),
    slab: new MeshStandardMaterial({ color: '#2b3657', roughness: 0.9 }),
    wall: new MeshStandardMaterial({ color: '#d6dbe5', roughness: 0.95 }),
    top: new MeshStandardMaterial({ color: '#e7e1d6', roughness: 0.5 }),
    frame: new MeshStandardMaterial({ color: '#5d687d', roughness: 0.45, metalness: 0.4 }),
    bezel: new MeshStandardMaterial({ color: '#10141f', roughness: 0.34, metalness: 0.25 }),
    key: new MeshStandardMaterial({ color: '#262c3b', roughness: 0.62 }),
    chair: new MeshStandardMaterial({ color: '#27418f', roughness: 0.92 }),
    steel: new MeshStandardMaterial({ color: '#394153', roughness: 0.35, metalness: 0.6 }),
    board: new MeshStandardMaterial({ color: '#f6f7fa', roughness: 0.3 }),
    mullion: new MeshStandardMaterial({ color: '#283043', roughness: 0.5, metalness: 0.3 }),
    clock: new MeshStandardMaterial({ color: '#fbfbfc', roughness: 0.4 }),
  }

  const floor = new BoxGeometry(12.8, 0.32, 8.2)
  group.add(solid(floor, [mat.slab, mat.slab, mat.floor, mat.slab, mat.slab, mat.slab], 0, -0.16, -0.28))

  group.add(solid(new BoxGeometry(12.8, 3, 0.18), mat.wall, 0, 1.5, -4.29))

  const wallX = -6.31
  const span = 8.02
  const spanZ = -0.19
  group.add(solid(new BoxGeometry(0.18, 0.95, span), mat.wall, wallX, 0.475, spanZ))
  group.add(solid(new BoxGeometry(0.18, 0.55, span), mat.wall, wallX, 2.725, spanZ))
  const piers = [
    [-4.2, -3.2],
    [-1.7, -0.9],
    [0.6, 1.4],
    [2.9, 3.82],
  ]
  for (const [a, b] of piers) {
    group.add(solid(new BoxGeometry(0.18, 1.5, b - a), mat.wall, wallX, 1.7, (a + b) / 2))
  }
  for (const [a, b] of WINDOWS) {
    const zc = (a + b) / 2
    group.add(solid(new BoxGeometry(0.06, 1.5, 0.05), mat.mullion, wallX, 1.7, zc))
    group.add(solid(new BoxGeometry(0.06, 0.04, b - a), mat.mullion, wallX, 1.95, zc))
    group.add(solid(new BoxGeometry(0.3, 0.04, b - a + 0.1), mat.wall, -6.18, 0.95, zc))
  }

  // The sky outside lives in the window openings themselves; it casts nothing, so
  // the sun still reaches the room through it.
  const outside = new ShaderMaterial({
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
  for (const [a, b] of WINDOWS) {
    const pane = new Mesh(new PlaneGeometry(b - a, 1.5), outside)
    pane.position.set(-6.34, 1.7, (a + b) / 2)
    pane.rotation.y = Math.PI / 2
    group.add(pane)
  }

  const benchTop = new RoundedBoxGeometry(3.9, 0.045, 0.72, 2, 0.012)
  group.add(
    instanced(benchTop, mat.top, 6, (o, i) => {
      o.position.set(BENCH_X[i % 2], DESK_H - 0.0225, ROWS[Math.floor(i / 2)].z - 0.05)
    }),
  )
  group.add(
    instanced(new BoxGeometry(0.04, DESK_H - 0.045, 0.66), mat.frame, 12, (o, i) => {
      const bench = Math.floor(i / 2)
      const side = i % 2 === 0 ? -1.9 : 1.9
      o.position.set(BENCH_X[bench % 2] + side, (DESK_H - 0.045) / 2, ROWS[Math.floor(bench / 2)].z - 0.05)
    }),
  )
  group.add(
    instanced(new BoxGeometry(3.8, 0.36, 0.02), mat.frame, 6, (o, i) => {
      o.position.set(BENCH_X[i % 2], 0.5, ROWS[Math.floor(i / 2)].z - 0.38)
    }),
  )

  const seats: Seat[] = []
  const placements: { x: number; z: number; jitter: number }[] = []
  ROWS.forEach((row, r) => {
    SEAT_X.forEach((x, s) => {
      placements.push({ x, z: row.z, jitter: Math.sin((r * 8 + s) * 12.9898) * 0.5 })
    })
  })
  const count = placements.length

  group.add(
    instanced(new RoundedBoxGeometry(0.58, 0.36, 0.035, 2, 0.01), mat.bezel, count, (o, i) => {
      const p = placements[i]
      o.position.set(p.x, DESK_H + 0.31, p.z - 0.25)
      o.rotation.x = -0.08
    }),
  )
  group.add(
    instanced(new BoxGeometry(0.04, 0.14, 0.03), mat.steel, count, (o, i) => {
      o.position.set(placements[i].x, DESK_H + 0.07, placements[i].z - 0.27)
    }),
  )
  group.add(
    instanced(new RoundedBoxGeometry(0.22, 0.012, 0.16, 1, 0.004), mat.steel, count, (o, i) => {
      o.position.set(placements[i].x, DESK_H + 0.006, placements[i].z - 0.25)
    }),
  )
  group.add(
    instanced(new RoundedBoxGeometry(0.44, 0.018, 0.14, 2, 0.006), mat.key, count, (o, i) => {
      o.position.set(placements[i].x, DESK_H + 0.009, placements[i].z + 0.08)
    }),
  )
  group.add(
    instanced(new RoundedBoxGeometry(0.06, 0.022, 0.1, 2, 0.01), mat.key, count, (o, i) => {
      o.position.set(placements[i].x + 0.3, DESK_H + 0.011, placements[i].z + 0.1)
    }),
  )

  const chairAt = (o: Object3D, i: number) => {
    const p = placements[i]
    o.position.set(p.x + p.jitter * 0.06, 0, p.z + 0.58 + Math.abs(p.jitter) * 0.08)
    o.rotation.y = p.jitter * 0.14
  }
  const seatGeo = new RoundedBoxGeometry(0.46, 0.06, 0.44, 2, 0.02)
  seatGeo.translate(0, 0.47, 0)
  const backGeo = new RoundedBoxGeometry(0.44, 0.44, 0.05, 2, 0.02)
  backGeo.rotateX(0.1)
  backGeo.translate(0, 0.8, 0.22)
  const postGeo = new CylinderGeometry(0.025, 0.025, 0.38, 10)
  postGeo.translate(0, 0.26, 0)
  const baseGeo = new CylinderGeometry(0.26, 0.26, 0.03, 24)
  baseGeo.translate(0, 0.05, 0)
  group.add(instanced(seatGeo, mat.chair, count, chairAt))
  group.add(instanced(backGeo, mat.chair, count, chairAt))
  group.add(instanced(postGeo, mat.steel, count, chairAt))
  group.add(instanced(baseGeo, mat.steel, count, chairAt))

  const screenGeo = new PlaneGeometry(0.54, 0.32)
  placements.forEach((p, i) => {
    const screen = new Mesh(screenGeo)
    screen.position.set(p.x, DESK_H + 0.31, p.z - 0.25 + 0.0185)
    screen.rotation.x = -0.08
    group.add(screen)
    const row = ROWS[Math.floor(i / 8)].id
    seats.push({ id: `${row}${(i % 8) + 1}`, order: i, x: p.x, z: p.z, screen })
  })

  group.add(solid(new BoxGeometry(3.52, 2.02, 0.03), mat.mullion, 0, 1.75, -4.19))
  const front = new Mesh(new PlaneGeometry(3.4, 1.9), mat.board)
  front.position.set(0, 1.75, -4.17)
  group.add(front)

  group.add(solid(new RoundedBoxGeometry(1.7, 0.05, 0.75, 2, 0.012), mat.top, 3.7, DESK_H - 0.025, -3.3))
  group.add(solid(new BoxGeometry(1.6, DESK_H - 0.05, 0.03), mat.frame, 3.7, (DESK_H - 0.05) / 2, -2.95))
  const teacherScreen = solid(new RoundedBoxGeometry(0.58, 0.36, 0.035, 2, 0.01), mat.bezel, 3.7, DESK_H + 0.31, -3.1)
  teacherScreen.rotation.y = Math.PI
  group.add(teacherScreen)
  const teacherChair = new Group()
  teacherChair.add(
    solid(seatGeo, mat.chair, 0, 0, 0),
    solid(backGeo, mat.chair, 0, 0, 0),
    solid(postGeo, mat.steel, 0, 0, 0),
    solid(baseGeo, mat.steel, 0, 0, 0),
  )
  teacherChair.position.set(3.7, 0, -3.85)
  teacherChair.rotation.y = Math.PI
  group.add(teacherChair)

  const clock = new Group()
  clock.position.set(-3.7, 2.3, -4.19)
  const rim = new Mesh(new CylinderGeometry(0.3, 0.3, 0.04, 40), mat.mullion)
  rim.rotation.x = Math.PI / 2
  const face = new Mesh(new CircleGeometry(0.27, 40), mat.clock)
  face.position.z = 0.021
  const hourHand = new Mesh(new BoxGeometry(0.022, 0.15, 0.01), mat.mullion)
  hourHand.geometry.translate(0, 0.065, 0)
  hourHand.position.z = 0.03
  const minuteHand = new Mesh(new BoxGeometry(0.014, 0.23, 0.01), mat.mullion)
  minuteHand.geometry.translate(0, 0.1, 0)
  minuteHand.position.z = 0.036
  clock.add(rim, face, hourHand, minuteHand)
  group.add(clock)

  const marker = new Mesh(
    new RingGeometry(0.46, 0.53, 48),
    new MeshBasicMaterial({ color: '#ff4d4f', transparent: true, opacity: 0, depthWrite: false }),
  )
  const b3 = seats.find((s) => s.id === 'B3')
  marker.position.set(b3?.x ?? 0, 0.012, (b3?.z ?? 0) + 0.58)
  marker.rotation.x = -Math.PI / 2
  group.add(marker)

  const anchor = (id: string) => {
    const s = seats.find((seat) => seat.id === id)
    return new Vector3(s?.x ?? 0, DESK_H + 0.62, (s?.z ?? 0) - 0.25)
  }

  return {
    group,
    seats,
    front,
    board: mat.board,
    outside,
    clock: { hour: hourHand, minute: minuteHand },
    marker,
    anchors: { B3: anchor('B3'), C6: anchor('C6'), A6: anchor('A6') },
  }
}
