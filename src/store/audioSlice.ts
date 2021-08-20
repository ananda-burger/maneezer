import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { AudioState, Track } from 'types'

const initialState: AudioState = {
  audioInstance: new Audio(),
  playingTrackId: -1
}

export const selectAudioInstance = (state: RootState) => {
  return state.audio.audioInstance
}

export const selectPlayingTrackId = (state: RootState) => {
  return state.audio.playingTrackId
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    play: (state, action: PayloadAction<Track>) => {
      state.playingTrackId = action.payload.id
      state.audioInstance.pause()
      state.audioInstance = new Audio(action.payload.preview)
      state.audioInstance.play()
    },
    pause: (state) => {
      state.playingTrackId = -1
      state.audioInstance.pause()
    }
  }
})

export const { play, pause } = audioSlice.actions

export const { reducer } = audioSlice
