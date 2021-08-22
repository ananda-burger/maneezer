import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import Track from 'view/components/Track'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Loading from 'view/components/icons/Loading'
import styled from 'styled-components'
import { RootState } from 'app/store'
import { AsyncThunk } from '@reduxjs/toolkit'
import * as user from 'store/userSlice'
import * as types from 'types'

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
  selectTracks,
  fetch
}: {
  isFavorite?: boolean
  selectHasMoreTracks: (state: RootState) => boolean
  selectIsLoadingTracks: (state: RootState) => boolean
  selectLastIndex: (state: RootState) => number
  selectTracks: (state: RootState) => types.Track[]
  fetch: AsyncThunk<
    types.Track[],
    { lastIndex: number; isLoading: boolean },
    {}
  >
}) {
  const dispatch = useDispatch()
  const lastIndex = useSelector(selectLastIndex)
  const isLoading = useSelector(selectIsLoadingTracks)
  const hasNextPage = useSelector(selectHasMoreTracks)
  const tracks = useSelector(selectTracks)
  const isLogged = useSelector(user.selectIsLogged)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(fetch({ lastIndex, isLoading })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    if (isLogged && isFavorite) {
      dispatch(fetch({ lastIndex, isLoading }))
    }
  }, [])

  const renderTracks = () => {
    return (
      <>
        {tracks.map((track) => {
          return <Track key={track.id} track={track} isFavorite={isFavorite} />
        })}
        {(isLoading || hasNextPage) && (
          <LoadingItem ref={sentryRef}>
            <Loading />
          </LoadingItem>
        )}
      </>
    )
  }

  return (
    <div>
      {isFavorite ? (
        isLogged ? (
          renderTracks()
        ) : (
          <div>Please login to see your favorites</div>
        )
      ) : (
        renderTracks()
      )}
    </div>
  )
}
