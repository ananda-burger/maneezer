import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State, Track } from 'types'
import * as api from 'tracksAPI'

const initialState: State = {
  topTracks: [],
  lastIndex: 0,
  favoriteTracks: []
}

export const selectTracks = (state: RootState) => {
  return state.track.topTracks
}

export const selectLastIndex = (state: RootState) => {
  return state.track.lastIndex
}

export const selectFavoriteTracks = (state: RootState) => {
  return state.track.favoriteTracks
}

export const fetchTracks = createAsyncThunk(
  'track/loadTracks',
  (index: number) => {
    return api.fetchTracks(index)
  }
)

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Track>) => {
      state.favoriteTracks.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.lastIndex += 15
      state.topTracks = state.topTracks.concat(action.payload)
    })
  }
})

export const { addToFavorites } = trackSlice.actions

export const { reducer } = trackSlice
