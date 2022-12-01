import { useGLTF } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { Euler, Quaternion, Vector3 } from 'three'
import { GerstnerWater } from '../../components/GerstnerWater'
import { Player } from './Player'
import { Sound } from './Sound'
import { Tutorial } from './Tutorial'

type Props = {
  sunDirection: Vector3
  onBoardCamera?: boolean
}

extend({ GerstnerWater })

export const WaterScene = ({ sunDirection, onBoardCamera }: Props) => {
  const { scene: ship } = useGLTF('3d-models/frigate/frigate.glb')

  const camera = useThree((state) => state.camera)

  const waterRef = useRef<GerstnerWater>(null)

  useLayoutEffect(() => {
    ship.position.set(2, 2, 2)
    if (onBoardCamera) ship.add(camera)
  }, []) // eslint-disable-line

  useFrame((state, delta) => {
    waterRef.current!.update(delta * 0.4)

    const t = waterRef.current!.material.uniforms['time'].value

    const waveInfo = waterRef.current!.getWaveInfo(ship.position.x, ship.position.z, t)
    ship.position.y = waveInfo.position.y + 2
    const quat = new Quaternion().setFromEuler(
      new Euler(waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z)
    )
    ship.quaternion.rotateTowards(quat, delta)
  })

  return (
    <>
      {onBoardCamera && <Player parentMesh={ship} />}
      <Sound />
      <gerstnerWater ref={waterRef} args={[sunDirection]} />
      <primitive object={ship} />
    </>
  )
}

// useGLTF.preload('3d-models/frigate/frigate.glb')
