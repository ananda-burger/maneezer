import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import * as playlistsSlice from 'store/playlistsSlice'
import * as user from 'store/userSlice'
import * as createPlaylistModal from 'store/createPlaylistModalSlice'
import * as deletePlaylistModal from 'store/deletePlaylistModalSlice'
import Playlist from 'view/pages/playlists/Playlist'
import CreatePlaylistModal from 'view/pages/playlists/CreatePlaylistModal'
import DeletePlaylistModal from 'view/pages/playlists/DeletePlaylistModal'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import LoadingIcon from 'view/common/icons/LoadingIcon'
import PlusIcon from 'view/common/icons/PlusIcon'
import { styled } from 'view/common/theme'
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  gap: 1rem;
  padding: 2rem;
`

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary4};
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
  height: 250px;
  align-items: center;
  justify-content: center;
  justify-self: center;
  transition: 0.2s ease;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
    fill: white;
    background: ${({ theme }) => theme.colors.primary3};
  }
`

export default function PlaylistList() {
  const dispatch = useDispatch()
  const playlists = useSelector(playlistsSlice.selectPlaylists)
  const lastIndex = useSelector(playlistsSlice.selectLastIndex)
  const isLoading = useSelector(playlistsSlice.selectIsLoading)
  const hasNextPage = useSelector(playlistsSlice.selectHasMore)
  const isLogged = useSelector(user.selectIsLogged)
  const createPlaylistModalIsOpen = useSelector(
    createPlaylistModal.selectModalIsOpen
  )
  const deletePlaylistModalIsOpen = useSelector(
    deletePlaylistModal.selectModalIsOpen
  )

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

  const openCreatePlaylistModal = () => {
    dispatch(createPlaylistModal.open())
  }

  return (
    <>
      {isLogged ? (
        <>
          {createPlaylistModalIsOpen && <CreatePlaylistModal />}
          {deletePlaylistModalIsOpen && <DeletePlaylistModal />}
          <TracksHeader columns={['', '', '', '', '', '']} />
          <GridContainer>
            <GridItem onClick={openCreatePlaylistModal}>
              <PlusIcon />
              Create Playlist
            </GridItem>
            {playlists.map((playlist) => {
              return <Playlist key={playlist.id} playlist={playlist} />
            })}
          </GridContainer>
        </>
      ) : (
        <Container>Please log in to see your playlists</Container>
      )}
      {(isLoading || hasNextPage) && (
        <LoadingItem ref={sentryRef}>
          <LoadingIcon />
        </LoadingItem>
      )}
    </>
  )
}
