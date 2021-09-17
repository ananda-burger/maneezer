import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { Track, Artist, ArtistState, FetchArtistPayload } from 'types'
import * as api from 'tracksAPI'

const initialState: ArtistState = {
  artist: {},
  tracks: {}
}

const PER_PAGE = 30

export const selectTracks =
  (artistId: string) =>
  (state: RootState): Track[] => {
    const artist = state.artist.tracks[artistId]
    return artist ? artist.tracks : []
  }

export const selectArtist =
  (artistId: string) =>
  (state: RootState): Artist => {
    const artist = state.artist.artist[artistId]
    return artist
      ? artist
      : {
          id: '-1',
          name: '',
          link: '',
          picture: '',
          picture_small: '',
          picture_medium: '',
          picture_big: '',
          picture_xl: '',
          radio: false,
          tracklist: '',
          type: ''
        }
  }

export const selectLastIndex =
  (artistId: string) =>
  (state: RootState): number => {
    const artist = state.artist[artistId]
    return artist ? artist.lastIndex : 0
  }

export const selectIsLoadingTracks =
  (artistId: string) =>
  (state: RootState): boolean => {
    const artist = state.artist[artistId]
    return artist ? artist.isLoading : false
  }

export const selectHasMoreTracks =
  (artistId: string) =>
  (state: RootState): boolean => {
    const artist = state.artist[artistId]
    return artist ? artist.hasMoreTracks : false
  }

export const fetchTracks = createAsyncThunk(
  'artist/fetchTracks',
  ({ lastIndex, isLoading, artistId }: FetchArtistPayload) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    return api.fetchArtistTracks(lastIndex, PER_PAGE, artistId)
  }
)

export const fetchArtist = createAsyncThunk(
  'artist/fetchArtist',
  ({ artistId }: { artistId: string }) => {
    return api.fetchArtist(artistId)
  }
)

export const artistSlice = createSlice({
  name: 'artistSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.fulfilled, (state, action) => {
        const artist = state.tracks[action.meta.arg.artistId]

        state.tracks[action.meta.arg.artistId] = {
          hasMoreTracks: action.payload.length > 0,
          isLoading: false,
          lastIndex: artist.lastIndex + PER_PAGE,
          tracks: artist.tracks.concat(action.payload)
        }
      })
      .addCase(fetchTracks.pending, (state, action) => {
        const artist = state.tracks[action.meta.arg.artistId]

        if (artist) {
          artist.isLoading = true
        } else {
          state.tracks[action.meta.arg.artistId] = {
            hasMoreTracks: false,
            isLoading: true,
            lastIndex: 0,
            tracks: []
          }
        }
      })
      .addCase(fetchArtist.fulfilled, (state, action) => {
        state.artist[action.meta.arg.artistId] = action.payload
      })
  }
})

export const { reducer } = artistSlice
