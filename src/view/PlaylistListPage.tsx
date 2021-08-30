import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import * as playlistsSlice from 'store/playlistsSlice'
import * as user from 'store/userSlice'
import Playlist from 'view/Playlist'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import LoadingIcon from 'view/components/icons/LoadingIcon'

export default function PlaylistList() {
  const dispatch = useDispatch()
  const playlists = useSelector(playlistsSlice.selectPlaylists)
  const lastIndex = useSelector(playlistsSlice.selectLastIndex)
  const isLoading = useSelector(playlistsSlice.selectIsLoading)
  const hasNextPage = useSelector(playlistsSlice.selectHasMore)
  const isLogged = useSelector(user.selectIsLogged)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(playlistsSlice.fetch({ lastIndex, isLoading })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    if (isLogged) {
      dispatch(playlistsSlice.fetch({ lastIndex, isLoading }))
    }
  }, [isLogged])

  return (
    <>
      {isLogged ? (
        <>
          <div>Create playlist</div>
          {playlists.map((playlist) => {
            return <Playlist key={playlist.id} playlist={playlist} />
          })}
        </>
      ) : (
        <div>Please log in to see your playlists</div>
      )}
      {(isLoading || hasNextPage) && (
        <li ref={sentryRef}>
          <LoadingIcon />
        </li>
      )}
    </>
  )
}
