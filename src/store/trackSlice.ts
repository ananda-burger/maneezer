import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { State } from 'types'

const tracks = {
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
    },
    {
      id: 1450292592,
      title: 'Arranhão (Ao Vivo)',
      title_short: 'Arranhão',
      title_version: '(Ao Vivo)',
      link: 'https://www.deezer.com/track/1450292592',
      duration: 153,
      rank: 993200,
      explicit_lyrics: true,
      explicit_content_lyrics: 0,
      explicit_content_cover: 0,
      preview:
        'https://cdns-preview-7.dzcdn.net/stream/c-7a0cbcd2ee3363ace2cd26c4e0fe9c2d-4.mp3',
      md5_image: '9d94b664c0ec2abaf3ab7df5429a9546',
      position: 2,
      artist: {
        id: 4876653,
        name: 'Henrique & Juliano',
        link: 'https://www.deezer.com/artist/4876653',
        picture: 'https://api.deezer.com/artist/4876653/image',
        picture_small:
          'https://cdns-images.dzcdn.net/images/artist/439d0e35b1c2269ede25e3f30aae8f4c/56x56-000000-80-0-0.jpg',
        picture_medium:
          'https://cdns-images.dzcdn.net/images/artist/439d0e35b1c2269ede25e3f30aae8f4c/250x250-000000-80-0-0.jpg',
        picture_big:
          'https://cdns-images.dzcdn.net/images/artist/439d0e35b1c2269ede25e3f30aae8f4c/500x500-000000-80-0-0.jpg',
        picture_xl:
          'https://cdns-images.dzcdn.net/images/artist/439d0e35b1c2269ede25e3f30aae8f4c/1000x1000-000000-80-0-0.jpg',
        radio: true,
        tracklist: 'https://api.deezer.com/artist/4876653/top?limit=50',
        type: 'artist'
      },
      album: {
        id: 248346272,
        title: 'Arranhão (Ao Vivo)',
        cover: 'https://api.deezer.com/album/248346272/image',
        cover_small:
          'https://cdns-images.dzcdn.net/images/cover/9d94b664c0ec2abaf3ab7df5429a9546/56x56-000000-80-0-0.jpg',
        cover_medium:
          'https://cdns-images.dzcdn.net/images/cover/9d94b664c0ec2abaf3ab7df5429a9546/250x250-000000-80-0-0.jpg',
        cover_big:
          'https://cdns-images.dzcdn.net/images/cover/9d94b664c0ec2abaf3ab7df5429a9546/500x500-000000-80-0-0.jpg',
        cover_xl:
          'https://cdns-images.dzcdn.net/images/cover/9d94b664c0ec2abaf3ab7df5429a9546/1000x1000-000000-80-0-0.jpg',
        md5_image: '9d94b664c0ec2abaf3ab7df5429a9546',
        tracklist: 'https://api.deezer.com/album/248346272/tracks',
        type: 'album'
      },
      type: 'track'
    }
  ],
  total: 2
}

const initialState: State = {
  value: []
}

export const selectTracks = (state: RootState) => {
  return state.track.value
}

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    loadTracks: (state) => {
      state.value = tracks.data
    },
    addTrack: (state) => {
      state.value.push(tracks.data[0])
    }
  }
})

export const { loadTracks, addTrack } = trackSlice.actions
export const { reducer } = trackSlice
