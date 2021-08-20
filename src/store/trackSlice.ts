import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State, Track } from 'types'
import * as api from 'tracksAPI'

const initialState: State = {
  topTracks: [],
  lastTopTracksIndex: 0,
  favoriteTracks: [],
  isLoadingTopTracks: false,
  hasMoreTopTracks: true
}

const PER_PAGE = 30

export const selectTracks = (state: RootState) => {
  return state.track.topTracks
}

export const selectLastIndex = (state: RootState) => {
  return state.track.lastTopTracksIndex
}

export const selectFavoriteTracks = (state: RootState) => {
  return state.track.favoriteTracks
}

export const selectIsLoadingTrack = (state: RootState) => {
  return state.track.isLoadingTopTracks
}

export const fetchTracks = createAsyncThunk(
  'track/fetchTracks',
  ({ lastIndex, isLoading }: { lastIndex: number; isLoading: boolean }) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchTracks(lastIndex, PER_PAGE)
  }
)

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Track>) => {
      state.favoriteTracks.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<Track>) => {
      const index = state.favoriteTracks.findIndex((track) => {
        return track.id === action.payload.id
      })

      state.favoriteTracks.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.lastTopTracksIndex += PER_PAGE
        state.hasMoreTopTracks = action.payload.length > 0
        state.topTracks = state.topTracks.concat(action.payload)
        state.isLoadingTopTracks = false
      })
      .addCase(fetchTracks.pending, (state, _action) => {
        state.isLoadingTopTracks = true
      })
  }
})

export const { addToFavorites, removeFromFavorites } = trackSlice.actions

export const { reducer } = trackSlice
