import { BoxGeometry, CircleGeometry, CylinderGeometry, Group, Mesh, PlaneGeometry } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { Mason, solid } from './parts'
import { DESK_H, TEACHER } from './furniture'
import { ROOM } from './shell'
import type { Palette } from './palette'

const BOARD = { w: 3.24, h: 1.9, y: 1.75 }
const RIM = 0.035

function board(m: Mason, p: Palette) {
  const wall = ROOM.front
  const x0 = -BOARD.w / 2
  const x1 = BOARD.w / 2
  const y0 = BOARD.y - BOARD.h / 2
  const y1 = BOARD.y + BOARD.h / 2
  const rim = { all: p.alu, nz: null }
  m.box([x0 - RIM, y1, wall], [x1 + RIM, y1 + RIM, wall + 0.035], rim)
  m.box([x0 - RIM, y0 - RIM, wall], [x1 + RIM, y0, wall + 0.035], rim)
  m.box([x0 - RIM, y0, wall], [x0, y1, wall + 0.035], rim)
  m.box([x1, y0, wall], [x1 + RIM, y1, wall + 0.035], rim)
  m.box([x0 + 0.2, y0 - RIM - 0.02, wall], [x1 - 0.2, y0 - RIM, wall + 0.11], rim)
}

function teacherDesk(m: Mason, p: Palette) {
  const { x, z } = TEACHER
  const panel = { all: p.laminate, ny: null }
  m.box([x - 0.79, 0, z - 0.34], [x - 0.76, DESK_H - 0.034, z + 0.34], panel)
  m.box([x + 0.76, 0, z - 0.34], [x + 0.79, DESK_H - 0.034, z + 0.34], panel)
  m.box([x - 0.76, 0.26, z + 0.3], [x + 0.76, DESK_H - 0.034, z + 0.32], panel)
}

export function buildFixtures(p: Palette) {
  const group = new Group()
  const m = new Mason()
  board(m, p)
  teacherDesk(m, p)
  group.add(...m.build())

  const front = new Mesh(new PlaneGeometry(BOARD.w, BOARD.h), p.board)
  front.position.set(0, BOARD.y, ROOM.front + 0.027)
  group.add(front)

  const trayY = BOARD.y - BOARD.h / 2 - RIM
  const markers = [p.ink.blue, p.ink.red, p.ink.black]
  const pen = new CylinderGeometry(0.009, 0.009, 0.12, 8)
  pen.rotateZ(Math.PI / 2)
  markers.forEach((ink, i) => group.add(solid(pen, ink, -1.1 + i * 0.16, trayY + 0.009, ROOM.front + 0.075)))

  const top = new RoundedBoxGeometry(1.6, 0.034, 0.75, 2, 0.01)
  group.add(solid(top, p.desk, TEACHER.x, DESK_H - 0.017, TEACHER.z))

  const projector = new Group()
  projector.position.set(0, 2.86, ROOM.front)
  projector.add(
    solid(new BoxGeometry(0.04, 0.04, 0.42), p.alu, 0, 0.05, 0.21),
    solid(new RoundedBoxGeometry(0.34, 0.1, 0.26, 2, 0.02), p.pvc, 0, 0, 0.44),
  )
  const lens = solid(new CylinderGeometry(0.034, 0.034, 0.02, 20), p.plastic, 0.08, -0.005, 0.305)
  lens.rotation.x = Math.PI / 2
  projector.add(lens)
  group.add(projector)

  const ac = new Group()
  ac.position.set(4.35, 2.55, ROOM.front + 0.11)
  ac.add(
    solid(new RoundedBoxGeometry(0.92, 0.29, 0.22, 2, 0.04), p.pvc, 0, 0, 0),
    solid(new BoxGeometry(0.78, 0.022, 0.012), p.trim, 0, -0.1, 0.106),
  )
  group.add(ac)

  const clock = new Group()
  clock.position.set(-3.7, 2.3, ROOM.front + 0.02)
  const rim = new Mesh(new CylinderGeometry(0.3, 0.3, 0.04, 40), p.trim)
  rim.rotation.x = Math.PI / 2
  const face = new Mesh(new CircleGeometry(0.27, 40), p.clock)
  face.position.z = 0.021
  const hour = new Mesh(new BoxGeometry(0.022, 0.15, 0.01), p.trim)
  hour.geometry.translate(0, 0.065, 0)
  hour.position.z = 0.03
  const minute = new Mesh(new BoxGeometry(0.014, 0.23, 0.01), p.trim)
  minute.geometry.translate(0, 0.1, 0)
  minute.position.z = 0.036
  clock.add(rim, face, hour, minute)
  group.add(clock)

  return { group, front, clock: { hour, minute } }
}
