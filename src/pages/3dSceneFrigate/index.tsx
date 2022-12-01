import {
  Environment,
  Stats,
  OrbitControls,
  PointerLockControls,
  KeyboardControls,
  Loader
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Vector3 } from 'three'
import { Light } from './Light'
import { Tutorial } from './Tutorial'
import { WaterScene } from './WaterScene'

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
      <Tutorial />
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
          {/*  <Sky
            distance={50000}
            sunPosition={sunPosition}
            inclination={0}
            turbidity={0.8}
            azimuth={0.4}
            rayleigh={2}
          /> */}

          <Light />
          {ON_BOARD_CAMERA ? <PointerLockControls /> : <OrbitControls />}
          <Suspense fallback={null}>
            <WaterScene sunDirection={sunPosition} onBoardCamera={ON_BOARD_CAMERA} />
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
