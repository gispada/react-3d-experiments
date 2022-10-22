import { useGLTF } from '@react-three/drei'
import { applyProps, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { GerstnerWater } from './GerstnerWater'

type Props = {
  shadows?: boolean
}

export const Ship = ({ shadows }: Props) => {
  const { scene } = useGLTF('3d-models/viking_boat/scene.gltf')
  const side = useRef<number>(1)

  useLayoutEffect(() => {
    if (!scene) return

    scene.scale.x = 0.05
    scene.scale.y = 0.05
    scene.scale.z = 0.05
    // scene.position.y = -1
    /* scene.traverse((obj) => {
      // @ts-ignore
      if (obj.isMesh) {
        // @ts-ignore
        applyProps(obj, { castShadow: true, receiveShadow: true })
      }
    }) */
    console.log(scene)
  }, [scene])

  /* useFrame((state, delta) => {
    const x = Math.sin(Math.PI * 2)
    // console.log(x)
    scene.rotation.z += Math.PI
  }) */

  return <primitive object={scene} />
}
