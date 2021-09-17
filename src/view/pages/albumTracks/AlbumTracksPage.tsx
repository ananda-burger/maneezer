import * as albumSlice from 'store/albumSlice'
import * as util from 'utilities'
import { useSelector, useDispatch } from 'app/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import AlbumTrack from 'view/pages/albumTracks/AlbumTrack'
import { styled } from 'view/common/theme'
import TracksHeader from 'view/common/TracksHeader'
import ClockIcon from 'view/common/icons/ClockIcon'

interface Params {
  id: string
}

const LoadingItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

const CoverContainer = styled.div`
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
`

const TitleContainer = styled.div`
  align-items: flex-end;
  color: white;
  font-size: 2rem;
`

const TitleType = styled.div`
  color: ${({ theme }) => theme.colors.primary5};
  font-size: 1rem;
  padding-bottom: 0.3rem;
`

const Cover = styled.img`
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 1rem;
`
export default function AlbumTrackList() {
  const { id: albumId } = useParams<Params>()
  const album = useSelector(albumSlice.selectAlbum(albumId))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(albumSlice.fetch({ albumId }))
  }, [albumId])

  if (album) {
    return (
      <>
        <CoverContainer>
          <Cover src={album.cover_medium} alt={album.title} />
          <TitleContainer>
            <TitleType>ALBUM</TitleType>
            <TitleType>
              {album.nb_tracks} {album.nb_tracks > 1 ? 'Tracks' : 'Track'} -{' '}
              {util.secondsToMinutes(album.duration)}
            </TitleType>
            <div>{album.title}</div>
          </TitleContainer>
        </CoverContainer>
        <TracksHeader columns={['', '', 'TITLE', '', <ClockIcon />, '']} />
        {album.tracks.data.map((track) => {
          return <AlbumTrack key={track.id} track={track} />
        })}
      </>
    )
  } else {
    // show a message that it's loading
  }

  return (
    <>
      {/* {tracks.map((track) => { */}
      {/*   return <AlbumTrack key={track.id} track={track} /> */}
      {/* })} */}
      {/* {(isLoading || hasNextPage) && ( */}
      {/*   <LoadingItem ref={sentryRef}> */}
      {/*     <LoadingIcon /> */}
      {/*   </LoadingItem> */}
      {/* )} */}
    </>
  )
}
