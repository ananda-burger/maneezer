import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { SearchState } from 'types'
import * as api from 'tracksAPI'

const initialState: SearchState = {
  tracks: [],
  hasMoreTracks: false,
  isLoading: false,
  isSearching: false,
  lastIndex: 0,
  searchInput: ''
}

const PER_PAGE = 30

export const selectIsSearching = (state: RootState) => {
  return state.search.isSearching
}

export const selectSearchInput = (state: RootState) => {
  return state.search.searchInput
}

export const selectTracks = (state: RootState) => {
  return state.search.tracks
}

export const selectLastIndex = (state: RootState) => {
  return state.search.lastIndex
}

export const selectIsLoadingTracks = (state: RootState) => {
  return state.search.isLoading
}

export const selectHasMoreTracks = (state: RootState) => {
  return state.search.hasMoreTracks
}

export const fetch = createAsyncThunk(
  'search/searchTracks',
  (
    { lastIndex, isLoading }: { lastIndex: number; isLoading: boolean },
    { getState }: any
  ) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    const state: RootState = getState()
    return api.fetchFilteredTracks(
      selectSearchInput(state),
      lastIndex,
      PER_PAGE
    )
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    open: (state) => {
      state.isSearching = true
    },
    close: (state) => {
      state.isSearching = false
    },
    update: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },
    clear: (state) => {
      state.tracks = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.lastIndex += PER_PAGE
      state.hasMoreTracks = action.payload.length > 0
      state.tracks = state.tracks.concat(action.payload)
      state.isLoading = false
    })
  }
})

export const { open, close, update, clear } = searchSlice.actions

export const { reducer } = searchSlice
