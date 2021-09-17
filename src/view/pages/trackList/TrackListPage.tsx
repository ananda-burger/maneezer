import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Track from 'view/common/Track'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import LoadingIcon from 'view/common/icons/LoadingIcon'
import ClockIcon from 'view/common/icons/ClockIcon'
import { styled } from 'view/common/theme'
import { RootState } from 'app/store'
import { AsyncThunk } from '@reduxjs/toolkit'
import * as user from 'store/userSlice'
import * as types from 'types'
import TracksHeader from 'view/common/TracksHeader'

const LoadingItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`

const Message = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  white-space: nowrap;
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
  fetch: AsyncThunk<types.Track[], types.FetchPayload, {}>
}) {
  const dispatch = useDispatch()
  const lastIndex = useSelector(selectLastIndex)
  const isLoading = useSelector(selectIsLoadingTracks)
  const hasNextPage = useSelector(selectHasMoreTracks)
  const tracks = useSelector(selectTracks)
  const isLogged = useSelector(user.selectIsLogged)
  const location = useLocation()

  const playlistId = location.pathname.substr(11)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(fetch({ lastIndex, isLoading, playlistId })),
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
        <TracksHeader columns={['', '', 'TITLE', 'ALBUM', <ClockIcon />, '']} />
        {tracks.map((track) => {
          return <Track key={track.id} track={track} isFavorite={isFavorite} />
        })}
        {(isLoading || hasNextPage) && (
          <LoadingItem ref={sentryRef}>
            <LoadingIcon />
          </LoadingItem>
        )}
      </>
    )
  }

  return (
    <>
      {isFavorite ? (
        isLogged ? (
          renderTracks()
        ) : (
          <Container>
            <Message>Please login to see your favorites</Message>
          </Container>
        )
      ) : (
        renderTracks()
      )}
    </>
  )
}
