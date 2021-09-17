import * as artist from 'store/artistSlice'
import { useSelector, useDispatch } from 'app/hooks'
import { useParams } from 'react-router-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect } from 'react'
import LoadingIcon from 'view/common/icons/LoadingIcon'
import Track from 'view/common/Track'
import TracksHeader from 'view/common/TracksHeader'
import { styled } from 'view/common/theme'
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
  color: white;
  font-size: 2rem;
  padding-left: 2rem;
`

const Cover = styled.img`
  border-radius: 50%;
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 1rem;
`

export default function ArtistTrackList() {
  const { id: artistId } = useParams<Params>()
  const currentArtist = useSelector(artist.selectArtist(artistId))
  const tracks = useSelector(artist.selectTracks(artistId))
  const lastIndex = useSelector(artist.selectLastIndex(artistId))
  const hasNextPage = useSelector(artist.selectHasMoreTracks(artistId))
  const isLoading = useSelector(artist.selectIsLoadingTracks(artistId))
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(artist.fetchTracks({ lastIndex, isLoading, artistId })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    dispatch(artist.fetchTracks({ lastIndex, isLoading, artistId }))
    dispatch(artist.fetchArtist({ artistId }))
  }, [artistId])

  return (
    <>
      <CoverContainer>
        <Cover src={currentArtist.picture_medium} alt={currentArtist.name} />
        <div>{currentArtist.name}</div>
      </CoverContainer>
      <TracksHeader columns={['', '', 'TITLE', 'ALBUM', <ClockIcon />, '']} />
      {tracks.map((track) => {
        return <Track key={track.id} track={track} />
      })}
      {(isLoading || hasNextPage) && (
        <LoadingItem ref={sentryRef}>
          <LoadingIcon />
        </LoadingItem>
      )}
    </>
  )
}
