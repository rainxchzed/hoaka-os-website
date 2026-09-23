import { Group, Mesh, MeshBasicMaterial, RingGeometry, Vector3 } from 'three'
import { createPalette } from './palette'
import { buildShell } from './shell'
import { DESK_H, buildFurniture } from './furniture'
import { buildFixtures } from './fixtures'

export function buildRoom() {
  const palette = createPalette()
  const shell = buildShell(palette)
  const furniture = buildFurniture(palette)
  const fixtures = buildFixtures(palette)
  const group = new Group()
  group.add(shell.group, furniture.group, fixtures.group)

  const seatOf = (id: string) => furniture.seats.find((seat) => seat.id === id)

  const marker = new Mesh(
    new RingGeometry(0.46, 0.53, 48),
    new MeshBasicMaterial({ color: '#ff4d4f', transparent: true, opacity: 0, depthWrite: false }),
  )
  const b3 = seatOf('B3')
  marker.position.set(b3?.x ?? 0, 0.012, (b3?.z ?? 0) + 0.66)
  marker.rotation.x = -Math.PI / 2
  group.add(marker)

  const anchor = (id: string) => {
    const seat = seatOf(id)
    return new Vector3(seat?.x ?? 0, DESK_H + 0.62, (seat?.z ?? 0) - 0.25)
  }

  return {
    group,
    seats: furniture.seats,
    front: fixtures.front,
    board: palette.board,
    outside: shell.outside,
    clock: fixtures.clock,
    marker,
    anchors: { B3: anchor('B3'), C6: anchor('C6'), A6: anchor('A6') },
    seating: { place: furniture.placeSeat, commit: furniture.commitSeats },
  }
}
