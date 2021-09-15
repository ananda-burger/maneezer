import { useDispatch, useSelector } from 'app/hooks'
import { MouseEvent } from 'react'
import * as createPlaylistModal from 'store/createPlaylistModalSlice'
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

const Input = styled.input`
  margin: 3.5rem 0;
  font-size: 1.1rem;
  color: white;
  width: 90%;
  height: 2.3rem;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary1};
  background: transparent;
  outline: none;

  @media (max-width: 768px) {
    & {
      width: 85%;
    }
  }
`

const ModalStyle = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  height: 50%;
  width: 60%;
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
`

const ButtonsContainer = styled.div`
  color: white;
`

const CreateButton = styled.button`
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

export default function CreatePlaylistModal() {
  const dispatch = useDispatch()
  const isLoading = useSelector(playlist.selectIsLoading)
  const playlistTitle = useSelector(createPlaylistModal.selectTitle)

  const closeModal = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(createPlaylistModal.close())
  }

  const createPlaylist = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(playlist.create(playlistTitle))
    dispatch(createPlaylistModal.close())
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
        <Title>Create Playlist</Title>
        <Input
          placeholder="Title"
          autoFocus
          onChange={(e) => {
            dispatch(createPlaylistModal.update(e.target.value))
          }}
          onKeyUp={(e) => {
            if (e.key === 'Escape') {
              dispatch(createPlaylistModal.close())
            } else if (e.key === 'Enter') {
              dispatch(createPlaylistModal.update(playlistTitle))
            }
          }}
        />
        <ButtonsContainer>
          <CancelButton onClick={closeModal}>CANCEL</CancelButton>
          <CreateButton onClick={createPlaylist}>CREATE</CreateButton>
        </ButtonsContainer>
      </ModalStyle>
      <Backdrop onClick={closeModal} />
    </div>
  )
}
