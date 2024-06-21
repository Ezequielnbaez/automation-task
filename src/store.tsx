import { create } from 'zustand'

export interface Option {
  value: string
  label: string
  disable?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

type SyncStore = {
  googleFile: any
  setGoogleFile: (googleFile: any) => void
  slackChannels: Option[]
  setSlackChannels: (slackChannels: Option[]) => void
  selectedSlackChannels: Option[]
  setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void
}

export const useSyncStore= create<SyncStore>()((set) => ({
  googleFile: {},
  setGoogleFile: (googleFile: any) => set({ googleFile }),
  slackChannels: [],
  setSlackChannels: (slackChannels: Option[]) => set({ slackChannels }),
  selectedSlackChannels: [],
  setSelectedSlackChannels: (selectedSlackChannels: Option[]) =>
    set({ selectedSlackChannels }),
}))