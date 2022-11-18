import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { Euler, Quaternion, Vector3, Camera, Raycaster } from 'three'
import { GerstnerWater } from './GerstnerWater'

type Props = {
  sunDirection: Vector3
  onBoardCamera?: boolean
}

extend({ GerstnerWater })

const CHARACTER_HEIGHT = 1.7
const CHARACTER_SPEED = 0.1

const raycaster = new Raycaster()
raycaster.far = CHARACTER_HEIGHT + 0.5
raycaster.near = 0.01
const raycasterDirection = new Vector3(0, -1, 0) // Looking down

const cameraWorldPosition = new Vector3()
const localDirection = new Vector3()

const getCameraLocalDirection = (camera: Camera, target: Vector3) => {
  // Extract direction from the camera's local matrix - why 8, 9 and 10?
  const e = camera.matrix.elements
  target.set(-e[8], -e[9], -e[10]).normalize()
}

export const WaterScene = ({ sunDirection, onBoardCamera }: Props) => {
  const { scene: ship } = useGLTF('3d-models/frigate/frigate.glb')
  const { scene: path } = useGLTF('3d-models/frigate/frigate_path.glb')

  const [, get] = useKeyboardControls()
  const camera = useThree((state) => state.camera)

  const waterRef = useRef<GerstnerWater>(null)

  useLayoutEffect(() => {
    ship.position.set(2, 2, 2)

    if (onBoardCamera) {
      // @ts-ignore
      path.children.at(0).material.transparent = true
      // @ts-ignore
      path.children.at(0).material.opacity = 0
      ship.add(camera, path)
    }
  }, [ship, path]) // eslint-disable-line

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

    if (forward) {
      getCameraLocalDirection(camera, localDirection)
      camera.getWorldPosition(cameraWorldPosition)

      const nextPosition = new Vector3(
        cameraWorldPosition.x + localDirection.x * CHARACTER_SPEED,
        cameraWorldPosition.y,
        cameraWorldPosition.z + localDirection.z * CHARACTER_SPEED
      )

      raycaster.set(nextPosition, raycasterDirection)
      const [intersection] = raycaster.intersectObject(path)

      if (intersection) {
        camera.position.x += localDirection.x * CHARACTER_SPEED
        camera.position.y -= intersection.distance - CHARACTER_HEIGHT
        camera.position.z += localDirection.z * CHARACTER_SPEED
      }
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
