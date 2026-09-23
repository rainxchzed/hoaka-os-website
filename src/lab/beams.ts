import { AdditiveBlending, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Mesh, ShaderMaterial, Vector3 } from 'three'
import { GLASS_X, HEAD, ROOM, SILL, TRANSOM, WINDOWS } from './shell'

const LENGTH = 9
const INSET = 0.06

// Every pane of glass as a prism whose far end the shader pushes along the sunlight.
function paneRects() {
  return WINDOWS.flatMap(([a, b]) => {
    const zc = (a + b) / 2
    return [
      [SILL + INSET, TRANSOM, a + INSET, zc - 0.03],
      [SILL + INSET, TRANSOM, zc + 0.03, b - INSET],
      [TRANSOM + 0.05, HEAD - INSET, a + INSET, b - INSET],
    ]
  })
}

function prisms() {
  const positions: number[] = []
  const far: number[] = []
  const index: number[] = []
  for (const [y0, y1, z0, z1] of paneRects()) {
    const ring = [
      [y0, z0],
      [y0, z1],
      [y1, z1],
      [y1, z0],
    ]
    const first = positions.length / 3
    for (const end of [0, 1]) {
      for (const [y, z] of ring) {
        positions.push(GLASS_X, y, z)
        far.push(end)
      }
    }
    for (let e = 0; e < 4; e += 1) {
      const a0 = first + e
      const a1 = first + ((e + 1) % 4)
      index.push(a0, a1, a1 + 4, a0, a1 + 4, a0 + 4)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aFar', new Float32BufferAttribute(far, 1))
  geometry.setIndex(index)
  return geometry
}

export function buildBeams() {
  const material = new ShaderMaterial({
    uniforms: {
      uDir: { value: new Vector3(1, -0.4, 0).normalize() },
      uColor: { value: new Color('#ffcf9e') },
      uStrength: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aFar;
      uniform vec3 uDir;
      varying float vFar;
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position + uDir * aFar * ${LENGTH.toFixed(1)}, 1.0);
        vWorld = world.xyz;
        vFar = aFar;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uStrength;
      uniform float uTime;
      varying float vFar;
      varying vec3 vWorld;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
          mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
          f.z
        );
      }

      void main() {
        // Light only exists inside the room; the prisms run on through the floor.
        if (vWorld.y < 0.0 || vWorld.x > ${ROOM.right.toFixed(2)} || vWorld.z < ${ROOM.front.toFixed(2)} || vWorld.z > ${ROOM.back.toFixed(2)}) discard;
        // Sides seen edge-on fade out, so the shaft has no hard outline.
        vec3 n = cross(dFdx(vWorld), dFdy(vWorld));
        float area = length(n);
        float facing = area > 1e-10 ? smoothstep(0.05, 0.75, abs(dot(n / area, normalize(cameraPosition - vWorld)))) : 0.0;
        float along = smoothstep(0.0, 0.04, vFar) * pow(clamp(1.0 - vFar, 0.0, 1.0), 1.7);
        float dust = 0.7 + 0.6 * noise(vWorld * 2.4 + vec3(0.0, uTime * 0.05, uTime * 0.03));
        gl_FragColor = vec4(uColor * uStrength * facing * along * dust, 1.0);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  })
  const mesh = new Mesh(prisms(), material)
  mesh.frustumCulled = false
  mesh.renderOrder = 2
  return { mesh, material }
}
