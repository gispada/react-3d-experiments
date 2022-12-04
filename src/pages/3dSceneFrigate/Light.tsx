import { useHelper } from '@react-three/drei'
import { DirectionalLightProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { forwardRef, useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

const config = {
  'position-x': 10,
  'position-y': 25,
  'position-z': 70,
  intensity: 0.4,
  color: '#e2debd'
}

const BaseLight = forwardRef<DirectionalLight, DirectionalLightProps>((props, ref) => {
  return <directionalLight ref={ref} {...props} rotation={[0, 0, 0]} />
})

const DevLight = () => {
  const lightRef = useRef<DirectionalLight>(null)

  // @ts-ignore
  useHelper(lightRef, DirectionalLightHelper, 10, 'red')

  const props = useControls('Light', {
    'position-x': { value: config['position-x'], min: 0, max: 100 },
    'position-y': { value: config['position-y'], min: 0, max: 100 },
    'position-z': { value: config['position-z'], min: 0, max: 100 },
    intensity: { value: config.intensity, min: 0, max: 5 },
    color: { value: config.color }
  })

  return <BaseLight ref={lightRef} {...props} />
}

const ProdLight = () => <BaseLight {...config} />

export const Light = process.env.NODE_ENV === 'production' ? ProdLight : DevLight
