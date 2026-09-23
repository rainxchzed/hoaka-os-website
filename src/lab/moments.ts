import type { ScreenState } from './screens'

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
  screens: ScreenState
  overrides?: Record<string, ScreenState>
  front: 'board' | 'lecture'
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
    screens: 'desktop',
    front: 'board',
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
    screens: 'browser',
    overrides: { A6: 'blocked', C2: 'blocked' },
    front: 'board',
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
    screens: 'lecture',
    front: 'lecture',
    marker: false,
    labels: [],
  },
  exam: {
    minutes: 14 * 60,
    camera: { position: [10.5, 10.5, 16.5], target: [-1.2, 0.5, -0.6] },
    sun: { color: '#ffe3c2', intensity: 4.0, position: [-10, 6.5, 3.5] },
    hemi: { sky: '#9fb3e8', ground: '#74665a', intensity: 0.4 },
    env: 0.3,
    outside: { top: '#5b8de2', bottom: '#d5e2f6' },
    screens: 'exam',
    overrides: { B3: 'examLeft', C6: 'off' },
    front: 'board',
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
    screens: 'desktop',
    front: 'board',
    marker: false,
    labels: [],
  },
}
