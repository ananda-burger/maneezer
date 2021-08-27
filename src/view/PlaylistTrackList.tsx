import * as playlists from 'store/playlistTracksSlice'
import * as user from 'store/userSlice'
import { useSelector, useDispatch } from 'app/hooks'
import { useLocation } from 'react-router-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect } from 'react'
import Loading from 'view/components/icons/Loading'
import Track from 'view/Track'

export default function PlaylistTrackList() {
  const tracks = useSelector(playlists.selectTracks)
  const lastIndex = useSelector(playlists.selectLastIndex)
  const hasNextPage = useSelector(playlists.selectHasMoreTracks)
  const isLoading = useSelector(playlists.selectIsLoadingTracks)
  const isLogged = useSelector(user.selectIsLogged)
  const dispatch = useDispatch()
  const location = useLocation()
  const playlistId = location.pathname.substr(11)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(playlists.fetch({ lastIndex, isLoading, playlistId })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    if (isLogged) {
      dispatch(playlists.fetch({ lastIndex, isLoading, playlistId }))
    }
  }, [isLogged])

  return (
    <>
      {isLogged ? (
        <>
          {tracks.map((track) => {
            return <Track key={track.id} track={track} />
          })}
          {(isLoading || hasNextPage) && (
            <li ref={sentryRef}>
              <Loading />
            </li>
          )}
        </>
      ) : (
        <div>Please log in to see your playlists</div>
      )}
    </>
  )
}
