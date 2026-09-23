export const SKY_VERT = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// Single scattering after Nishita: Rayleigh, Mie and an ozone layer, integrated
// along the view ray with the planet's own shadow in the air. Distances in km.
export const SKY_FRAG = /* glsl */ `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform vec3 uCam;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uForward;
uniform float uTanHalf;
uniform vec3 uSun;
uniform float uExposure;
uniform vec3 uLift;
uniform float uSeed;

const float PI = 3.14159265359;
const float RP = 6360.0;
const float RA = 6470.0;
const float HR = 12.0;
const float HM = 2.2;
const vec3 BR = vec3(5.802e-3, 13.558e-3, 33.1e-3);
const float BM = 3.996e-3;
const float BME = 4.4e-3;
const vec3 BO = vec3(0.32e-3, 0.94e-3, 0.04e-3);
const float G = 0.8;
const float SUN = 22.0;

vec2 sphere(vec3 ro, vec3 rd, float r) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - r * r;
  float h = b * b - c;
  if (h < 0.0) return vec2(-1.0, -2.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

vec3 density(float h) {
  return vec3(exp(-h / HR), exp(-h / HM), max(0.0, 1.0 - abs(h - 32.0) / 20.0));
}

vec3 extinction(vec3 od) {
  return exp(-(BR * od.x + BME * od.y + BO * od.z));
}

// Optical depth toward the sun, plus how much of the sun the planet leaves visible.
vec4 towardSun(vec3 p, vec3 s) {
  float t = sphere(p, s, RA).y;
  const int M = 6;
  float ds = t / float(M);
  vec3 od = vec3(0.0);
  for (int j = 0; j < M; j++) {
    od += density(length(p + s * ds * (float(j) + 0.5)) - RP) * ds;
  }
  float along = dot(p, s);
  float closest = along >= 0.0 ? 1e9 : length(p - s * along);
  return vec4(od, smoothstep(RP - 1.5, RP + 5.0, closest));
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i);
  float n100 = hash13(i + vec3(1, 0, 0));
  float n010 = hash13(i + vec3(0, 1, 0));
  float n110 = hash13(i + vec3(1, 1, 0));
  float n001 = hash13(i + vec3(0, 0, 1));
  float n101 = hash13(i + vec3(1, 0, 1));
  float n011 = hash13(i + vec3(0, 1, 1));
  float n111 = hash13(i + vec3(1, 1, 1));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z);
}

float fbm(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    sum += amp * noise3(p);
    p = p * 2.07 + vec3(1.7, 9.2, 3.1);
    amp *= 0.5;
  }
  return sum;
}

// Cloud cover on the unit sphere, domain-warped so it reads as weather, not blobs.
float cloudCover(vec3 n, int octaves) {
  vec3 q = n * 38.0;
  vec3 w = vec3(fbm(q + vec3(3.1, 0.0, 7.7), 3), fbm(q + vec3(8.4, 2.2, 1.3), 3), 0.0);
  float c = fbm(q * 1.6 + w * 2.2, octaves);
  return smoothstep(0.46, 0.74, c);
}

vec3 stars(vec3 rd, float pixel) {
  vec3 acc = vec3(0.0);
  for (int l = 0; l < 2; l++) {
    float scale = l == 0 ? 90.0 : 230.0;
    float keep = l == 0 ? 0.985 : 0.978;
    vec3 p = rd * scale;
    vec3 c = floor(p);
    float h = hash13(c + float(l) * 19.7);
    if (h < keep) continue;
    vec3 o = vec3(hash13(c + 1.3), hash13(c + 2.7), hash13(c + 4.1)) - 0.5;
    float d = length(fract(p) - 0.5 - o * 0.55) / scale;
    float size = max(pixel * 0.85, 0.00035);
    float b = pow((h - keep) / (1.0 - keep), 1.6) * (l == 0 ? 1.4 : 0.55);
    vec3 tint = mix(vec3(0.72, 0.83, 1.0), vec3(1.0, 0.88, 0.74), hash13(c + 9.1));
    acc += tint * b * exp(-(d * d) / (size * size));
  }
  return acc;
}

vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes * 2.0 - 1.0;
  float aspect = uRes.x / uRes.y;
  vec3 rd = normalize(uForward + uv.x * uTanHalf * aspect * uRight + uv.y * uTanHalf * uUp);
  vec3 ro = uCam;
  float pixel = 2.0 * uTanHalf / uRes.y;

  vec2 ta = sphere(ro, rd, RA);
  vec2 tp = sphere(ro, rd, RP);
  bool ground = tp.x > 0.0;

  float mu = dot(rd, uSun);
  float phR = 3.0 / (16.0 * PI) * (1.0 + mu * mu);
  float g2 = G * G;
  float phM = 3.0 / (8.0 * PI) * ((1.0 - g2) * (1.0 + mu * mu))
    / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * G * mu, 1e-4), 1.5));

  vec3 col = vec3(0.0);
  vec3 trans = vec3(1.0);

  if (ta.y > 0.0) {
    float t0 = max(ta.x, 0.0);
    float t1 = ground ? tp.x : ta.y;
    const int N = 20;
    float ds = (t1 - t0) / float(N);
    vec3 od = vec3(0.0);
    vec3 sumR = vec3(0.0);
    vec3 sumM = vec3(0.0);
    for (int i = 0; i < N; i++) {
      vec3 p = ro + rd * (t0 + ds * (float(i) + 0.5));
      vec3 d = density(length(p) - RP) * ds;
      od += d;
      vec4 sp = towardSun(p, uSun);
      vec3 att = extinction(od + sp.xyz) * sp.w;
      sumR += d.x * att;
      sumM += d.y * att;
    }
    trans = extinction(od);
    col = SUN * (sumR * BR * phR + sumM * BM * phM);
  }

  if (ground) {
    vec3 gp = ro + rd * tp.x;
    vec3 n = normalize(gp);
    vec4 sp = towardSun(gp + n * 0.05, uSun);
    vec3 sunT = extinction(sp.xyz) * sp.w;
    float ndl = max(dot(n, uSun), 0.0);
    float grazing = max(dot(-rd, n), 0.0);
    int octaves = grazing < 0.08 ? 3 : 5;
    float cover = cloudCover(n, octaves);
    // Sample the deck a little toward the sun: if it is higher there, this point is in its shadow.
    vec3 toward = normalize(uSun - n * dot(uSun, n));
    float ahead = cloudCover(normalize(n + toward * 0.0035), 3);
    float relief = clamp(0.55 + (cover - ahead) * 2.4, 0.0, 1.0);
    float detail = smoothstep(0.02, 0.22, grazing);
    cover *= mix(0.35, 1.0, detail);
    vec3 albedo = mix(vec3(0.010, 0.022, 0.048), vec3(0.62, 0.66, 0.72), cover);
    vec3 surface = albedo * ndl * relief * sunT * SUN / PI;
    // The night side is never quite black: airglow and starlight on the cloud deck.
    surface += mix(vec3(0.0012, 0.0022, 0.0055), vec3(0.0065, 0.0095, 0.017), cover) * (1.0 - smoothstep(-0.05, 0.1, dot(n, uSun)));
    // The ocean mirrors the sun where the geometry lines up: the glint at dawn.
    vec3 hv = normalize(uSun - rd);
    float fres = 0.02 + 0.98 * pow(1.0 - max(dot(-rd, n), 0.0), 5.0);
    surface += sunT * SUN * fres * pow(max(dot(n, hv), 0.0), 1400.0) * 0.9 * (1.0 - cover) * step(0.0, dot(n, uSun));
    col += surface * trans;
  } else {
    vec4 vis = towardSun(ro, uSun);
    float disc = smoothstep(0.999978, 0.999985, mu);
    col += trans * disc * 2200.0 * vis.w;
    col += trans * stars(rd, pixel);
    float toLimb = clamp(1.0 - (dot(rd, normalize(ro)) + 0.35) / 0.85, 0.0, 1.0);
    col += mix(vec3(0.0006, 0.0011, 0.0036), vec3(0.0022, 0.0048, 0.0145), toLimb * toLimb);
  }

  // Airglow: a thin emitting shell near 95 km, brightest where the view grazes it.
  vec2 outer = sphere(ro, rd, RP + 99.0);
  vec2 inner = sphere(ro, rd, RP + 91.0);
  float glowLen = 0.0;
  if (outer.y > 0.0) {
    float a1 = ground ? min(outer.y, tp.x) : outer.y;
    glowLen = max(a1 - max(outer.x, 0.0), 0.0);
    if (inner.y > 0.0) {
      float b1 = ground ? min(inner.y, tp.x) : inner.y;
      glowLen -= max(b1 - max(inner.x, 0.0), 0.0);
    }
  }
  col += vec3(0.30, 1.0, 0.52) * max(glowLen, 0.0) * 0.000034;

  // Lens bloom around the sun, only when the sun itself clears the limb.
  vec4 camSun = towardSun(ro, uSun);
  vec3 sunSeen = extinction(camSun.xyz) * camSun.w;
  float m = max(mu, 0.0);
  col += sunSeen * (pow(m, 9000.0) * 90.0 + pow(m, 1100.0) * 3.2 + pow(m, 90.0) * 0.24 + pow(m, 9.0) * 0.02);

  col *= uExposure;
  col = aces(col);
  col = col + uLift * (1.0 - col);
  col = pow(col, vec3(1.0 / 2.2));
  col += (hash12(gl_FragCoord.xy + uSeed) - 0.5) * (1.6 / 255.0);
  outColor = vec4(col, 1.0);
}
`
