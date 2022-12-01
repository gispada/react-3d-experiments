import { Environment, Html, useProgress, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { BuildingModel } from './Building'
import { Camera } from './Camera'
import { Pointlight } from './Pointlight'

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <span className="text-2xl">{progress.toFixed(2)}%</span>
    </Html>
  )
}

export const ShowroomScene3D = () => {
  return (
    <div id="canvas-container" className="h-screen">
      <Canvas
        shadows
        camera={{
          position: [160, 140, -30],
          fov: 35,
          far: 4000
          // rotation: [0, Math.PI / 2, 0]
        }}
      >
        <Suspense fallback={<Loader />}>
          <Stats />
          {/* <Sky
            sunPosition={[90, 4, 0]}
            turbidity={0.4}
            mieDirectionalG={0.6}
            distance={100000}
          /> */}
          <Pointlight />
          <BuildingModel />
          <Camera />
          <Environment
            background
            files={[
              '/skybox/posx.jpg',
              '/skybox/negx.jpg',
              '/skybox/posy.jpg',
              '/skybox/negy.jpg',
              '/skybox/posz.jpg',
              '/skybox/negz.jpg'
            ]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
