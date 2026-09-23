import { BoxGeometry, CylinderGeometry, Group, InstancedMesh, Mesh, Object3D, PlaneGeometry } from 'three'
import type { BufferGeometry } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { instanced, merge } from './parts'
import { seatedFigure } from './figure'
import type { SeatState } from './seating'
import type { Palette } from './palette'

export const ROWS = [
  { id: 'A', z: -2.3 },
  { id: 'B', z: -0.4 },
  { id: 'C', z: 1.5 },
] as const

export const SEAT_X = [-4.4, -3.45, -2.5, -1.55, 1.55, 2.5, 3.45, 4.4]
export const DESK_H = 0.74
export const TEACHER = { x: 3.7, z: -3.3 }

const BENCH_X = [-2.975, 2.975]
const BENCH_W = 3.9
const BENCH_D = 0.74
const TOP = 0.034
const SCREEN_Y = 0.34
const SCREEN_Z = -0.25
const TILT = -0.08
const SEAT_TOP = 0.53

export type Seat = { id: string; order: number; x: number; z: number; screen: Mesh }

function benchFrame() {
  const under = DESK_H - TOP
  const parts: BufferGeometry[] = []
  for (const fx of [-1.88, 0, 1.88]) {
    for (const fz of [-0.3, 0.3]) {
      const post = new BoxGeometry(0.05, under - 0.07, 0.05)
      post.translate(fx, 0.03 + (under - 0.07) / 2, fz)
      parts.push(post)
    }
    const foot = new BoxGeometry(0.055, 0.03, 0.7)
    foot.translate(fx, 0.015, 0)
    const rail = new BoxGeometry(0.05, 0.04, 0.66)
    rail.translate(fx, under - 0.02, 0)
    parts.push(foot, rail)
  }
  const beam = new BoxGeometry(BENCH_W - 0.14, 0.05, 0.03)
  beam.translate(0, under - 0.045, -0.29)
  parts.push(beam)
  return merge(parts)
}

// Local to the spot on the desk under the middle of the screen, facing +z.
function monitorBody() {
  const panel = new RoundedBoxGeometry(0.6, 0.36, 0.022, 2, 0.007)
  const back = new RoundedBoxGeometry(0.4, 0.24, 0.03, 2, 0.01)
  back.translate(0, 0, -0.024)
  const head = merge([panel, back])
  head.rotateX(TILT)
  head.translate(0, SCREEN_Y, 0)
  const neck = new RoundedBoxGeometry(0.05, 0.3, 0.02, 1, 0.006)
  neck.rotateX(-0.12)
  neck.translate(0, 0.16, -0.03)
  const base = new RoundedBoxGeometry(0.23, 0.012, 0.16, 2, 0.005)
  base.translate(0, 0.006, -0.03)
  return merge([head, neck, base])
}

function peripherals() {
  const keyboard = new RoundedBoxGeometry(0.44, 0.016, 0.14, 2, 0.005)
  keyboard.translate(0, 0.008, 0.33)
  const mouse = new RoundedBoxGeometry(0.06, 0.024, 0.1, 2, 0.011)
  mouse.translate(0.3, 0.012, 0.35)
  return merge([keyboard, mouse])
}

// A task chair on a five-star base, local to the floor under its column, facing -z.
function chairParts() {
  const frame: BufferGeometry[] = []
  for (let k = 0; k < 5; k += 1) {
    const a = (k / 5) * Math.PI * 2
    const leg = new BoxGeometry(0.042, 0.03, 0.27)
    leg.translate(0, 0, 0.165)
    leg.rotateX(0.09)
    leg.translate(0, 0.085, 0)
    leg.rotateY(a)
    const caster = new CylinderGeometry(0.026, 0.026, 0.03, 12)
    caster.rotateZ(Math.PI / 2)
    caster.translate(0, 0.026, 0.3)
    caster.rotateY(a)
    frame.push(leg, caster)
  }
  const hub = new CylinderGeometry(0.045, 0.055, 0.06, 16)
  hub.translate(0, 0.09, 0)
  const sleeve = new CylinderGeometry(0.03, 0.034, 0.16, 14)
  sleeve.translate(0, 0.2, 0)
  const column = new CylinderGeometry(0.02, 0.02, 0.18, 12)
  column.translate(0, 0.36, 0)
  const mechanism = new RoundedBoxGeometry(0.22, 0.045, 0.24, 1, 0.012)
  mechanism.translate(0, 0.44, 0.01)
  const arm = new BoxGeometry(0.06, 0.025, 0.2)
  arm.translate(0, 0.44, 0.15)
  const spine = new BoxGeometry(0.06, 0.3, 0.025)
  spine.translate(0, 0.58, 0.25)
  frame.push(hub, sleeve, column, mechanism, arm, spine)

  const seat = new RoundedBoxGeometry(0.48, 0.07, 0.46, 2, 0.03)
  seat.translate(0, 0.495, 0)
  const back = new RoundedBoxGeometry(0.44, 0.42, 0.055, 2, 0.025)
  const position = back.attributes.position
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i)
    position.setZ(i, position.getZ(i) - 0.9 * x * x)
  }
  back.rotateX(0.1)
  back.translate(0, 0.86, 0.265)

  return { frame: merge(frame), fabric: merge([seat, back]) }
}

export function buildFurniture(p: Palette) {
  const group = new Group()
  const benches = BENCH_X.length * ROWS.length
  const benchAt = (o: Object3D, i: number) => {
    o.position.set(BENCH_X[i % 2], 0, ROWS[Math.floor(i / 2)].z - 0.04)
  }
  const top = new RoundedBoxGeometry(BENCH_W, TOP, BENCH_D, 2, 0.01)
  top.translate(0, DESK_H - TOP / 2, 0)
  group.add(instanced(top, p.desk, benches, benchAt))
  group.add(instanced(benchFrame(), p.steel, benches, benchAt))

  const spots = ROWS.flatMap((row) => SEAT_X.map((x) => ({ x, z: row.z, row: row.id })))
  const teacherSpot = { x: TEACHER.x, z: TEACHER.z + 0.2, yaw: Math.PI }
  const screenAt = (o: Object3D, i: number) => {
    const spot = spots[i] ?? teacherSpot
    o.position.set(spot.x, DESK_H, spot.z + (i < spots.length ? SCREEN_Z : 0))
    o.rotation.y = i < spots.length ? 0 : teacherSpot.yaw
  }
  group.add(instanced(monitorBody(), p.plastic, spots.length + 1, screenAt))
  group.add(instanced(peripherals(), p.keys, spots.length + 1, screenAt))

  const screenGeo = new PlaneGeometry(0.575, 0.337)
  const seats: Seat[] = spots.map((spot, i) => {
    const screen = new Mesh(screenGeo)
    screen.position.set(spot.x, DESK_H + SCREEN_Y + 0.001, spot.z + SCREEN_Z + 0.0125)
    screen.rotation.x = TILT
    group.add(screen)
    return { id: `${spot.row}${(i % SEAT_X.length) + 1}`, order: i, x: spot.x, z: spot.z, screen }
  })

  const { frame, fabric } = chairParts()
  const chairCount = seats.length + 1
  const chairFrames = new InstancedMesh(frame, p.chairFrame, chairCount)
  const chairSeats = new InstancedMesh(fabric, p.fabric, chairCount)
  for (const mesh of [chairFrames, chairSeats]) {
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
  }
  const people = new InstancedMesh(seatedFigure(), p.clay, seats.length)
  people.castShadow = true
  people.receiveShadow = true
  group.add(people)

  const dummy = new Object3D()
  const placeChair = (i: number, x: number, z: number, yaw: number) => {
    dummy.position.set(x, 0, z)
    dummy.rotation.set(0, yaw, 0)
    dummy.scale.setScalar(1)
    dummy.updateMatrix()
    chairFrames.setMatrixAt(i, dummy.matrix)
    chairSeats.setMatrixAt(i, dummy.matrix)
  }
  // People grow out of the seat rather than out of the floor.
  const placeSeat = (i: number, { x, z, yaw, presence }: SeatState) => {
    placeChair(i, x, z, yaw)
    const size = Math.max(presence, 0.0001)
    dummy.position.set(x, SEAT_TOP * (1 - size), z)
    dummy.scale.setScalar(size)
    dummy.updateMatrix()
    people.setMatrixAt(i, dummy.matrix)
  }
  const commitSeats = () => {
    chairFrames.instanceMatrix.needsUpdate = true
    chairSeats.instanceMatrix.needsUpdate = true
    people.instanceMatrix.needsUpdate = true
  }
  placeChair(seats.length, TEACHER.x, TEACHER.z - 0.55, Math.PI)

  return { group, seats, placeSeat, commitSeats }
}
