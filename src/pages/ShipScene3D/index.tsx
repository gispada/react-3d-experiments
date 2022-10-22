import { Environment, Stats, OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Ocean } from './Ocean'

const sunPosition = new Vector3(2, 0.06, 0)

export const ShipScene3D = () => {
  return (
    <div id="ship3d-canvas-container" className="h-screen">
      <Canvas
        camera={{
          position: [10, 0, 0],
          fov: 35,
          far: 1000
          // rotation: [0, Math.PI / 2, 0]
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

        {/* <axesHelper /> */}
        <Ocean sunDirection={sunPosition} />
        <OrbitControls />
        <Environment
          preset="dawn"
          background={false}
          // path="skybox-2/"
          // files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        />
      </Canvas>
    </div>
  )
}
