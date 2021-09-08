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

export interface Playlist {
  id: string
  title: string
  duration: number
  public: boolean
  is_loved_track: boolean
  collaborative: boolean
  nb_tracks: number
  fans: number
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  checksum: string
  tracklist: string
  creation_date: string
  md5_image: string
  picture_type: string
  time_add: string
  time_mod: string
  creator: {
    id: string
    name: string
    tracklist: string
    type: string
  }
  type: string
}

export interface TopTracksState {
  tracks: Track[]
  lastIndex: number
  isLoading: boolean
  hasMoreTracks: boolean
}

export interface FavoriteTracksState extends TopTracksState {}

export interface ArtistTracksState {
  [artistId: string]: TopTracksState
}

export interface PlaylistTracksState {
  [playlistId: string]: TopTracksState
}

export interface PlaylistsState {
  playlists: Playlist[]
  lastIndex: number
  isLoading: boolean
  hasMorePlaylists: boolean
}

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

export interface ModalState {
  isOpen: boolean
  title: string
}

export interface ConfirmationModalState {
  isOpen: boolean
  id: string
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

export interface DeezerPlaylistResponse {
  data: Playlist[]
  prev?: string
  total: number
}

export enum Route {
  Home = '/',
  Favorites = '/favorites',
  Search = '/search',
  Playlists = '/playlists',
  Playlist = '/playlists/:id',
  Artist = '/artist/:id'
}

export interface FetchPayload {
  lastIndex: number
  isLoading: boolean
  query?: string
  playlistId?: string
}

export interface FetchPlaylistPayload extends FetchPayload {
  playlistId: string
}

export interface FetchArtistPayload extends FetchPayload {
  artistId: string
}
