import * as artist from 'store/artistTracksSlice'
import * as user from 'store/userSlice'
import { useSelector, useDispatch } from 'app/hooks'
import { useParams } from 'react-router-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect } from 'react'
import LoadingIcon from 'view/components/icons/LoadingIcon'
import Track from 'view/Track'
import { styled } from 'view/components/theme'

interface Params {
  id: string
}

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

export default function PlaylistTrackList() {
  const { id: artistId } = useParams<Params>()
  const tracks = useSelector(artist.selectTracks(artistId))
  const lastIndex = useSelector(artist.selectLastIndex(artistId))
  const hasNextPage = useSelector(artist.selectHasMoreTracks(artistId))
  const isLoading = useSelector(artist.selectIsLoadingTracks(artistId))
  const isLogged = useSelector(user.selectIsLogged)
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(artist.fetch({ lastIndex, isLoading, artistId })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    if (isLogged) {
      dispatch(artist.fetch({ lastIndex, isLoading, artistId }))
    }
  }, [isLogged, artistId])

  return (
    <>
      {isLogged ? (
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
      ) : (
        <Container>Please log in to see your playlists</Container>
      )}
    </>
  )
}
