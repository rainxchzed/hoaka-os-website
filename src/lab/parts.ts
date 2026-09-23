import { BufferGeometry, Float32BufferAttribute, InstancedMesh, Mesh, Object3D } from 'three'
import type { Material } from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export type V3 = [number, number, number]
export type Face = 'px' | 'nx' | 'py' | 'ny' | 'pz' | 'nz'
export type Skin = { all: Material } & Partial<Record<Face, Material | null>>

type Place = (o: Object3D, i: number) => void

export function merge(parts: BufferGeometry[]) {
  const merged = mergeGeometries(parts.map((part) => (part.index ? part.toNonIndexed() : part)))
  if (!merged) throw new Error('lab: parts do not share attributes')
  return merged
}

export function instanced(geometry: BufferGeometry, material: Material, count: number, place: Place) {
  const mesh = new InstancedMesh(geometry, material, count)
  const o = new Object3D()
  for (let i = 0; i < count; i += 1) {
    o.position.set(0, 0, 0)
    o.rotation.set(0, 0, 0)
    o.scale.set(1, 1, 1)
    place(o, i)
    o.updateMatrix()
    mesh.setMatrixAt(i, o.matrix)
  }
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function solid(geometry: BufferGeometry, material: Material, x: number, y: number, z: number) {
  const mesh = new Mesh(geometry, material)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// Each face as origin + two edges; edge u × edge v points out of the box.
function faceCorners(face: Face, [x0, y0, z0]: V3, [x1, y1, z1]: V3): { o: V3; u: V3; v: V3; n: V3 } {
  switch (face) {
    case 'px':
      return { o: [x1, y0, z1], u: [0, 0, z0 - z1], v: [0, y1 - y0, 0], n: [1, 0, 0] }
    case 'nx':
      return { o: [x0, y0, z0], u: [0, 0, z1 - z0], v: [0, y1 - y0, 0], n: [-1, 0, 0] }
    case 'py':
      return { o: [x0, y1, z1], u: [x1 - x0, 0, 0], v: [0, 0, z0 - z1], n: [0, 1, 0] }
    case 'ny':
      return { o: [x0, y0, z0], u: [x1 - x0, 0, 0], v: [0, 0, z1 - z0], n: [0, -1, 0] }
    case 'pz':
      return { o: [x0, y0, z1], u: [x1 - x0, 0, 0], v: [0, y1 - y0, 0], n: [0, 0, 1] }
    case 'nz':
      return { o: [x1, y0, z0], u: [x0 - x1, 0, 0], v: [0, y1 - y0, 0], n: [0, 0, -1] }
  }
}

const FACES: Face[] = ['px', 'nx', 'py', 'ny', 'pz', 'nz']

function quad(face: Face, min: V3, max: V3) {
  const { o, u, v, n } = faceCorners(face, min, max)
  const corners = [o, add(o, u), add(add(o, u), v), add(o, v)]
  const du = unit(u)
  const dv = unit(v)
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(corners.flat(), 3))
  geometry.setAttribute('normal', new Float32BufferAttribute([...n, ...n, ...n, ...n], 3))
  // Metres along the face, so a repeating texture keeps its scale on every wall.
  geometry.setAttribute('uv', new Float32BufferAttribute(corners.flatMap((c) => [dot(c, du), dot(c, dv)]), 2))
  geometry.setIndex([0, 1, 2, 0, 2, 3])
  return geometry
}

// Collects axis-aligned boxes face by face and merges them into one mesh per material.
export class Mason {
  private readonly buckets = new Map<Material, BufferGeometry[]>()

  box(min: V3, max: V3, skin: Skin) {
    for (const face of FACES) {
      const material = skin[face] === undefined ? skin.all : skin[face]
      if (!material) continue
      const list = this.buckets.get(material) ?? []
      list.push(quad(face, min, max))
      this.buckets.set(material, list)
    }
    return this
  }

  build() {
    return [...this.buckets].map(([material, faces]) => {
      const mesh = new Mesh(mergeGeometries(faces) ?? new BufferGeometry(), material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      return mesh
    })
  }
}

function add(a: V3, b: V3): V3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function dot(a: V3, b: V3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function unit(a: V3): V3 {
  const length = Math.hypot(a[0], a[1], a[2]) || 1
  return [a[0] / length, a[1] / length, a[2] / length]
}
