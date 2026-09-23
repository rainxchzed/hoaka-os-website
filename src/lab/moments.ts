import type { ScreenState } from './screens'
import type { EmptyChairs } from './seating'
import type { BoardState } from './board'

export type MomentId = 'boot' | 'open' | 'lecture' | 'exam' | 'logout'
export type LabelId = 'interrupted' | 'noContact' | 'blocked'
type V3 = [number, number, number]

export type Moment = {
  minutes: number
  camera: { position: V3; target: V3 }
  sun: { color: string; intensity: number; position: V3 }
  hemi: { sky: string; ground: string; intensity: number }
  env: number
  outside: { top: string; bottom: string }
  beams: number
  backdrop: { zenith: string; horizon: string; glow: string }
  screens: ScreenState
  people: number
  chairs: EmptyChairs
  overrides?: Record<string, ScreenState>
  board: BoardState
  marker: boolean
  labels: { id: LabelId; seat: 'B3' | 'C6' | 'A6' }[]
}

export const MOMENTS: Record<MomentId, Moment> = {
  boot: {
    minutes: 7 * 60 + 58,
    camera: { position: [18.5, 15.5, 22.5], target: [-0.3, 0.2, -0.6] },
    sun: { color: '#ffb877', intensity: 6.4, position: [-12, 4.6, 1.2] },
    hemi: { sky: '#8ea3e6', ground: '#6b5848', intensity: 0.34 },
    env: 0.26,
    outside: { top: '#5d7fd0', bottom: '#ffc38f' },
    beams: 0.16,
    backdrop: { zenith: '#0a1640', horizon: '#1c2a5e', glow: '#ff9a5a' },
    screens: 'desktop',
    people: 0,
    chairs: 'tidy',
    board: 'clean',
    marker: false,
    labels: [],
  },
  open: {
    minutes: 9 * 60,
    camera: { position: [16, 12.5, 19.5], target: [-0.6, 0.5, -1.0] },
    sun: { color: '#ffdcb0', intensity: 4.5, position: [-11, 5.5, -1] },
    hemi: { sky: '#9db2ee', ground: '#76665a', intensity: 0.42 },
    env: 0.32,
    outside: { top: '#5f95ec', bottom: '#cfe1ff' },
    beams: 0.1,
    backdrop: { zenith: '#0c1b4b', horizon: '#1f3670', glow: '#ffcf95' },
    screens: 'browser',
    people: 0.65,
    chairs: 'tidy',
    overrides: { A6: 'blocked', C2: 'blocked' },
    board: 'notes',
    marker: false,
    labels: [{ id: 'blocked', seat: 'A6' }],
  },
  lecture: {
    minutes: 11 * 60,
    camera: { position: [4, 13.5, 25], target: [-1.4, 0.3, -1.6] },
    sun: { color: '#fff0dc', intensity: 3.7, position: [-9, 8.5, -3.5] },
    hemi: { sky: '#a8bcf2', ground: '#7a6c60', intensity: 0.46 },
    env: 0.34,
    outside: { top: '#5a93ee', bottom: '#bad6ff' },
    beams: 0.06,
    backdrop: { zenith: '#0f2358', horizon: '#24427d', glow: '#fff0d0' },
    screens: 'lecture',
    people: 1,
    chairs: 'tidy',
    board: 'lecture',
    marker: false,
    labels: [],
  },
  exam: {
    minutes: 14 * 60,
    camera: { position: [10.5, 11.5, 16.5], target: [-1.2, 1.9, -0.6] },
    sun: { color: '#ffe3c2', intensity: 4.0, position: [-10, 6.5, 3.5] },
    hemi: { sky: '#9fb3e8', ground: '#74665a', intensity: 0.4 },
    env: 0.3,
    outside: { top: '#5b8de2', bottom: '#d5e2f6' },
    beams: 0.08,
    backdrop: { zenith: '#0e2052', horizon: '#223d74', glow: '#ffdcae' },
    screens: 'exam',
    people: 1,
    chairs: 'tidy',
    overrides: { B3: 'examLeft', C6: 'off' },
    board: 'exam',
    marker: true,
    labels: [
      { id: 'interrupted', seat: 'B3' },
      { id: 'noContact', seat: 'C6' },
    ],
  },
  logout: {
    minutes: 17 * 60 + 30,
    camera: { position: [19.5, 16.5, 23.5], target: [-0.3, 0.2, -0.6] },
    sun: { color: '#ff8a45', intensity: 4.6, position: [-12, 2.4, 3.8] },
    hemi: { sky: '#4a5ca6', ground: '#6e5140', intensity: 0.22 },
    env: 0.16,
    outside: { top: '#1f2e66', bottom: '#ff9a5e' },
    beams: 0.15,
    backdrop: { zenith: '#0a1232', horizon: '#34284f', glow: '#ff7d45' },
    screens: 'desktop',
    people: 0,
    chairs: 'left',
    board: 'traces',
    marker: false,
    labels: [],
  },
}
