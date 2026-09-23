import {
  Color,
  DirectionalLight,
  HalfFloatType,
  HemisphereLight,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PCFSoftShadowMap,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three'
import type { Material, Mesh, Texture } from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { buildRoom } from './room'
import { buildDome } from './dome'
import { buildBeams } from './beams'
import { createSeating } from './seating'
import { screenTextures } from './screens'
import { boardMaterials } from './board'
import type { ScreenState } from './screens'
import { MOMENTS } from './moments'
import type { LabelId, MomentId } from './moments'

export type LabOptions = {
  labels: Record<LabelId, string>
  reduced: boolean
  lite: boolean
}

export type Lab = {
  setMoment: (id: MomentId) => void
  dispose: () => void
}

const SWAP_STAGGER_MS = 28
const EMISSIVE: Record<ScreenState, number> = {
  off: 0,
  desktop: 1.6,
  browser: 1.15,
  blocked: 1.1,
  lecture: 1.15,
  exam: 1.15,
  examLeft: 1.5,
}

export async function createLab(host: HTMLElement, options: LabOptions): Promise<Lab> {
  const renderer = new WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
  const maxRatio = options.lite ? 1.25 : 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxRatio))
  renderer.toneMapping = NeutralToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  // Redrawn only while the sun or the chairs move; the camera drift never changes it.
  renderer.shadowMap.autoUpdate = false
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  host.appendChild(renderer.domElement)

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap
  pmrem.dispose()

  const camera = new PerspectiveCamera(30, 1, 0.1, 400)
  const room = buildRoom()
  scene.add(room.group)

  const dome = buildDome()
  scene.add(dome.dome)

  const seating = createSeating(room.seats, room.seating.place, room.seating.commit)

  // Light shafts stay out of the AO pass, which would read them as solid.
  const beams = buildBeams()
  beams.mesh.layers.set(1)
  camera.layers.enable(1)
  scene.add(beams.mesh)
  const aoCamera = new PerspectiveCamera()

  const textures = await screenTextures()
  const screenMaterial = Object.fromEntries(
    (Object.keys(textures) as ScreenState[]).map((state) => [
      state,
      new MeshStandardMaterial({
        color: state === 'off' ? '#05070c' : '#000000',
        roughness: 0.2,
        metalness: 0,
        emissive: '#ffffff',
        emissiveMap: textures[state],
        emissiveIntensity: EMISSIVE[state],
      }),
    ]),
  ) as Record<ScreenState, MeshStandardMaterial>
  const boards = await boardMaterials()
  const lectureFront = screenMaterial.lecture.clone()
  lectureFront.emissiveIntensity = 0.85

  const sun = new DirectionalLight('#ffffff', 3)
  sun.castShadow = true
  const mapSize = options.lite ? 1024 : 2048
  sun.shadow.mapSize.set(mapSize, mapSize)
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 45 })
  sun.shadow.bias = -0.0003
  sun.shadow.normalBias = 0.025
  sun.target.position.set(0, 0, -0.4)
  const hemi = new HemisphereLight('#ffffff', '#ffffff', 0.5)
  scene.add(sun, sun.target, hemi)

  const target = new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: options.lite ? 0 : 4 })
  const composer = new EffectComposer(renderer, target)
  composer.addPass(new RenderPass(scene, camera))
  const ao = options.lite ? null : new GTAOPass(scene, aoCamera, 1, 1)
  if (ao) {
    ao.blendIntensity = 0.9
    ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.4, thickness: 1.2, scale: 1.1, samples: 10 })
    ao.updatePdMaterial({ samples: 10 })
    composer.addPass(ao)
  }
  const bloom = new UnrealBloomPass(new Vector2(1, 1), 0.26, 0.42, 1.05)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  const layer = document.createElement('div')
  layer.className = 'lab-labels'
  const labelEls = {} as Record<LabelId, HTMLDivElement>
  for (const id of Object.keys(options.labels) as LabelId[]) {
    const el = document.createElement('div')
    el.className = `lab-label lab-label--${id}`
    el.textContent = options.labels[id]
    layer.appendChild(el)
    labelEls[id] = el
  }
  host.appendChild(layer)

  let moment: MomentId = 'boot'
  const seatState = new Map<string, ScreenState>()
  const pending = new Map<string, { state: ScreenState; at: number }>()

  const start = MOMENTS.boot
  const live = {
    camPos: new Vector3(...start.camera.position),
    camTarget: new Vector3(...start.camera.target),
    sunPos: new Vector3(...start.sun.position),
    sunColor: new Color(start.sun.color),
    sunIntensity: start.sun.intensity,
    hemiSky: new Color(start.hemi.sky),
    hemiGround: new Color(start.hemi.ground),
    hemiIntensity: start.hemi.intensity,
    env: start.env,
    beams: start.beams,
    top: new Color(start.outside.top),
    bottom: new Color(start.outside.bottom),
    minutes: start.minutes,
    marker: 0,
    zenith: new Color(start.backdrop.zenith),
    horizon: new Color(start.backdrop.horizon),
    glow: new Color(start.backdrop.glow),
  }
  const goal = {
    camPos: new Vector3(),
    camTarget: new Vector3(),
    sunPos: new Vector3(),
    sunColor: new Color(),
    hemiSky: new Color(),
    hemiGround: new Color(),
    top: new Color(),
    bottom: new Color(),
    zenith: new Color(),
    horizon: new Color(),
    glow: new Color(),
  }

  const setMoment = (id: MomentId) => {
    moment = id
    const m = MOMENTS[id]
    const now = performance.now()
    for (const seat of room.seats) {
      const next = m.overrides?.[seat.id] ?? m.screens
      if (seatState.get(seat.id) === next && !pending.has(seat.id)) continue
      pending.set(seat.id, { state: next, at: now + (options.reduced ? 0 : seat.order * SWAP_STAGGER_MS) })
    }
    room.front.material = m.board === 'lecture' ? lectureFront : boards[m.board]
    seating.set(m.people, m.chairs, Object.keys(m.overrides ?? {}), now, options.reduced)
    for (const id of Object.keys(labelEls) as LabelId[]) {
      labelEls[id].dataset.on = m.labels.some((l) => l.id === id) ? 'true' : 'false'
    }
  }
  setMoment('boot')

  let width = 1
  let height = 1
  const resize = () => {
    width = Math.max(1, host.clientWidth)
    height = Math.max(1, host.clientHeight)
    renderer.setSize(width, height, false)
    composer.setSize(width, height)
    bloom.setSize(width, height)
    ao?.setSize(width, height)
    renderer.getDrawingBufferSize(dome.material.uniforms.uRes.value)
    const portrait = width / height < 0.9
    camera.aspect = width / height
    camera.fov = portrait ? 40 : 24
    if (portrait) camera.setViewOffset(width, height, 0, height * 0.2, width, height)
    else camera.setViewOffset(width, height, -width * 0.13, height * 0.03, width, height)
    camera.updateProjectionMatrix()
  }
  const sizeObserver = new ResizeObserver(resize)
  sizeObserver.observe(host)
  resize()

  let visible = false
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false
  })
  visibility.observe(host)

  const anchorOf = (seat: 'B3' | 'C6' | 'A6') => room.anchors[seat]
  const projected = new Vector3()
  let frameId = 0
  let last = performance.now()
  let slow = 0
  let first = true
  let frameCount = 0
  let seatsMoving = false

  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    if (!visible && !first) return
    const settled =
      pending.size === 0 &&
      !seatsMoving &&
      Math.abs(live.minutes - MOMENTS[moment].minutes) < 0.5 &&
      live.camPos.distanceToSquared(goal.camPos) < 0.0004
    frameCount += 1
    if (settled && !first && frameCount % 2 === 1) return

    for (const [id, swap] of pending) {
      if (now < swap.at) continue
      const seat = room.seats.find((s) => s.id === id)
      if (seat) seat.screen.material = screenMaterial[swap.state]
      seatState.set(id, swap.state)
      pending.delete(id)
    }

    const m = MOMENTS[moment]
    const k = first || options.reduced ? 1 : 1 - Math.exp(-dt * 2.3)
    goal.camPos.set(...m.camera.position)
    goal.camTarget.set(...m.camera.target)
    goal.sunPos.set(...m.sun.position)
    live.camPos.lerp(goal.camPos, k)
    live.camTarget.lerp(goal.camTarget, k)
    live.sunPos.lerp(goal.sunPos, k)
    live.sunColor.lerp(goal.sunColor.set(m.sun.color), k)
    live.hemiSky.lerp(goal.hemiSky.set(m.hemi.sky), k)
    live.hemiGround.lerp(goal.hemiGround.set(m.hemi.ground), k)
    live.top.lerp(goal.top.set(m.outside.top), k)
    live.bottom.lerp(goal.bottom.set(m.outside.bottom), k)
    live.zenith.lerp(goal.zenith.set(m.backdrop.zenith), k)
    live.horizon.lerp(goal.horizon.set(m.backdrop.horizon), k)
    live.glow.lerp(goal.glow.set(m.backdrop.glow), k)
    live.sunIntensity += (m.sun.intensity - live.sunIntensity) * k
    live.hemiIntensity += (m.hemi.intensity - live.hemiIntensity) * k
    live.env += (m.env - live.env) * k
    live.beams += (m.beams - live.beams) * k
    live.minutes += (m.minutes - live.minutes) * k
    live.marker += ((m.marker ? 1 : 0) - live.marker) * k

    const t = now / 1000
    const drift = options.reduced ? 0 : 1
    camera.position.set(
      live.camPos.x + Math.sin(t * 0.13) * 0.16 * drift,
      live.camPos.y + Math.sin(t * 0.09) * 0.07 * drift,
      live.camPos.z + Math.cos(t * 0.11) * 0.16 * drift,
    )
    camera.lookAt(live.camTarget)

    sun.position.copy(live.sunPos)
    sun.color.copy(live.sunColor)
    sun.intensity = live.sunIntensity
    hemi.color.copy(live.hemiSky)
    hemi.groundColor.copy(live.hemiGround)
    hemi.intensity = live.hemiIntensity
    scene.environmentIntensity = live.env
    room.outside.uniforms.uTop.value.copy(live.top)
    room.outside.uniforms.uBottom.value.copy(live.bottom)

    seatsMoving = seating.update(now, k)
    if (first || seatsMoving || live.sunPos.distanceToSquared(goal.sunPos) > 1e-6) renderer.shadowMap.needsUpdate = true
    beams.material.uniforms.uDir.value.copy(sun.target.position).sub(live.sunPos).normalize()
    beams.material.uniforms.uColor.value.copy(live.sunColor)
    beams.material.uniforms.uStrength.value = live.beams
    beams.material.uniforms.uTime.value = options.reduced ? 0 : t
    dome.material.uniforms.uZenith.value.copy(live.zenith)
    dome.material.uniforms.uHorizon.value.copy(live.horizon)
    dome.material.uniforms.uGlow.value.copy(live.glow)
    dome.material.uniforms.uSunDir.value.copy(live.sunPos).sub(sun.target.position).normalize()

    const hours = live.minutes / 60
    room.clock.hour.rotation.z = -((hours % 12) / 12) * Math.PI * 2
    room.clock.minute.rotation.z = -((live.minutes % 60) / 60) * Math.PI * 2

    const pulse = options.reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 3.2)
    ;(room.marker.material as MeshBasicMaterial).opacity = live.marker * pulse

    for (const label of m.labels) {
      projected.copy(anchorOf(label.seat)).project(camera)
      const el = labelEls[label.id]
      el.style.transform = `translate3d(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px, 0)`
    }

    aoCamera.copy(camera)
    aoCamera.layers.set(0)
    composer.render()
    first = false

    if (dt > 0.034 && renderer.getPixelRatio() > 1) {
      slow += 1
      if (slow > 24) {
        renderer.setPixelRatio(1)
        bloom.enabled = !options.lite
        if (ao) ao.enabled = false
        resize()
        slow = 0
      }
    } else {
      slow = 0
    }
  }
  frameId = requestAnimationFrame(tick)

  const dispose = () => {
    cancelAnimationFrame(frameId)
    sizeObserver.disconnect()
    visibility.disconnect()
    scene.traverse((object) => {
      const mesh = object as Mesh
      mesh.geometry?.dispose()
      const material = mesh.material as Material | Material[] | undefined
      if (Array.isArray(material)) material.forEach((mm) => mm.dispose())
      else material?.dispose()
    })
    Object.values(screenMaterial).forEach((mm) => mm.dispose())
    Object.values(textures).forEach((tex: Texture) => tex.dispose())
    lectureFront.dispose()
    Object.values(boards).forEach((board) => {
      board.map?.dispose()
      board.dispose()
    })
    envMap.dispose()
    target.dispose()
    ao?.dispose()
    composer.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    layer.remove()
  }

  return { setMoment, dispose }
}
