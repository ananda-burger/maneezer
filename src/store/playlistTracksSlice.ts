import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import {
  Track,
  Playlist,
  PlaylistTracksState,
  FetchPlaylistPayload
} from 'types'
import * as api from 'tracksAPI'

const initialState: PlaylistTracksState = {
  playlist: {},
  tracks: {}
}

const PER_PAGE = 30

export const selectPlaylist =
  (playlistId: string) =>
  (state: RootState): Playlist => {
    const playlist = state.playlistTracks.playlist[playlistId]
    return playlist
      ? playlist
      : {
          id: '',
          title: '',
          description: '',
          duration: 0,
          public: false,
          is_loved_track: false,
          collaborative: false,
          nb_tracks: 0,
          fans: 0,
          link: '',
          picture: '',
          picture_small: '',
          picture_medium: '',
          picture_big: '',
          picture_xl: '',
          checksum: '',
          tracklist: '',
          creation_date: '',
          md5_image: '',
          picture_type: '',
          creator: {
            id: '',
            name: '',
            tracklist: '',
            type: ''
          },
          type: '',
          tracks: { data: [] }
        }
  }

export const selectTracks =
  (playlistId: string) =>
  (state: RootState): Track[] => {
    const playlist = state.playlistTracks.tracks[playlistId]
    return playlist ? playlist.tracks : []
  }

export const selectLastIndex =
  (playlistId: string) =>
  (state: RootState): number => {
    const playlist = state.playlistTracks.tracks[playlistId]
    return playlist ? playlist.lastIndex : 0
  }

export const selectIsLoadingTracks =
  (playlistId: string) =>
  (state: RootState): boolean => {
    const playlist = state.playlistTracks.tracks[playlistId]
    return playlist ? playlist.isLoading : false
  }

export const selectHasMoreTracks =
  (playlistId: string) =>
  (state: RootState): boolean => {
    const playlist = state.playlistTracks.tracks[playlistId]
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

export const fetchPlaylist = createAsyncThunk(
  'playlistTracks/fetchPlaylist',
  ({ playlistId }: { playlistId: string }) => {
    return api.fetchPlaylist(playlistId)
  }
)

export const playlistTracksSlice = createSlice({
  name: 'playlistTracksSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        const playlist = state.tracks[action.meta.arg.playlistId]

        state.tracks[action.meta.arg.playlistId] = {
          hasMoreTracks: action.payload.length > 0,
          isLoading: false,
          lastIndex: playlist.lastIndex + PER_PAGE,
          tracks: playlist.tracks.concat(action.payload)
        }
      })
      .addCase(fetch.pending, (state, action) => {
        const playlist = state.tracks[action.meta.arg.playlistId]

        if (playlist) {
          playlist.isLoading = true
        } else {
          state.tracks[action.meta.arg.playlistId] = {
            hasMoreTracks: false,
            isLoading: true,
            lastIndex: 0,
            tracks: []
          }
        }
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.playlist[action.meta.arg.playlistId] = action.payload
      })
  }
})

export const { reducer } = playlistTracksSlice
