import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import { Audio, AudioListener, AudioLoader } from 'three'

const listener = new AudioListener()
const audio = new Audio(listener)

export const Sound = () => {
  const sound = useLoader(AudioLoader, 'sounds/ocean-ship.mp3')

  useEffect(() => {
    if (sound) {
      audio.setBuffer(sound)
      audio.setLoop(true)
      audio.setVolume(1)
      audio.play()
    }

    return () => {
      if (audio.isPlaying) audio.stop()
    }
  }, [sound])

  return null
}
