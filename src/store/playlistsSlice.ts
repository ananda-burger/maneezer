import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FetchPayload, PlaylistsState } from 'types'
import * as api from 'tracksAPI'

const initialState: PlaylistsState = {
  playlists: [],
  lastIndex: 0,
  isLoading: false,
  hasMorePlaylists: false
}

const PER_PAGE = 30

export const selectPlaylists = (state: RootState) => {
  return state.playlists.playlists
}

export const selectLastIndex = (state: RootState) => {
  return state.playlists.lastIndex
}

export const selectIsLoading = (state: RootState) => {
  return state.playlists.isLoading
}

export const selectHasMore = (state: RootState) => {
  return state.playlists.hasMorePlaylists
}

export const selectUserID = (state: RootState) => {
  return state.user.loginData.userID
}

export const fetch = createAsyncThunk(
  'playlists/fetch',
  ({ lastIndex, isLoading }: FetchPayload, { getState }: any) => {
    const state: RootState = getState()
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchPlaylists(selectUserID(state), lastIndex, PER_PAGE)
  }
)

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        state.lastIndex += PER_PAGE
        state.hasMorePlaylists = action.payload.length > 0
        state.playlists = state.playlists.concat(action.payload)
        state.isLoading = false
      })
      .addCase(fetch.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { reducer } = playlistsSlice
