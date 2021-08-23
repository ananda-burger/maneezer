import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FavoriteTracksState, FetchPayload, Track } from 'types'
import * as api from 'tracksAPI'
import * as popUp from 'store/popUpSlice'

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
  ({ lastIndex, isLoading }: FetchPayload, { getState }: any) => {
    const state: RootState = getState()
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchFavoriteTracks(selectUserID(state), lastIndex, PER_PAGE)
  }
)

export const add = createAsyncThunk(
  'favoriteTracks/addToFavorites',
  async (track: Track, { getState, dispatch }: any) => {
    const state: RootState = getState()
    return api
      .addToFavorites(selectUserID(state), track)
      .catch((message) => dispatch(popUp.appear(message)))
  }
)

export const remove = createAsyncThunk(
  'favoriteTracks/removeFromFavorites',
  (track: Track, { getState }: any) => {
    const state: RootState = getState()
    return api.removeFromFavorites(selectUserID(state), track)
  }
)

export const favoritesSlice = createSlice({
  name: 'favoriteTracks',
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
      .addCase(add.fulfilled, (state, action) => {
        state.tracks.push(action.payload)
      })
      .addCase(remove.fulfilled, (state, action) => {
        const index = state.tracks.findIndex((track) => {
          return track.id === action.payload.id
        })
        state.tracks.splice(index, 1)
      })
  }
})

export const { reducer } = favoritesSlice
