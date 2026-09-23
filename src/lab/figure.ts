import { CapsuleGeometry, Quaternion, SphereGeometry, Vector3 } from 'three'
import { merge } from './parts'
import type { V3 } from './parts'

const UP = new Vector3(0, 1, 0)

function limb(radius: number, a: V3, b: V3) {
  const from = new Vector3(...a)
  const to = new Vector3(...b)
  const axis = to.clone().sub(from)
  const geometry = new CapsuleGeometry(radius, axis.length(), 3, 8)
  geometry.applyQuaternion(new Quaternion().setFromUnitVectors(UP, axis.normalize()))
  const middle = from.add(to).multiplyScalar(0.5)
  geometry.translate(middle.x, middle.y, middle.z)
  return geometry
}

// A seated scale figure, local to its chair: floor under the column, facing -z.
export function seatedFigure() {
  const torso = limb(0.14, [0, 0.66, 0.04], [0, 0.95, -0.03])
  torso.scale(1.22, 1, 0.86)
  const head = new SphereGeometry(0.1, 12, 9)
  head.scale(1, 1.12, 1)
  head.translate(0, 1.2, -0.08)
  const parts = [torso, head, limb(0.048, [0, 1.02, -0.05], [0, 1.1, -0.07])]
  for (const side of [-1, 1]) {
    parts.push(
      limb(0.075, [side * 0.1, 0.6, 0.02], [side * 0.11, 0.59, -0.36]),
      limb(0.062, [side * 0.11, 0.56, -0.38], [side * 0.1, 0.11, -0.42]),
      limb(0.05, [side * 0.1, 0.05, -0.42], [side * 0.1, 0.05, -0.53]),
      limb(0.052, [side * 0.2, 0.95, -0.03], [side * 0.21, 0.77, -0.2]),
      limb(0.045, [side * 0.21, 0.77, -0.2], [side * 0.13, 0.8, -0.52]),
    )
  }
  return merge(parts)
}
