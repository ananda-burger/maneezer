import { DeezerResponse, LoginResponse, Track } from 'types'
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
