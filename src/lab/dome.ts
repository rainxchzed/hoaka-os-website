import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from 'three'

export function buildDome() {
  const material = new ShaderMaterial({
    side: BackSide,
    uniforms: {
      uZenith: { value: new Color('#0b1740') },
      uHorizon: { value: new Color('#1a2a5c') },
      uGlow: { value: new Color('#ff9a5a') },
      uSunDir: { value: new Vector3(-1, 0.3, 0).normalize() },
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
      uniform vec3 uSunDir;
      uniform vec2 uRes;
      varying vec3 vWorld;

      void main() {
        vec2 uv = gl_FragCoord.xy / uRes;
        vec3 dir = normalize(vWorld - cameraPosition);
        float toward = max(dot(dir, uSunDir), 0.0);
        vec3 col = mix(uHorizon, uZenith, smoothstep(0.0, 1.0, uv.y));
        col += uGlow * toward * toward * (1.0 - uv.y) * 0.16;
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  })
  const dome = new Mesh(new SphereGeometry(95, 48, 24), material)
  return { dome, material }
}
