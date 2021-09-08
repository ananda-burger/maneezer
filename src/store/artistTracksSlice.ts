import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Track, ArtistTracksState, FetchArtistPayload } from 'types'
import * as api from 'tracksAPI'

const initialState: ArtistTracksState = {}

const PER_PAGE = 30

export const selectTracks =
  (artistId: string) =>
  (state: RootState): Track[] => {
    const artist = state.artistTracks[artistId]
    return artist ? artist.tracks : []
  }

export const selectLastIndex =
  (artistId: string) =>
  (state: RootState): number => {
    const artist = state.artistTracks[artistId]
    return artist ? artist.lastIndex : 0
  }

export const selectIsLoadingTracks =
  (artistId: string) =>
  (state: RootState): boolean => {
    const artist = state.artistTracks[artistId]
    return artist ? artist.isLoading : false
  }

export const selectHasMoreTracks =
  (artistId: string) =>
  (state: RootState): boolean => {
    const artist = state.artistTracks[artistId]
    return artist ? artist.hasMoreTracks : false
  }

export const fetch = createAsyncThunk(
  'artist/fetchTracks',
  ({ lastIndex, isLoading, artistId }: FetchArtistPayload) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchArtistTracks(lastIndex, PER_PAGE, artistId)
  }
)

export const artistTracksSlice = createSlice({
  name: 'artistTracksSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        const playlist = state[action.meta.arg.artistId]

        state[action.meta.arg.artistId] = {
          hasMoreTracks: action.payload.length > 0,
          isLoading: false,
          lastIndex: playlist.lastIndex + PER_PAGE,
          tracks: playlist.tracks.concat(action.payload)
        }
      })
      .addCase(fetch.pending, (state, action) => {
        const playlist = state[action.meta.arg.artistId]

        if (playlist) {
          playlist.isLoading = true
        } else {
          state[action.meta.arg.artistId] = {
            hasMoreTracks: false,
            isLoading: true,
            lastIndex: 0,
            tracks: []
          }
        }
      })
  }
})

export const { reducer } = artistTracksSlice
