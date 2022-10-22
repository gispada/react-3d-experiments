// @ts-nocheck
import { useGLTF } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { Euler, Quaternion, Vector3 } from 'three'
import { GerstnerWater } from './GerstnerWater'

type Props = {
  sunDirection: Vector3
}

extend({ GerstnerWater })

export const Ocean = ({ sunDirection }: Props) => {
  const { scene: boat } = useGLTF('3d-models/viking_boat/scene.gltf')

  const waterRef = useRef<GerstnerWater>()

  useLayoutEffect(() => {
    boat.scale.set(0.05, 0.05, 0.05)
  }, [boat])

  useFrame((state, delta) => {
    // if (!waterRef.current) return

    waterRef.current.update(delta)
    const t = waterRef.current.material.uniforms['time'].value

    const waveInfo = waterRef.current.getWaveInfo(boat.position.x, boat.position.z, t)
    boat.position.y = waveInfo.position.y - 1
    const quat = new Quaternion().setFromEuler(
      new Euler(waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z)
    )
    boat.quaternion.rotateTowards(quat, delta * 0.5)
  })

  return (
    <>
      {/* <fog attach="fog" color="#8c5a50" near={1} far={200} /> */}
      <gerstnerWater ref={waterRef} args={[sunDirection]} />
      <primitive object={boat} />
    </>
  )
}
