import { useEffect, useRef } from 'react'
import { SKY_FRAG, SKY_VERT } from './shader'
import { frame } from './camera'
import type { View } from './camera'
import styles from './Sky.module.css'

const BASE: View = {
  altitude: 120,
  vfov: 44,
  yaw: 0,
  pitch: 0.2,
  roll: 8,
  sunAzimuth: 25,
  sunAboveLimb: 0.02,
}

const RISE = { from: -5.5, to: 0.02, delay: 250, duration: 6200 }
const DUSK_TO = -4.2
const PIXEL_BUDGET = 1_200_000
const NAVY_LIFT: [number, number, number] = [0.0016, 0.0034, 0.011]

type Zone = { el: HTMLElement; phase: 'dawn' | 'dusk'; visible: boolean }

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function compile(gl: WebGL2RenderingContext) {
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)
    if (!s) throw new Error('shader allocation failed')
    gl.shaderSource(s, source)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) ?? 'shader compile failed')
    }
    return s
  }
  const program = gl.createProgram()
  if (!program) throw new Error('program allocation failed')
  gl.attachShader(program, shader(gl.VERTEX_SHADER, SKY_VERT))
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, SKY_FRAG))
  gl.bindAttribLocation(program, 0, 'aPos')
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? 'program link failed')
  }
  return program
}

export function Sky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = document.documentElement
    if (!canvas) return
    if (!document.querySelector('[data-sky]')) {
      canvas.hidden = true
      return
    }

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    if (!gl) {
      root.dataset.skyMode = 'static'
      return
    }

    let program: WebGLProgram
    try {
      program = compile(gl)
    } catch (error) {
      console.error('Hoaka sky: falling back to the static poster.', error)
      root.dataset.skyMode = 'static'
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.useProgram(program)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const loc = {
      res: u('uRes'),
      cam: u('uCam'),
      right: u('uRight'),
      up: u('uUp'),
      forward: u('uForward'),
      tanHalf: u('uTanHalf'),
      sun: u('uSun'),
      exposure: u('uExposure'),
      lift: u('uLift'),
      seed: u('uSeed'),
    }
    gl.uniform3f(loc.lift, ...NAVY_LIFT)
    gl.uniform1f(loc.exposure, 1.6)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    const zones: Zone[] = Array.from(document.querySelectorAll<HTMLElement>('[data-sky]')).map(
      (el) => ({ el, phase: el.dataset.sky === 'dusk' ? 'dusk' : 'dawn', visible: false }),
    )

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const zone = zones.find((z) => z.el === entry.target)
        if (zone) zone.visible = entry.isIntersecting
      }
      dirty = true
    })
    zones.forEach((z) => observer.observe(z.el))

    let quality = 1
    let dirty = true
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cssW = window.innerWidth
      const cssH = window.innerHeight
      const scale = Math.min(dpr, Math.sqrt(PIXEL_BUDGET / (cssW * cssH))) * quality
      canvas.width = Math.max(1, Math.round(cssW * scale))
      canvas.height = Math.max(1, Math.round(cssH * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(loc.res, canvas.width, canvas.height)
      dirty = true
    }
    resize()
    window.addEventListener('resize', resize)

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 }
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    if (finePointer && !reduced) window.addEventListener('pointermove', onPointer, { passive: true })

    const start = performance.now()
    let last = ''
    let frameId = 0
    let slowFrames = 0
    let lastTick = start

    const viewFor = (now: number): View | null => {
      let best: Zone | null = null
      let bestArea = 0
      let bestRect: DOMRect | null = null
      for (const zone of zones) {
        if (!zone.visible) continue
        const rect = zone.el.getBoundingClientRect()
        const area = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        if (area > bestArea) {
          best = zone
          bestArea = area
          bestRect = rect
        }
      }
      if (!best || !bestRect) return null

      const view = { ...BASE }
      // Portrait screens stack the copy taller and see less sky sideways: lower the
      // limb and bring the sun inside the narrower field of view.
      if (window.innerWidth / window.innerHeight < 0.85) {
        view.vfov = 50
        view.pitch -= 12.5
        view.roll = 5
        view.sunAzimuth = 9
      }
      if (best.phase === 'dawn') {
        const rise = reduced ? 1 : easeOut(clamp((now - start - RISE.delay) / RISE.duration))
        const out = clamp(-bestRect.top / Math.max(bestRect.height, 1))
        view.sunAboveLimb = RISE.from + (RISE.to - RISE.from) * rise + (reduced ? 0 : out * 0.9)
        view.pitch = BASE.pitch - (reduced ? 0 : out * 3.5)
      } else {
        const into = reduced
          ? 1
          : clamp((window.innerHeight - bestRect.top) / (window.innerHeight + bestRect.height * 0.4))
        view.sunAboveLimb = BASE.sunAboveLimb + (DUSK_TO - BASE.sunAboveLimb) * into
      }

      pointer.sx += (pointer.x - pointer.sx) * 0.05
      pointer.sy += (pointer.y - pointer.sy) * 0.05
      view.yaw += pointer.sx * 1.3
      view.pitch += pointer.sy * 0.7
      return view
    }

    const draw = (view: View, now: number) => {
      const f = frame(view)
      gl.uniform3f(loc.cam, ...f.camera)
      gl.uniform3f(loc.right, ...f.right)
      gl.uniform3f(loc.up, ...f.up)
      gl.uniform3f(loc.forward, ...f.forward)
      gl.uniform3f(loc.sun, ...f.sun)
      gl.uniform1f(loc.tanHalf, f.tanHalf)
      gl.uniform1f(loc.seed, (now % 1000) * 0.37)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick)
      const delta = now - lastTick
      lastTick = now

      const view = viewFor(now)
      if (!view) return

      const key = [view.sunAboveLimb, view.pitch, view.yaw].map((n) => n.toFixed(4)).join('|')
      if (key === last && !dirty) return
      last = key
      dirty = false
      draw(view, now)

      // Drop resolution when the GPU cannot keep up; the sky is smooth enough to take it.
      if (delta > 26 && quality > 0.55) {
        slowFrames += 1
        if (slowFrames > 12) {
          quality *= 0.8
          slowFrames = 0
          resize()
        }
      } else {
        slowFrames = 0
      }
    }

    root.dataset.skyMode = 'live'
    frameId = requestAnimationFrame(tick)

    const onLost = (event: Event) => {
      event.preventDefault()
      cancelAnimationFrame(frameId)
      root.dataset.skyMode = 'static'
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      delete root.dataset.skyMode
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={styles.sky} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
    </>
  )
}
