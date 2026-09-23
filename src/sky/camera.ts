export type Vec3 = [number, number, number]

export const PLANET_RADIUS = 6360

export type View = {
  altitude: number
  vfov: number
  yaw: number
  pitch: number
  roll: number
  sunAzimuth: number
  sunAboveLimb: number
}

const rad = (deg: number) => (deg * Math.PI) / 180

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]

function rotate(v: Vec3, axis: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const k = cross(axis, v)
  const d = dot(axis, v) * (1 - c)
  return [
    v[0] * c + k[0] * s + axis[0] * d,
    v[1] * c + k[1] * s + axis[1] * d,
    v[2] * c + k[2] * s + axis[2] * d,
  ]
}

export function limbDip(altitude: number): number {
  return (Math.acos(PLANET_RADIUS / (PLANET_RADIUS + altitude)) * 180) / Math.PI
}

export function frame(view: View) {
  let forward: Vec3 = [0, 0, -1]
  let up: Vec3 = [0, 1, 0]
  let right: Vec3 = [1, 0, 0]

  const yawAxis: Vec3 = [0, 1, 0]
  forward = rotate(forward, yawAxis, -rad(view.yaw))
  right = rotate(right, yawAxis, -rad(view.yaw))

  forward = rotate(forward, right, -rad(view.pitch))
  up = rotate(up, right, -rad(view.pitch))

  right = rotate(right, forward, rad(view.roll))
  up = rotate(up, forward, rad(view.roll))

  const elevation = rad(-limbDip(view.altitude) + view.sunAboveLimb)
  const azimuth = rad(view.sunAzimuth)
  const sun: Vec3 = [
    Math.sin(azimuth) * Math.cos(elevation),
    Math.sin(elevation),
    -Math.cos(azimuth) * Math.cos(elevation),
  ]

  return {
    camera: [0, PLANET_RADIUS + view.altitude, 0] as Vec3,
    forward,
    right,
    up,
    sun,
    tanHalf: Math.tan(rad(view.vfov) / 2),
  }
}
