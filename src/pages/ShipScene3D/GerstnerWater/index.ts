import { Object3DNode } from '@react-three/fiber'
import { TextureLoader, Vector2, Vector3, RepeatWrapping, PlaneGeometry } from 'three'
import { Water } from 'three/examples/jsm/objects/Water'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gerstnerWater: Object3DNode<GerstnerWater, typeof GerstnerWater>
    }
  }
}

const SIZE = 4096
const SUBDIVISIONS = 256

/**
 * Gerstner water shader
 * Adapted from https://sbcode.net/threejs/gerstnerwater/
 */
export class GerstnerWater extends Water {
  waves = [
    { direction: 0, steepness: 0.03, wavelength: 160 },
    { direction: 30, steepness: 0.03, wavelength: 150 },
    { direction: 60, steepness: 0.02, wavelength: 140 }
  ]

  constructor(sunDirection?: Vector3) {
    const texture = new TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg',
      function onLoad(texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping
      }
    )

    super(new PlaneGeometry(SIZE, SIZE, SUBDIVISIONS, SUBDIVISIONS), {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: texture,
      sunDirection: sunDirection || new Vector3(),
      sunColor: 0xfaf0c8,
      waterColor: 0x011b38,
      distortionScale: 8,
      fog: false
    })

    this.rotation.x = -Math.PI / 2
    this.material.wireframe = false

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.offsetX = { value: 0 }
      shader.uniforms.offsetZ = { value: 0 }
      shader.uniforms.waveA = {
        value: [
          Math.sin((this.waves[0].direction * Math.PI) / 180),
          Math.cos((this.waves[0].direction * Math.PI) / 180),
          this.waves[0].steepness,
          this.waves[0].wavelength
        ]
      }
      shader.uniforms.waveB = {
        value: [
          Math.sin((this.waves[1].direction * Math.PI) / 180),
          Math.cos((this.waves[1].direction * Math.PI) / 180),
          this.waves[1].steepness,
          this.waves[1].wavelength
        ]
      }
      shader.uniforms.waveC = {
        value: [
          Math.sin((this.waves[2].direction * Math.PI) / 180),
          Math.cos((this.waves[2].direction * Math.PI) / 180),
          this.waves[2].steepness,
          this.waves[2].wavelength
        ]
      }
      shader.uniforms.size.value = 10
      shader.vertexShader = vertexShader
      shader.fragmentShader = fragmentShader
    }
  }

  getWaveInfo(x: number, z: number, time: number) {
    const pos = new Vector3()
    const tangent = new Vector3(1, 0, 0)
    const binormal = new Vector3(0, 0, 1)

    this.waves.forEach((w) => {
      const k = (Math.PI * 2.0) / w.wavelength
      const c = Math.sqrt(9.8 / k)
      const d = new Vector2(
        Math.sin((w.direction * Math.PI) / 180),
        -Math.cos((w.direction * Math.PI) / 180)
      )
      const f = k * (d.dot(new Vector2(x, z)) - c * time)
      const a = w.steepness / k

      pos.x += d.x * (a * Math.cos(f))
      pos.y += a * Math.sin(f)
      pos.z += d.y * (a * Math.cos(f))

      tangent.x += -d.x * d.x * (w.steepness * Math.sin(f))
      tangent.y += d.x * (w.steepness * Math.cos(f))
      tangent.z += -d.x * d.y * (w.steepness * Math.sin(f))

      binormal.x += -d.x * d.y * (w.steepness * Math.sin(f))
      binormal.y += d.y * (w.steepness * Math.cos(f))
      binormal.z += -d.y * d.y * (w.steepness * Math.sin(f))
    })

    const normal = binormal.cross(tangent).normalize()
    return { position: pos, normal: normal }
  }

  update(delta: number) {
    this.material.uniforms['time'].value += delta
  }
}
