import {
  DeezerPlaylistResponse,
  DeezerResponse,
  LoginResponse,
  Playlist,
  Track
} from 'types'
import Cookies from 'js-cookie'

export const fetchTracks = (lastIndex: number, perPage: number) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/chart/0/tracks?index=${lastIndex}&limit=${perPage}`,
      (response: DeezerResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const fetchFilteredTracks = (
  searchInput: string | void,
  lastIndex: number,
  perPage: number
) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/search?q=${searchInput}&index=${lastIndex}&limit=${perPage}`,
      (response: DeezerResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const fetchFavoriteTracks = (
  id: string,
  lastIndex: number,
  perPage: number
) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/user/${id}/tracks?index=${lastIndex}&limit=${perPage}`,
      (response: DeezerResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const addToFavorites = (id: string, track: Track) => {
  return new Promise<Track>((resolve, reject) => {
    window.DZ.api(
      `user/${id}/tracks`,
      'POST',
      { track_id: track.id },
      (response: any) => {
        if (typeof response === 'boolean') {
          resolve(track)
        } else {
          reject(response.error.message)
        }
      }
    )
  })
}

export const removeFromFavorites = (id: string, track: Track) => {
  return new Promise<Track>((resolve, _reject) => {
    window.DZ.api(
      `user/${id}/tracks`,
      'DELETE',
      { track_id: track.id },
      (_response: any) => {
        resolve(track)
      }
    )
  })
}

export const fetchPlaylists = (
  id: string,
  lastIndex: number,
  perPage: number
) => {
  return new Promise<Playlist[]>((resolve, _reject) => {
    window.DZ.api(
      `/user/${id}/playlists?index=${lastIndex}&limit=${perPage}`,
      (response: DeezerPlaylistResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const createPlaylist = (userId: string, playlistTitle: string) => {
  return new Promise<Playlist[]>((resolve, reject) => {
    window.DZ.api(
      `/user/${userId}/playlists`,
      'POST',
      { title: playlistTitle },
      (response: any) => {
        if (response.id) {
          resolve([
            {
              id: response.id,
              title: playlistTitle,
              duration: 0,
              public: true,
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
              time_add: '',
              time_mod: '',
              creator: {
                id: '',
                name: '',
                tracklist: '',
                type: ''
              },
              type: 'playlist'
            }
          ])
        } else {
          reject(response.error.message)
        }
      }
    )
  })
}

export const removePlaylist = (playlistId: string) => {
  return new Promise<string>((resolve, reject) => {
    window.DZ.api(`/playlist/${playlistId}`, 'DELETE', (response: any) => {
      if (typeof response === 'boolean') {
        resolve(playlistId)
      } else {
        reject(response.error.message)
      }
    })
  })
}

export const fetchPlaylistTracks = (
  lastIndex: number,
  perPage: number,
  playlistId: string
) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/playlist/${playlistId}/tracks?index=${lastIndex}&limit=${perPage}`,
      (response: DeezerResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const fetchArtistTracks = (
  lastIndex: number,
  perPage: number,
  id: string
) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/artist/${id}/top?index=${lastIndex}&limit=${perPage}`,
      (response: DeezerResponse) => {
        resolve(response.data)
      }
    )
  })
}

export const login = () => {
  return new Promise<LoginResponse>((resolve, _reject) => {
    window.DZ.login(
      (response) => {
        if (response.status === 'connected') {
          resolve(response)
        }
      },
      { perms: 'basic_access,manage_library,delete_library' }
    )
  })
}

export const logout = () => {
  return new Promise<boolean>((resolve, _reject) => {
    window.DZ.logout()
    window.DZ.clearDeezer()
    Cookies.remove('currentAuthResponse')
    resolve(true)
  })
}

export const loginStatus = () => {
  return new Promise<LoginResponse>((resolve, _reject) => {
    window.DZ.getLoginStatus((response) => {
      resolve(response)
    })
  })
}
