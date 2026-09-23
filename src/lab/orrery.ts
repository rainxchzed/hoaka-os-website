import {
  BackSide,
  BoxGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
} from 'three'

const RADIUS = 9
// Seen from an angle a sun path is an ellipse; flattening it keeps noon in frame.
const FLATTEN = 0.62
const FIRST_HOUR = 6
const LAST_HOUR = 18

// Minutes of the day to a position on the upper half of the ring: 06:00 on the
// left horizon, noon overhead, 18:00 on the right.
function angleFor(minutes: number) {
  const t = (minutes - FIRST_HOUR * 60) / ((LAST_HOUR - FIRST_HOUR) * 60)
  return Math.PI * (1 - Math.min(1, Math.max(0, t)))
}

export function buildDome() {
  const material = new ShaderMaterial({
    side: BackSide,
    uniforms: {
      uZenith: { value: new Color('#0b1740') },
      uHorizon: { value: new Color('#1a2a5c') },
      uGlow: { value: new Color('#ff9a5a') },
      uSun: { value: new Vector3() },
      uRes: { value: new Vector2(1, 1) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uZenith;
      uniform vec3 uHorizon;
      uniform vec3 uGlow;
      uniform vec3 uSun;
      uniform vec2 uRes;
      varying vec3 vWorld;

      void main() {
        vec2 uv = gl_FragCoord.xy / uRes;
        vec3 dir = normalize(vWorld - cameraPosition);
        float g = max(dot(dir, normalize(uSun - cameraPosition)), 0.0);
        vec3 col = mix(uHorizon, uZenith, smoothstep(0.0, 1.0, uv.y));
        col += uGlow * (pow(g, 140.0) * 0.55 + pow(g, 26.0) * 0.07);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  })
  const dome = new Mesh(new SphereGeometry(95, 48, 24), material)
  return { dome, material }
}

export function buildOrrery() {
  const group = new Group()
  const path = new Group()
  path.scale.y = FLATTEN
  group.add(path)
  const line = new MeshBasicMaterial({ color: '#b7cdff', transparent: true, opacity: 0.5, depthWrite: false })
  const faint = new MeshBasicMaterial({ color: '#b7cdff', transparent: true, opacity: 0.2, depthWrite: false })

  path.add(new Mesh(new TorusGeometry(RADIUS, 0.03, 6, 320, Math.PI), line))
  path.add(new Mesh(new TorusGeometry(RADIUS * 1.06, 0.012, 6, 320, Math.PI), faint))

  const horizon = new Mesh(new BoxGeometry(RADIUS * 2.5, 0.016, 0.016), faint)
  path.add(horizon)

  for (let hour = FIRST_HOUR; hour <= LAST_HOUR; hour += 1) {
    const a = angleFor(hour * 60)
    const major = hour % 6 === 0
    const tick = new Mesh(new BoxGeometry(0.03, major ? 0.9 : 0.45, 0.03), major ? line : faint)
    tick.position.set(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0)
    tick.rotation.z = a - Math.PI / 2
    tick.translateY(major ? 0.2 : 0.1)
    path.add(tick)
  }

  const sunColor = new Color('#ffe2b5').multiplyScalar(6)
  const sun = new Mesh(new SphereGeometry(0.5, 32, 16), new MeshBasicMaterial({ color: sunColor }))
  sun.scale.y = 1 / FLATTEN
  path.add(sun)

  const world = new Vector3()
  return {
    group,
    setTime(minutes: number) {
      const a = angleFor(minutes)
      sun.position.set(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0)
    },
    sunWorld() {
      return sun.getWorldPosition(world)
    },
  }
}
