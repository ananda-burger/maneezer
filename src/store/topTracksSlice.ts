import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FetchPayload, TopTracksState } from 'types'
import * as api from 'tracksAPI'

const initialState: TopTracksState = {
  tracks: [],
  lastIndex: 0,
  isLoading: false,
  hasMoreTracks: true
}

const PER_PAGE = 30

export const selectTracks = (state: RootState) => {
  return state.topTracks.tracks
}

export const selectLastIndex = (state: RootState) => {
  return state.topTracks.lastIndex
}

export const selectIsLoadingTracks = (state: RootState) => {
  return state.topTracks.isLoading
}

export const selectHasMoreTracks = (state: RootState) => {
  return state.topTracks.hasMoreTracks
}

export const fetch = createAsyncThunk(
  'track/fetchTracks',
  ({ lastIndex, isLoading }: FetchPayload) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchTracks(lastIndex, PER_PAGE)
  }
)

export const topTrackSlice = createSlice({
  name: 'topTrack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        state.lastIndex += PER_PAGE
        state.hasMoreTracks = action.payload.length > 0
        state.tracks = state.tracks.concat(action.payload)
        state.isLoading = false
      })
      .addCase(fetch.pending, (state, _action) => {
        state.isLoading = true
      })
  }
})

export const { reducer } = topTrackSlice
