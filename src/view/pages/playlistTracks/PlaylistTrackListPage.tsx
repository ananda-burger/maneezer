import * as playlistTracks from 'store/playlistTracksSlice'
import * as user from 'store/userSlice'
import * as util from 'utilities'
import { useSelector, useDispatch } from 'app/hooks'
import { useParams } from 'react-router-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect } from 'react'
import LoadingIcon from 'view/common/icons/LoadingIcon'
import ClockIcon from 'view/common/icons/ClockIcon'
import Track from 'view/common/Track'
import { styled } from 'view/common/theme'
import TracksHeader from 'view/common/TracksHeader'

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

const CoverContainer = styled.div`
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
`

const TitleContainer = styled.div`
  align-items: flex-end;
  color: white;
  font-size: 2rem;
`

const TitleType = styled.div`
  color: ${({ theme }) => theme.colors.primary5};
  font-size: 1rem;
  padding-bottom: 0.3rem;
`

const Cover = styled.img`
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 1rem;
`
export default function PlaylistTrackList() {
  const { id: playlistId } = useParams<Params>()
  const currentPlaylist = useSelector(playlistTracks.selectPlaylist(playlistId))
  const tracks = useSelector(playlistTracks.selectTracks(playlistId))
  const lastIndex = useSelector(playlistTracks.selectLastIndex(playlistId))
  const hasNextPage = useSelector(
    playlistTracks.selectHasMoreTracks(playlistId)
  )
  const isLoading = useSelector(
    playlistTracks.selectIsLoadingTracks(playlistId)
  )
  const isLogged = useSelector(user.selectIsLogged)
  const dispatch = useDispatch()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(playlistTracks.fetch({ lastIndex, isLoading, playlistId })),
    rootMargin: '0px 0px 150px 0px'
  })

  useEffect(() => {
    if (isLogged) {
      dispatch(playlistTracks.fetch({ lastIndex, isLoading, playlistId }))
      dispatch(playlistTracks.fetchPlaylist({ playlistId }))
    }
  }, [isLogged, playlistId])

  return (
    <>
      {isLogged ? (
        <>
          <CoverContainer>
            <Cover
              src={currentPlaylist.picture_medium}
              alt={currentPlaylist.title}
            />
            <TitleContainer>
              <TitleType>PLAYLIST</TitleType>
              <TitleType>
                {currentPlaylist.nb_tracks}{' '}
                {currentPlaylist.nb_tracks > 1 ? 'Tracks' : 'Track'} -{' '}
                {util.secondsToMinutes(currentPlaylist.duration)}
              </TitleType>
              <div>{currentPlaylist.title}</div>
            </TitleContainer>
          </CoverContainer>
          <TracksHeader
            columns={['', '', 'TITLE', 'ALBUM', <ClockIcon />, '']}
          />
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
