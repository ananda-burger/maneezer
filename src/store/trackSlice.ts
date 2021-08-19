import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State } from 'types'
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

export const fetchTracks = createAsyncThunk(
  'track/loadTracks',
  (index: number) => {
    return api.fetchTracks(index)
  }
)

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.lastIndex += 15
      state.topTracks = state.topTracks.concat(action.payload)
    })
  }
})

export const { reducer } = trackSlice
