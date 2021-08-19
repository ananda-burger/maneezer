import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State } from 'types'
import * as api from 'tracksAPI'

const initialState: State = {
  value: [],
  lastIndex: 0
}

export const selectTracks = (state: RootState) => {
  return state.track.value
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
      state.value = state.value.concat(action.payload)
    })
  }
})

export const { reducer } = trackSlice
