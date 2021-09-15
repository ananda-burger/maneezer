import { useDispatch, useSelector } from 'app/hooks'
import { MouseEvent } from 'react'
import * as deletePlaylistModal from 'store/deletePlaylistModalSlice'
import * as playlist from 'store/playlistsSlice'
import { styled } from 'view/common/theme'
import LoadingIcon from 'view/common/icons/LoadingIcon'

const Backdrop = styled.div`
  position: fixed;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const ModalStyle = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  height: 50%;
  width: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary4};
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: #313131;
  z-index: 999;
  @media (max-width: 768px) {
    height: 70%;
    width: 80%;
  }
`

const Title = styled.div`
  color: white;
  font-weight: bold;
  margin: 2rem;
`

const ButtonsContainer = styled.div`
  color: white;
  margin: 2rem;
`

const DeleteButton = styled.button`
  margin: 0 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  color: black;
  font-size: 1rem;
  background: white;
  :hover {
    cursor: pointer;
    color: white;
    background: ${({ theme }) => theme.colors.secondary1};
  }
`

const CancelButton = styled.button`
  margin: 0 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  background: transparent;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

export default function DeletePlaylistModal() {
  const dispatch = useDispatch()
  const isLoading = useSelector(playlist.selectIsLoading)
  const playlistId = useSelector(deletePlaylistModal.selectId)

  const closeModal = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(deletePlaylistModal.close())
  }

  const createPlaylist = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(playlist.remove(playlistId))
    dispatch(deletePlaylistModal.close())
  }

  if (isLoading) {
    return (
      <ModalStyle>
        <LoadingIcon />
        <Backdrop />
      </ModalStyle>
    )
  }

  return (
    <div>
      <ModalStyle>
        <Title>Delete Playlist?</Title>
        <ButtonsContainer>
          <CancelButton onClick={closeModal}>CANCEL</CancelButton>
          <DeleteButton onClick={createPlaylist}>DELETE</DeleteButton>
        </ButtonsContainer>
      </ModalStyle>
      <Backdrop onClick={closeModal} />
    </div>
  )
}
