import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useSceneStore, TutorialStatus } from './store'

const { INIT, VISIBLE, DISMISSED } = TutorialStatus

const hiddenStatus = [INIT, DISMISSED]

export const STORAGE_KEY = 'tutorial-hidden'

const shouldBeVisible = (): boolean => {
  const value = localStorage.getItem(STORAGE_KEY)
  return typeof value === 'string' ? !JSON.parse(value) : true
}

export const Tutorial = () => {
  const status = useSceneStore((state) => state.tutorialStatus)
  const setTutorialStatus = useSceneStore((state) => state.setTutorialStatus)

  const { progress } = useProgress()
  const [hideNextTime, setHideNextTime] = useState(false)
  const to = useRef<number>()

  useEffect(() => {
    clearTimeout(to.current)

    if (progress < 100) return

    // Assets loaded using multiple loader instances may reset the percentage,
    // so a small delay is added to ensure it is the last loaded asset
    to.current = window.setTimeout(() => {
      setTutorialStatus(shouldBeVisible() ? VISIBLE : DISMISSED)
    }, 400)

    return () => {
      setTutorialStatus(INIT)
    }
  }, [progress, setTutorialStatus])

  const onClose = () => {
    if (hideNextTime) {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
    setTutorialStatus(DISMISSED)
  }

  if (hiddenStatus.includes(status)) return null

  return (
    <div tabIndex={-1} className="flex justify-center fixed z-50 w-full h-full">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-700 rounded-lg shadow mt-40">
          <div className="px-6 py-4 rounded-t border-b border-gray-600">
            <h3 className="text-xl font-semibold text-white">How to move</h3>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-400">
              Click the left mouse button to enable free movement mode. Press ESC to
              disable it.
            </p>
            <p className="text-base leading-relaxed text-gray-400">
              Press W and S to move forward and backward.
            </p>
          </div>

          <div className="flex justify-between px-6 py-4 rounded-b border-t border-gray-600">
            <div className="flex items-center">
              <input
                id="hide-tutorial"
                type="checkbox"
                checked={hideNextTime}
                onChange={() => setHideNextTime(!hideNextTime)}
                className="w-4 h-4 text-blue-700 bg-gray-100 rounded border-gray-200 border-t focus:ring-blue-300 focus:ring-2"
              />
              <label
                htmlFor="hide-tutorial"
                className="ml-2 text-sm font-medium text-gray-400"
              >
                Don't show anymore
              </label>
            </div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
