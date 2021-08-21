import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import * as types from 'types'
import Track from 'view/components/Track'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Loading from 'view/components/icons/Loading'
import styled from 'styled-components'
import { RootState } from 'app/store'
import { AsyncThunk } from '@reduxjs/toolkit'

const LoadingItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

export default function TrackList({
  isFavorite,
  selectHasMoreTracks,
  selectIsLoadingTracks,
  selectLastIndex,
  fetch,
  tracks
}: {
  isFavorite?: boolean
  selectHasMoreTracks: (state: RootState) => boolean
  selectIsLoadingTracks: (state: RootState) => boolean
  selectLastIndex: (state: RootState) => number
  fetch: AsyncThunk<
    types.Track[],
    { lastIndex: number; isLoading: boolean },
    {}
  >
  tracks: types.Track[]
}) {
  const lastIndex = useSelector(selectLastIndex)
  const isLoading = useSelector(selectIsLoadingTracks)
  const hasNextPage = useSelector(selectHasMoreTracks)
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(fetch({ lastIndex, isLoading })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    dispatch(fetch({ lastIndex, isLoading }))
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
