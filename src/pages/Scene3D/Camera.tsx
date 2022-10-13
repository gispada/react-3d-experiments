import { OrbitControls, PointerLockControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export const Camera = () => {
  const { camera } = useThree()

  return <PointerLockControls />
  // return <OrbitControls />
}
