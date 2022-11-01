import { useEffect, useRef } from 'react'
import { Audio, AudioListener, AudioLoader } from 'three'

type Options = Partial<{
  loop: boolean
  volume: number
}>

const audioLoader = new AudioLoader()
const listener = new AudioListener()

export const useThreeJsSound = (file: string, options?: Options) => {
  const soundRef = useRef<Audio>()

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Audio(listener)

      audioLoader.load(file, function onLoad(buffer) {
        const { loop, volume } = options || {}
        soundRef.current!.setBuffer(buffer)
        soundRef.current!.setLoop(loop || false)
        soundRef.current!.setVolume(volume || 1)
        soundRef.current!.play()
      })
    }
    return function () {
      if (soundRef.current?.isPlaying) {
        soundRef.current.stop()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return soundRef
}
