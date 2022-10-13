import { useGLTF } from '@react-three/drei'
import { applyProps } from '@react-three/fiber'
import { useLayoutEffect } from 'react'

type Props = {
  shadows?: boolean
}

export const BuildingModel = ({ shadows }: Props) => {
  const { scene } = useGLTF('3d-models/gallery_showroom/scene.gltf')

  useLayoutEffect(() => {
    if (!shadows) return

    scene.traverse((obj) => {
      // @ts-ignore
      if (obj.isMesh) {
        // @ts-ignore
        applyProps(obj, { castShadow: true, receiveShadow: true })
      }
    })
  }, [shadows])

  return <primitive object={scene} />
}
