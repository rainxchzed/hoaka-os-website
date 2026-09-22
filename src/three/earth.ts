import {
  AdditiveBlending,
  BackSide,
  Color,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from 'three'
import { SIMPLEX_3D } from './noise'

const SUN = new Vector3(0.94, 0.30, 0.16).normalize()

const surfaceVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vObject;

void main() {
  vObject = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

const surfaceFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uOcean;
uniform vec3 uOceanDeep;
uniform vec3 uLand;
uniform vec3 uRim;
uniform vec3 uLight;
uniform vec3 uSun;
uniform float uLightPulse;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vObject;

${SIMPLEX_3D}

void main() {
  vec3 p = normalize(vObject);

  // Continents. Two bands of fbm so coastlines are not uniformly fractal.
  float base = fbm(p * 1.55 + vec3(11.3, 4.1, 7.7), 6);
  float detail = fbm(p * 5.2 + vec3(2.0, 9.4, 1.1), 4);
  float height = base + detail * 0.18;
  float land = smoothstep(0.02, 0.14, height);

  // Polar ice, so the sphere reads as a planet and not as marble.
  float ice = smoothstep(0.76, 0.93, abs(p.y));
  land = max(land, ice);

  float depth = smoothstep(-0.35, 0.05, height);
  vec3 sea = mix(uOceanDeep, uOcean, depth);
  vec3 albedo = mix(sea, uLand, land);
  albedo = mix(albedo, vec3(0.78, 0.85, 0.94), ice * 0.7);

  float lambert = dot(normalize(vNormalW), normalize(uSun));
  float day = smoothstep(-0.18, 0.32, lambert);

  // Cities: high frequency scatter, on land only, away from the poles.
  float grain = fbm(p * 26.0 + vec3(3.7, 1.2, 8.8), 3);
  float cluster = smoothstep(0.30, 0.78, fbm(p * 4.4 + vec3(5.5), 3) + 0.25);
  float twinkle = 0.72 + 0.28 * sin(uTime * 1.6 + grain * 34.0);
  float cities =
    smoothstep(0.30, 0.56, grain) *
    land * cluster *
    (1.0 - ice) *
    (1.0 - day) *
    twinkle * uLightPulse;

  vec3 lit = albedo * (0.045 + 0.955 * day);
  lit += uLight * cities * 2.1;

  // Terminator warmth, and a fresnel rim that survives on the night limb.
  float terminator = exp(-pow(abs(lambert) * 5.6, 2.0));
  lit += uRim * terminator * 0.30;

  float fres = pow(1.0 - max(dot(normalize(vViewDir), normalize(vNormalW)), 0.0), 5.0);
  lit += uRim * fres * (0.18 + 0.85 * day);

  gl_FragColor = vec4(lit, 1.0);
  #include <colorspace_fragment>
}
`

const glowVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

const glowFragment = /* glsl */ `
precision highp float;

uniform vec3 uRim;
uniform vec3 uSun;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  float fres = pow(1.0 - max(dot(normalize(vViewDir), normalize(vNormalW)), 0.0), 4.2);
  float lambert = smoothstep(-0.5, 0.5, dot(normalize(vNormalW), normalize(uSun)));
  float alpha = fres * (0.08 + 0.92 * lambert);
  gl_FragColor = vec4(uRim, alpha * 0.95);
}
`

export type EarthParts = {
  surface: Mesh
  glow: Mesh
  update: (time: number, lightPulse: number) => void
  dispose: () => void
}

export function createEarth(radius = 1): EarthParts {
  const surfaceUniforms = {
    uTime: { value: 0 },
    uOcean: { value: new Color('#12395e') },
    uOceanDeep: { value: new Color('#071a30') },
    uLand: { value: new Color('#1d4a52') },
    uRim: { value: new Color('#5fb4ea') },
    uLight: { value: new Color('#ffcf94') },
    uSun: { value: SUN.clone() },
    uLightPulse: { value: 1 },
  }

  const surface = new Mesh(
    new SphereGeometry(radius, 160, 160),
    new ShaderMaterial({
      uniforms: surfaceUniforms,
      vertexShader: surfaceVertex,
      fragmentShader: surfaceFragment,
    }),
  )

  const glow = new Mesh(
    new SphereGeometry(radius * 1.04, 96, 96),
    new ShaderMaterial({
      uniforms: {
        uRim: { value: new Color('#6fb3dc') },
        uSun: { value: SUN.clone() },
      },
      vertexShader: glowVertex,
      fragmentShader: glowFragment,
      transparent: true,
      blending: AdditiveBlending,
      side: BackSide,
      depthWrite: false,
    }),
  )

  return {
    surface,
    glow,
    update(time, lightPulse) {
      surfaceUniforms.uTime.value = time
      surfaceUniforms.uLightPulse.value = lightPulse
      surface.rotation.y = time * 0.018
    },
    dispose() {
      surface.geometry.dispose()
      ;(surface.material as ShaderMaterial).dispose()
      glow.geometry.dispose()
      ;(glow.material as ShaderMaterial).dispose()
    },
  }
}
