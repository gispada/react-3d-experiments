import { Environment, Stats, KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Vector3 } from 'three'
import { Light } from './Light'
import { MainScene } from './MainScene'
import { Tutorial } from './Tutorial'

const isProd = process.env.NODE_ENV === 'production'

const sunPosition = new Vector3(0.5, 0.02, 1)

const ON_BOARD_CAMERA = true

export const FrigateScene3D = () => {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['w', 'W'] },
        { name: 'backward', keys: ['s', 'S'] }
      ]}
    >
      <Loader />
      {ON_BOARD_CAMERA && <Tutorial />}
      <div id="ship3d-canvas-container" className="h-screen">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [-1, 5, -20],
            rotation: [0, Math.PI, 0]
          }}
        >
          {!isProd && <Stats />}
          <Light />
          <Suspense fallback={null}>
            <MainScene sunDirection={sunPosition} onBoardCamera={ON_BOARD_CAMERA} />
            <Environment
              background
              resolution={1024}
              far={1000}
              path="env-maps/1/"
              files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
            />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  )
}
