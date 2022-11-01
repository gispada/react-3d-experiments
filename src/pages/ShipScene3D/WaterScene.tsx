import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { Euler, Quaternion, Vector3, Camera, Raycaster, Object3D } from 'three'
import { GerstnerWater } from './GerstnerWater'

type Props = {
  sunDirection: Vector3
  onBoardCamera?: boolean
}

extend({ GerstnerWater })

const WALKING_SURFACE = 'Object_21' // The ship's deck. TODO: create a separate mesh for this
const CHARACTER_HEIGHT = 1.7

const raycaster = new Raycaster()
const raycasterDirection = new Vector3(0, -1, 0) // Looking down

const worldPosition = new Vector3()
const localDirection = new Vector3()

const getCameraLocalDirection = (camera: Camera, target: Vector3) => {
  // Extract direction from the camera's local matrix - why 8, 9 and 10?
  const e = camera.matrix.elements
  target.set(-e[8], -e[9], -e[10]).normalize()
}

export const WaterScene = ({ sunDirection, onBoardCamera }: Props) => {
  const { scene: ship } = useGLTF('3d-models/frigate/scene.gltf')

  const [, get] = useKeyboardControls()
  const camera = useThree((state) => state.camera)

  const waterRef = useRef<GerstnerWater>(null)
  const planksRef = useRef<Object3D>()

  useLayoutEffect(() => {
    ship.position.set(2, 2, 2)

    ship.traverse((child) => {
      if (child.name === WALKING_SURFACE) {
        planksRef.current = child
      }
    })
    if (onBoardCamera) ship.add(camera)
  }, [ship]) // eslint-disable-line

  useFrame((state, delta) => {
    const { forward, backward } = get()

    waterRef.current!.update(delta * 0.4)

    const t = waterRef.current!.material.uniforms['time'].value

    const waveInfo = waterRef.current!.getWaveInfo(ship.position.x, ship.position.z, t)
    ship.position.y = waveInfo.position.y + 2
    const quat = new Quaternion().setFromEuler(
      new Euler(waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z)
    )
    ship.quaternion.rotateTowards(quat, delta)

    if (!onBoardCamera) return

    raycaster.set(camera.getWorldPosition(worldPosition), raycasterDirection)
    const [intersection] = raycaster.intersectObject(planksRef.current!)

    if (forward) {
      getCameraLocalDirection(camera, localDirection)

      camera.position.x += localDirection.x
      camera.position.y -= intersection.distance - CHARACTER_HEIGHT
      camera.position.z += localDirection.z
    } else if (backward) {
      getCameraLocalDirection(camera, localDirection)
      camera.position.sub(localDirection)
    }
  })

  return (
    <>
      {/* <fog attach="fog" color="#8c5a50" near={1} far={200} /> */}
      <gerstnerWater ref={waterRef} args={[sunDirection]} />
      <primitive object={ship} />
    </>
  )
}
