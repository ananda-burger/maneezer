import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Album, AlbumTracksState } from 'types'
import * as api from 'tracksAPI'

const initialState: AlbumTracksState = {}

export const selectAlbum =
  (albumId: string) =>
  (state: RootState): Album | void => {
    return state.album[albumId]
  }

export const fetch = createAsyncThunk(
  'album/fetch',
  ({ albumId }: { albumId: string }) => {
    return api.fetchAlbum(albumId)
  }
)

export const albumSlice = createSlice({
  name: 'albumTracksSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      const album = action.payload
      state[album.id] = album
    })
  }
})

export const { reducer } = albumSlice
