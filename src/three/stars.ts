import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
} from 'three'

const vertex = /* glsl */ `
attribute float aSize;
attribute float aSeed;
attribute vec3 aTint;

uniform float uTime;
uniform float uPixelRatio;

varying float vAlpha;
varying vec3 vTint;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;

  float twinkle = 0.62 + 0.38 * sin(uTime * (0.4 + aSeed * 1.7) + aSeed * 42.0);
  vAlpha = twinkle;
  vTint = aTint;

  gl_PointSize = aSize * uPixelRatio * (36.0 / -mv.z);
}
`

const fragment = /* glsl */ `
precision mediump float;

varying float vAlpha;
varying vec3 vTint;

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  if (r > 0.5) discard;

  float core = smoothstep(0.5, 0.0, r);
  float halo = smoothstep(0.5, 0.12, r);
  gl_FragColor = vec4(vTint, (core * 0.85 + halo * 0.35) * vAlpha);
}
`

/** Tints drawn from the wallpapers: mostly cold white, a few warm and a few blue. */
const TINTS: readonly [number, number, number][] = [
  [1, 1, 1],
  [0.94, 0.96, 1],
  [0.86, 0.92, 1],
  [1, 0.93, 0.83],
  [1, 0.86, 0.72],
  [0.78, 0.88, 1],
]

export type StarField = {
  points: Points
  update: (time: number) => void
  dispose: () => void
}

export function createStars(count: number, spread: number, seed = 1): StarField {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)
  const tints = new Float32Array(count * 3)

  let rng = seed * 9301 + 49297

  const random = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }

  for (let i = 0; i < count; i += 1) {
    // Rejection-free spherical shell, pushed outward so nothing sits on the camera.
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    const radius = spread * (0.55 + 0.45 * random())

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

    const bright = random()
    sizes[i] = bright > 0.985 ? 3.4 : bright > 0.9 ? 1.9 : 1.05
    seeds[i] = random()

    const tint = TINTS[Math.floor(random() * TINTS.length)] ?? TINTS[0]
    tints[i * 3] = tint[0]
    tints[i * 3 + 1] = tint[1]
    tints[i * 3 + 2] = tint[2]
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
  geometry.setAttribute('aTint', new BufferAttribute(tints, 3))

  const uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 2) },
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  })

  const points = new Points(geometry, material)

  return {
    points,
    update(time) {
      uniforms.uTime.value = time
      points.rotation.y = time * 0.004
    },
    dispose() {
      geometry.dispose()
      material.dispose()
    },
  }
}
