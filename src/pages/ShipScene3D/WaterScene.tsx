import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { Euler, Quaternion, Vector3, Camera } from 'three'
import { GerstnerWater } from './GerstnerWater'

type Props = {
  sunDirection: Vector3
}

extend({ GerstnerWater })

const localDirection = new Vector3()

const getCameraLocalDirection = (camera: Camera, target: Vector3) => {
  // Extract direction from the camera's local matrix - why 8, 9 and 10?
  const e = camera.matrix.elements
  target.set(-e[8], -e[9], -e[10]).normalize()
}

export const WaterScene = ({ sunDirection }: Props) => {
  const { scene: ship } = useGLTF('3d-models/frigate/scene.gltf')
  const [, get] = useKeyboardControls()
  const { camera } = useThree()

  const waterRef = useRef<GerstnerWater>(null)

  useLayoutEffect(() => {
    ship.position.set(2, 2, 2)
    ship.add(camera)
  }, [ship]) // eslint-disable-line

  useFrame((state, delta) => {
    const { forward, backward } = get()

    waterRef.current!.update(delta)

    const t = waterRef.current!.material.uniforms['time'].value

    const waveInfo = waterRef.current!.getWaveInfo(ship.position.x, ship.position.z, t)
    ship.position.y = waveInfo.position.y + 2
    const quat = new Quaternion().setFromEuler(
      new Euler(waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z)
    )
    ship.quaternion.rotateTowards(quat, delta * 0.5)

    if (forward) {
      getCameraLocalDirection(camera, localDirection)
      camera.position.add(localDirection)
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
