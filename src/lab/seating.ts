import type { Seat } from './furniture'

export type EmptyChairs = 'tidy' | 'left'
export type SeatState = { x: number; z: number; yaw: number; presence: number }
type Place = (i: number, state: SeatState) => void

const STAGGER_MS = 34

function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return (s - Math.floor(s)) * 2 - 1
}

// Pushed in before the first class, pulled out while someone sits, left anyhow at the end.
function stateFor(seat: Seat, occupied: boolean, empty: EmptyChairs): SeatState {
  const a = hash(seat.order)
  const b = Math.abs(hash(seat.order + 57))
  if (occupied) return { x: seat.x + a * 0.04, z: seat.z + 0.68 + b * 0.05, yaw: a * 0.14, presence: 1 }
  if (empty === 'tidy') return { x: seat.x, z: seat.z + 0.47, yaw: 0, presence: 0 }
  return { x: seat.x + a * 0.12, z: seat.z + 0.74 + b * 0.18, yaw: a * 0.6 + (b - 0.5) * 0.3, presence: 0 }
}

// The order people arrive in, the same every day.
function arrivalRank(seats: Seat[]) {
  const rank = new Map<string, number>()
  ;[...seats]
    .sort((p, q) => hash(p.order + 101) - hash(q.order + 101))
    .forEach((seat, i) => rank.set(seat.id, i))
  return rank
}

function settledFrom(a: SeatState, b: SeatState) {
  return Math.abs(a.x - b.x) + Math.abs(a.z - b.z) + Math.abs(a.yaw - b.yaw) + Math.abs(a.presence - b.presence) < 1e-4
}

export function createSeating(seats: Seat[], place: Place, commit: () => void) {
  const rank = arrivalRank(seats)
  let live = seats.map((seat) => stateFor(seat, false, 'tidy'))
  let goal = live
  let startAt = seats.map(() => 0)
  live.forEach((state, i) => place(i, state))
  commit()

  return {
    set(people: number, empty: EmptyChairs, present: string[], now: number, reduced: boolean) {
      goal = seats.map((seat) => {
        const occupied = (rank.get(seat.id) ?? 0) < people * seats.length || present.includes(seat.id)
        return stateFor(seat, occupied, empty)
      })
      startAt = seats.map((seat) => now + (reduced ? 0 : (rank.get(seat.id) ?? 0) * STAGGER_MS))
    },
    update(now: number, k: number) {
      let moving = false
      live = live.map((state, i) => {
        const target = goal[i]
        if (now < startAt[i]) {
          moving = moving || !settledFrom(state, target)
          return state
        }
        if (settledFrom(state, target)) return state
        moving = true
        const next = {
          x: state.x + (target.x - state.x) * k,
          z: state.z + (target.z - state.z) * k,
          yaw: state.yaw + (target.yaw - state.yaw) * k,
          presence: state.presence + (target.presence - state.presence) * k,
        }
        place(i, next)
        return next
      })
      if (moving) commit()
      return moving
    },
  }
}
