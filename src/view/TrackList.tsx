import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import {
  fetchTracks,
  selectLastIndex,
  selectIsLoadingTrack
} from 'store/trackSlice'
import * as types from 'types'
import Track from 'view/components/Track'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Loading from 'view/components/icons/Loading'
import styled from 'styled-components'

const LoadingItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

export default function TrackList({
  tracks,
  isFavorite
}: {
  tracks: types.Track[]
  isFavorite?: boolean
}) {
  const lastIndex = useSelector(selectLastIndex)
  const isLoading = useSelector(selectIsLoadingTrack)
  const hasNextPage = useSelector((state) => state.track.hasMoreTopTracks)
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(fetchTracks({ lastIndex, isLoading })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    dispatch(fetchTracks({ lastIndex, isLoading }))
  }, [])

  return (
    <div>
      <div>
        {tracks.map((track) => {
          return <Track key={track.id} track={track} isFavorite={isFavorite} />
        })}
        {(isLoading || hasNextPage) && (
          <LoadingItem ref={sentryRef}>
            <Loading />
          </LoadingItem>
        )}
      </div>
    </div>
  )
}
