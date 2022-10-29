import {
  Environment,
  Stats,
  OrbitControls,
  Sky,
  PointerLockControls,
  KeyboardControls
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { WaterScene } from './WaterScene'

const sunPosition = new Vector3(2, 0.06, 0)

export const ShipScene3D = () => {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['w', 'W'] },
        { name: 'backward', keys: ['s', 'S'] }
      ]}
    >
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
          <Stats />
          <Sky
            distance={50000}
            sunPosition={sunPosition}
            inclination={0}
            turbidity={0.8}
            azimuth={0.4}
            rayleigh={2}
          />

          {/* <axesHelper position={[0, 10, 0]} args={[10]} /> */}

          <WaterScene sunDirection={sunPosition} />
          <PointerLockControls />
          <Environment
            preset="sunset"
            background={false}
            // path="skybox-2/"
            // files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
          />
        </Canvas>
      </div>
    </KeyboardControls>
  )
}
