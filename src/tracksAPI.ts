import { LoginResponse, Track } from 'types'

export const fetchTracks = (lastIndex: number, perPage: number) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/chart/0/tracks?index=${lastIndex}&limit=${perPage}`,
      (response) => {
        resolve(response.data)
      }
    )
  })
}

export const fetchFilteredTracks = (
  searchInput: string,
  lastIndex: number,
  perPage: number
) => {
  return new Promise<Track[]>((resolve, _reject) => {
    window.DZ.api(
      `/search?q=${searchInput}&index=${lastIndex}&limit=${perPage}`,
      (response) => {
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
      (response) => {
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
      { perms: 'basic_access,manage_library' }
    )
  })
}

export const loginStatus = () => {
  return new Promise<LoginResponse>((resolve, _reject) => {
    window.DZ.getLoginStatus((response) => {
      resolve(response)
    })
  })
}
