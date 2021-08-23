import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FetchPayload, SearchState } from 'types'
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
  ({ lastIndex, isLoading, query }: FetchPayload) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchFilteredTracks(query, lastIndex, PER_PAGE)
  }
)

export const fetchFirstPage = createAsyncThunk(
  'search/fetchFirstPage',
  ({ isLoading, query }: { isLoading: boolean; query: string }) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchFilteredTracks(query, 0, PER_PAGE)
  }
)

export const updateAndFetch = createAsyncThunk(
  'search/updateAndFetch',
  (payload: FetchPayload, { dispatch }: any) => {
    dispatch(open())
    dispatch(update(payload.query || ''))
    dispatch(fetch(payload))
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
      state.searchInput = ''
    },
    update: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },
    clear: (state) => {
      state.tracks = []
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
      .addCase(fetchFirstPage.fulfilled, (state, action) => {
        state.tracks = action.payload
        state.isLoading = false
      })
  }
})

export const { open, close, update, clear } = searchSlice.actions

export const { reducer } = searchSlice
