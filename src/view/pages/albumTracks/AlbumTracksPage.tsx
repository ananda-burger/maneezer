import * as albumSlice from 'store/albumSlice'
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
