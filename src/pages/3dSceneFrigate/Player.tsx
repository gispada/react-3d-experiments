import { PointerLockControls, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'
import { Camera, Mesh, Object3D, Raycaster, Vector3 } from 'three'
import { TutorialStatus, useSceneStore } from './store'

type Props = {
  parentMesh: Object3D
}

const CHARACTER_HEIGHT = 1.7
const CHARACTER_SPEED = 0.1

const raycaster = new Raycaster()
raycaster.far = CHARACTER_HEIGHT + 0.5
raycaster.near = 0.01
const raycasterDirection = new Vector3(0, -1, 0) // Looking down

const cameraWorldPosition = new Vector3()
const localDirection = new Vector3()

const getCameraLocalDirection = (camera: Camera, target: Vector3) => {
  // Extract direction from the camera's local matrix - why 8, 9 and 10?
  const e = camera.matrix.elements
  target.set(-e[8], -e[9], -e[10]).normalize()
}

export const Player = ({ parentMesh }: Props) => {
  const tutorialDismissed = useSceneStore(
    ({ tutorialStatus }) => tutorialStatus === TutorialStatus.DISMISSED
  )

  const [, get] = useKeyboardControls()
  const camera = useThree((state) => state.camera)
  const { scene: path } = useGLTF('3d-models/frigate/frigate_path.glb')

  useLayoutEffect(() => {
    const mainMesh = path.children.at(0) as Mesh

    if (!Array.isArray(mainMesh.material)) {
      mainMesh.material.transparent = true
      mainMesh.material.opacity = 0
    }

    parentMesh.add(path)
  }, []) // eslint-disable-line

  useFrame(() => {
    const { forward, backward } = get()

    if (forward) {
      getCameraLocalDirection(camera, localDirection)
      camera.getWorldPosition(cameraWorldPosition)

      const nextPosition = new Vector3(
        cameraWorldPosition.x + localDirection.x * CHARACTER_SPEED,
        cameraWorldPosition.y,
        cameraWorldPosition.z + localDirection.z * CHARACTER_SPEED
      )

      raycaster.set(nextPosition, raycasterDirection)
      const [intersection] = raycaster.intersectObject(path)

      if (intersection) {
        camera.position.x += localDirection.x * CHARACTER_SPEED
        camera.position.y -= intersection.distance - CHARACTER_HEIGHT
        camera.position.z += localDirection.z * CHARACTER_SPEED
      }
    } else if (backward) {
      // TODO: to finish
      // getCameraLocalDirection(camera, localDirection)
      // camera.position.sub(localDirection)
    }
  })

  return <PointerLockControls enabled={tutorialDismissed} />
}
