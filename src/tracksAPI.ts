import { LoginResponse, Track } from 'types'

const FAVORITE_TRACKS: { data: Track[]; total: number } = {
  data: [
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
  ],
  total: 0
}

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

export const fetchFavoriteTracks = (lastIndex: number, perPage: number) => {
  return new Promise<Track[]>((resolve, _reject) => {
    setTimeout(
      () => resolve(FAVORITE_TRACKS.data.slice(lastIndex, lastIndex + perPage)),
      Math.random() * 1000
    )
  })
}

export const login = () => {
  return new Promise<LoginResponse>((resolve, _reject) => {
    window.DZ.login(
      (response) => {
        if (response.status === 'connected') {
          console.log('login', response)
          resolve(response)
        }
      },
      { perms: 'basic_access,manage_library' }
    )
  })
}
