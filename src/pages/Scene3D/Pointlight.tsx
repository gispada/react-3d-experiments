import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { PointLight, PointLightHelper, SpotLight, SpotLightHelper } from 'three'

export const Pointlight = () => {
  const lightRef = useRef<PointLight>(null)

  // useHelper(lightRef, PointLightHelper, 10, 'red')

  const props = useControls('Lights', {
    intensity: { value: 1.2, min: 0, max: 5 },
    distance: { value: 340, min: 0, max: 500 },
    decay: { value: 1, min: 0, max: 5 }
  })

  return (
    <>
      <pointLight
        // ref={lightRef}
        position={[180, 220, -20]}
        color="#f7ecda"
        {...props}
      />
      <pointLight ref={lightRef} position={[-220, 200, 80]} color="#fff9ef" {...props} />
    </>
  )
}
