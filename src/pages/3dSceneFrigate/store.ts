import create from 'zustand'

export enum TutorialStatus {
  INIT,
  VISIBLE,
  DISMISSED
}

type Store = {
  tutorialStatus: TutorialStatus
  audioEnabled: boolean
  toggleAudio: () => void
  setTutorialStatus: (status: TutorialStatus) => void
}

export const useSceneStore = create<Store>((set) => ({
  tutorialStatus: TutorialStatus.INIT,
  audioEnabled: true,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  setTutorialStatus: (status) => set(() => ({ tutorialStatus: status }))
}))
