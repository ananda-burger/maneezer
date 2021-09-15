import * as artist from 'store/artistTracksSlice'
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

export default function ArtistTrackList() {
  const { id: artistId } = useParams<Params>()
  const tracks = useSelector(artist.selectTracks(artistId))
  const lastIndex = useSelector(artist.selectLastIndex(artistId))
  const hasNextPage = useSelector(artist.selectHasMoreTracks(artistId))
  const isLoading = useSelector(artist.selectIsLoadingTracks(artistId))
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(artist.fetch({ lastIndex, isLoading, artistId })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    dispatch(artist.fetch({ lastIndex, isLoading, artistId }))
  }, [artistId])

  return (
    <>
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
