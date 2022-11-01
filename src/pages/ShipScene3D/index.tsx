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
import { useThreeJsSound } from '../../utils/useThreeJsSound'
import { Light } from './Light'
import { WaterScene } from './WaterScene'

const sunPosition = new Vector3(0.5, 0.02, 1)

const ON_BOARD_CAMERA = true

export const ShipScene3D = () => {
  useThreeJsSound('sounds/ocean-ship.mp3', { loop: true })

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['w', 'W'] },
        { name: 'backward', keys: ['s', 'S'] }
      ]}
    >
      <div id="ship3d-canvas-container" className="h-screen">
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [-1, 5, -20],
            rotation: [0, Math.PI, 0]
          }}
        >
          <Stats />
          {/*  <Sky
            distance={50000}
            sunPosition={sunPosition}
            inclination={0}
            turbidity={0.8}
            azimuth={0.4}
            rayleigh={2}
          /> */}

          {/* <axesHelper position={[0, 10, 0]} args={[10]} /> */}

          <Light />
          <WaterScene sunDirection={sunPosition} onBoardCamera={ON_BOARD_CAMERA} />
          {ON_BOARD_CAMERA ? <PointerLockControls /> : <OrbitControls />}
          <Environment
            // preset="sunset"
            // background={false}

            background
            resolution={1024}
            far={1000}
            path="env-maps/1/"
            files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
          />
        </Canvas>
      </div>
    </KeyboardControls>
  )
}
