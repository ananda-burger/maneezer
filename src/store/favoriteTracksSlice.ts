import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FavoriteTracksState, Track } from 'types'
import * as api from 'tracksAPI'

const initialState: FavoriteTracksState = {
  tracks: [],
  lastIndex: 0,
  isLoading: false,
  hasMoreTracks: true
}

const PER_PAGE = 30

export const selectTracks = (state: RootState) => {
  return state.favoriteTracks.tracks
}

export const selectLastIndex = (state: RootState) => {
  return state.favoriteTracks.lastIndex
}

export const selectIsLoadingTracks = (state: RootState) => {
  return state.favoriteTracks.isLoading
}

export const selectHasMoreTracks = (state: RootState) => {
  return state.favoriteTracks.hasMoreTracks
}

export const selectUserID = (state: RootState) => {
  return state.user.loginData.userID
}

export const fetch = createAsyncThunk(
  'favoriteTracks/fetchFavoriteTracks',
  (
    { lastIndex, isLoading }: { lastIndex: number; isLoading: boolean },
    { getState }: any
  ) => {
    const state: RootState = getState()
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchFavoriteTracks(selectUserID(state), lastIndex, PER_PAGE)
  }
)

export const favoritesSlice = createSlice({
  name: 'favoriteTracks',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<Track>) => {
      const index = state.tracks.findIndex((track) => {
        return track.id === action.payload.id
      })
      state.tracks.splice(index, 1)
    }
  },
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

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions

export const { reducer } = favoritesSlice
