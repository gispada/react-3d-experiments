import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

export const Light = () => {
  const lightRef = useRef<DirectionalLight>(null)

  // useHelper(lightRef, DirectionalLightHelper, 10, 'red')

  const props = useControls('Light', {
    'position-x': { value: 10, min: 0, max: 100 },
    'position-y': { value: 25, min: 0, max: 100 },
    'position-z': { value: 70, min: 0, max: 100 },
    intensity: { value: 0.4, min: 0, max: 5 }
  })

  return <directionalLight ref={lightRef} {...props} rotation={[0, 0, 0]} />
}
