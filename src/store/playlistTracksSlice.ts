import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { PlaylistTracksState, FetchPlaylistPayload, FetchPayload } from 'types'
import * as api from 'tracksAPI'

const initialState: PlaylistTracksState = {
  tracks: [],
  lastIndex: 0,
  isLoading: false,
  hasMoreTracks: true,
  id: ''
}

const PER_PAGE = 30

export const selectTracks = (state: RootState) => {
  return state.playlistTracks.tracks
}

export const selectLastIndex = (state: RootState) => {
  return state.playlistTracks.lastIndex
}

export const selectIsLoadingTracks = (state: RootState) => {
  return state.playlistTracks.isLoading
}

export const selectHasMoreTracks = (state: RootState) => {
  return state.playlistTracks.hasMoreTracks
}

export const fetch = createAsyncThunk(
  'playlistTracks/fetch',
  ({ lastIndex, isLoading, playlistId }: FetchPlaylistPayload) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchPlaylistTracks(lastIndex, PER_PAGE, playlistId)
  }
)

export const playlistTracksSlice = createSlice({
  name: 'playlistTracksSlice',
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
      .addCase(fetch.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { reducer } = playlistTracksSlice
