import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

type Nav = Navigator & { deviceMemory?: number }

/**
 * Whether this machine should get the WebGL scenes at all. Labs run on recycled
 * hardware and the site is read on phones over a hotspot, so the heavy path is
 * opt-in on evidence rather than opt-out on failure.
 */
export function useRichScenes(): boolean {
  const reduced = useReducedMotion()
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    if (reduced) {
      setCapable(false)
      return
    }

    const nav = navigator as Nav
    if ((nav.deviceMemory ?? 8) < 4) return
    if ((nav.hardwareConcurrency ?? 8) < 4) return
    if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 640) return

    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return

    const lose = gl.getExtension('WEBGL_lose_context')
    lose?.loseContext()
    setCapable(true)
  }, [reduced])

  return capable
}
