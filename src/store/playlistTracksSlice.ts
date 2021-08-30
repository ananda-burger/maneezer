import { ActionCreator, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Track, PlaylistTracksState, FetchPlaylistPayload } from 'types'
import * as api from 'tracksAPI'

const initialState: PlaylistTracksState = {}

const PER_PAGE = 30

export const selectTracks =
  (playlistId: string) =>
  (state: RootState): Track[] => {
    const playlist = state.playlistTracks[playlistId]
    return playlist ? playlist.tracks : []
  }

export const selectLastIndex =
  (playlistId: string) =>
  (state: RootState): number => {
    const playlist = state.playlistTracks[playlistId]
    return playlist ? playlist.lastIndex : 0
  }

export const selectIsLoadingTracks =
  (playlistId: string) =>
  (state: RootState): boolean => {
    const playlist = state.playlistTracks[playlistId]
    return playlist ? playlist.isLoading : false
  }

export const selectHasMoreTracks =
  (playlistId: string) =>
  (state: RootState): boolean => {
    const playlist = state.playlistTracks[playlistId]
    return playlist ? playlist.hasMoreTracks : false
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
        const playlist = state[action.meta.arg.playlistId]

        state[action.meta.arg.playlistId] = {
          hasMoreTracks: action.payload.length > 0,
          isLoading: false,
          lastIndex: playlist.lastIndex + PER_PAGE,
          tracks: playlist.tracks.concat(action.payload)
        }
      })
      .addCase(fetch.pending, (state, action) => {
        const playlist = state[action.meta.arg.playlistId]

        if (playlist) {
          playlist.isLoading = true
        } else {
          state[action.meta.arg.playlistId] = {
            hasMoreTracks: false,
            isLoading: true,
            lastIndex: 0,
            tracks: []
          }
        }
      })
  }
})

export const { reducer } = playlistTracksSlice
