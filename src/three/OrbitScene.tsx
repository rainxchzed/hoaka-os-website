import { useEffect, useRef } from 'react'
import styles from './OrbitScene.module.css'

type Props = {
  /** Reduces the star count and drops the second layer on smaller viewports. */
  density?: number
  className?: string
}

export function OrbitScene({ density = 1, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const [three, earthMod, starMod] = await Promise.all([
        import('three'),
        import('./earth'),
        import('./stars'),
      ])
      if (disposed) return

      const { Scene, PerspectiveCamera, WebGLRenderer, Group, Vector2 } = three

      const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      host.append(renderer.domElement)

      const scene = new Scene()
      const camera = new PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0.1, 4.2)

      const planet = new Group()
      planet.rotation.z = -0.28
      planet.position.set(1.15, -1.25, 0)
      scene.add(planet)

      const earth = earthMod.createEarth(2.45)
      planet.add(earth.surface, earth.glow)

      const near = starMod.createStars(Math.round(900 * density), 14, 3)
      const far = starMod.createStars(Math.round(1500 * density), 34, 11)
      scene.add(near.points, far.points)

      const pointer = new Vector2(0, 0)
      const smoothed = new Vector2(0, 0)

      const onPointerMove = (event: PointerEvent) => {
        pointer.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          (event.clientY / window.innerHeight) * 2 - 1,
        )
      }

      const resize = () => {
        const { clientWidth, clientHeight } = host
        if (clientWidth === 0 || clientHeight === 0) return
        renderer.setSize(clientWidth, clientHeight, false)
        camera.aspect = clientWidth / clientHeight
        // Pull back on narrow screens so the limb stays inside the frame.
        // Park the limb against the trailing edge whatever the aspect, so the
        // headline always sits over empty sky rather than over the atmosphere.
        const narrow = camera.aspect < 0.9
        camera.position.z = narrow ? 6.2 : 4.2
        const halfHeight = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
        const halfWidth = halfHeight * camera.aspect
        planet.position.set(
          narrow ? halfWidth * 0.2 : halfWidth * 0.92,
          narrow ? -halfHeight * 1.5 : -halfHeight * 1.25,
          0,
        )
        camera.updateProjectionMatrix()
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(host)
      resize()

      let visible = true
      const visibility = new IntersectionObserver(
        ([entry]) => {
          visible = entry?.isIntersecting ?? true
        },
        { rootMargin: '120px' },
      )
      visibility.observe(host)

      window.addEventListener('pointermove', onPointerMove, { passive: true })

      const start = performance.now()
      let frame = 0

      const tick = (now: number) => {
        frame = requestAnimationFrame(tick)
        if (!visible || document.hidden) return

        const time = (now - start) / 1000

        // Labs coming online: the night-side lights ramp up over the first seconds.
        const pulse = Math.min(1, Math.max(0, (time - 0.4) / 3.2))

        smoothed.lerp(pointer, 0.045)
        planet.rotation.x = -smoothed.y * 0.1
        planet.rotation.y = smoothed.x * 0.06
        near.points.rotation.x = smoothed.y * 0.05
        near.points.position.x = -smoothed.x * 0.5
        far.points.position.x = -smoothed.x * 0.18

        earth.update(time, pulse * pulse * (3 - 2 * pulse))
        near.update(time)
        far.update(time * 0.6)

        renderer.render(scene, camera)
      }

      frame = requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', onPointerMove)
        resizeObserver.disconnect()
        visibility.disconnect()
        earth.dispose()
        near.dispose()
        far.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [density])

  return <div ref={hostRef} className={[styles.host, className].filter(Boolean).join(' ')} aria-hidden="true" />
}
