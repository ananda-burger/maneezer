import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { SearchState, Track } from 'types'

const initialState: SearchState = {
  tracks: [],
  hasMoreTracks: false,
  isLoading: false,
  isSearching: false,
  lastIndex: 0,
  searchInput: ''
}

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
  ({ lastIndex, isLoading }: { lastIndex: number; isLoading: boolean }) => {
    if (isLoading) {
      return Promise.resolve([])
    }
    const tracks: Track[] = [
      {
        id: 1391349252,
        title: 'Meu Pedaço de Pecado',
        title_short: 'Meu Pedaço de Pecado',
        title_version: '',
        link: 'https://www.deezer.com/track/1391349252',
        duration: 157,
        rank: 999308,
        explicit_lyrics: false,
        explicit_content_lyrics: 0,
        explicit_content_cover: 0,
        preview:
          'https://cdns-preview-7.dzcdn.net/stream/c-70255a40b7c438c3239e94ba0c909128-3.mp3',
        md5_image: '44c144f53d3c4e3ca5e8c6b9ee13ed27',
        position: 1,
        artist: {
          id: 135512622,
          name: 'João Gomes',
          link: 'https://www.deezer.com/artist/135512622',
          picture: 'https://api.deezer.com/artist/135512622/image',
          picture_small:
            'https://cdns-images.dzcdn.net/images/artist/65e1fbf38b84a7d0380b754452886aa8/56x56-000000-80-0-0.jpg',
          picture_medium:
            'https://cdns-images.dzcdn.net/images/artist/65e1fbf38b84a7d0380b754452886aa8/250x250-000000-80-0-0.jpg',
          picture_big:
            'https://cdns-images.dzcdn.net/images/artist/65e1fbf38b84a7d0380b754452886aa8/500x500-000000-80-0-0.jpg',
          picture_xl:
            'https://cdns-images.dzcdn.net/images/artist/65e1fbf38b84a7d0380b754452886aa8/1000x1000-000000-80-0-0.jpg',
          radio: true,
          tracklist: 'https://api.deezer.com/artist/135512622/top?limit=50',
          type: 'artist'
        },
        album: {
          id: 234349272,
          title: 'Eu Tenho a Senha',
          cover: 'https://api.deezer.com/album/234349272/image',
          cover_small:
            'https://cdns-images.dzcdn.net/images/cover/44c144f53d3c4e3ca5e8c6b9ee13ed27/56x56-000000-80-0-0.jpg',
          cover_medium:
            'https://cdns-images.dzcdn.net/images/cover/44c144f53d3c4e3ca5e8c6b9ee13ed27/250x250-000000-80-0-0.jpg',
          cover_big:
            'https://cdns-images.dzcdn.net/images/cover/44c144f53d3c4e3ca5e8c6b9ee13ed27/500x500-000000-80-0-0.jpg',
          cover_xl:
            'https://cdns-images.dzcdn.net/images/cover/44c144f53d3c4e3ca5e8c6b9ee13ed27/1000x1000-000000-80-0-0.jpg',
          md5_image: '44c144f53d3c4e3ca5e8c6b9ee13ed27',
          tracklist: 'https://api.deezer.com/album/234349272/tracks',
          type: 'album'
        },
        type: 'track'
      }
    ]
    return Promise.resolve(tracks)
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.tracks = action.payload
    })
  }
})

export const { open, close, update } = searchSlice.actions

export const { reducer } = searchSlice
