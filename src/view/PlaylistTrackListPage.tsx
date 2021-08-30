import * as playlists from 'store/playlistTracksSlice'
import * as user from 'store/userSlice'
import { useSelector, useDispatch } from 'app/hooks'
import { useParams } from 'react-router-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect } from 'react'
import LoadingIcon from 'view/components/icons/LoadingIcon'
import Track from 'view/Track'

interface Params {
  id: string
}

export default function PlaylistTrackList() {
  const { id: playlistId } = useParams<Params>()
  const tracks = useSelector(playlists.selectTracks(playlistId))
  const lastIndex = useSelector(playlists.selectLastIndex(playlistId))
  const hasNextPage = useSelector(playlists.selectHasMoreTracks(playlistId))
  const isLoading = useSelector(playlists.selectIsLoadingTracks(playlistId))
  const isLogged = useSelector(user.selectIsLogged)
  const dispatch = useDispatch()

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
  }, [isLogged, playlistId])

  return (
    <>
      {isLogged ? (
        <>
          {tracks.map((track) => {
            return <Track key={track.id} track={track} />
          })}
          {(isLoading || hasNextPage) && (
            <li ref={sentryRef}>
              <LoadingIcon />
            </li>
          )}
        </>
      ) : (
        <div>Please log in to see your playlists</div>
      )}
    </>
  )
}
