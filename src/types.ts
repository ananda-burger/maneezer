export interface Album {
  id: number
  title: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  md5_image: string
  tracklist: string
  type: string
}

export interface Artist {
  id: number
  name: string
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  radio: boolean
  tracklist: string
  type: string
}

export interface Track {
  id: number
  title: string
  title_short: string
  title_version: string
  link: string
  duration: number
  rank: number
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  md5_image: string
  position: number
  artist: Artist
  album: Album
  type: string
}

export interface TopTracksState {
  tracks: Track[]
  lastIndex: number
  isLoading: boolean
  hasMoreTracks: boolean
}

export interface FavoriteTracksState extends TopTracksState {}

export interface AudioState {
  audioInstance: any
  playingTrackId?: number
}

export interface SearchState {
  hasMoreTracks: boolean
  isLoading: boolean
  isSearching: boolean
  lastIndex: number
  searchInput: string
  tracks: Track[]
}

export interface UserState {
  loginData: LoginResponse
}

export interface PopUpState {
  isOpen: boolean
  message: string
  timer: ReturnType<typeof setTimeout> | void
}

export interface LoginResponse {
  authInitDate: number
  authResponse: { accessToken: string; expire: number }
  status: 'connected' | 'not_authorized' | 'notConnected' | 'unknown'
  userID: string
}

export interface DeezerResponse {
  data: Track[]
  prev?: string
  total: number
}

export enum Route {
  Home = '/',
  Favorites = '/favorites',
  Search = '/search'
}

export interface FetchPayload {
  lastIndex: number
  isLoading: boolean
  query?: string
}
