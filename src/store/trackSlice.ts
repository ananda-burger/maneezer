import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State } from 'types'
import * as api from 'tracksAPI'

const initialState: State = {
  value: []
}

export const selectTracks = (state: RootState) => {
  return state.track.value
}

export const fetchTracks = createAsyncThunk('track/loadTracks', () => {
  return api.fetchTracks()
})

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.value = action.payload
    })
  }
})

export const { reducer } = trackSlice
