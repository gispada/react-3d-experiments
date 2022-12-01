import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { SpotLight, SpotLightHelper } from 'three'

export const Spotlight = () => {
  const lightRef = useRef<SpotLight>(null)

  useHelper(lightRef, SpotLightHelper, 'yellow')

  const props = useControls({
    intensity: { value: 0.8, min: 0, max: 5 },
    distance: { value: 400, min: 0, max: 500 },
    penumbra: { value: 0.2, min: 0, max: 1 },
    angle: { value: Math.PI / 4, min: 0, max: 1 }
  })

  return (
    <spotLight
      ref={lightRef}
      // castShadow
      position={[100, 260, -30]}
      color="#fff9ef"
      {...props}
    />
  )
}
