import { useDispatch } from 'app/hooks'
import { Link } from 'react-router-dom'
import { secondsToMinutes } from 'utilities'
import { styled } from 'view/common/theme'
import * as deletePlaylistModal from 'store/deletePlaylistModalSlice'
import TrashIcon from 'view/common/icons/TrashIcon'

const GridItem = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
  height: 250px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary3};
  transition: 0.2s ease;
  justify-self: center;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary5};
    fill: white;
    background: ${({ theme }) => theme.colors.primary4};
    div {
      font-weight: bold;
    }
    img {
      box-shadow: black 0px 0px 10px;
    }
    button {
      opacity: 1;
    }
  }
`

const Title = styled.div`
  color: white;
  padding-bottom: 0.5rem;
  max-width: 125px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Cover = styled.img`
  margin: 1rem;
  max-width: 125px;
  border-radius: 3px;
`

const Info = styled.p`
  font-size: 0.9rem;
  max-width: 125px;
  white-space: nowrap;
  overflow: hidden;

  text-overflow: ellipsis;
`

const DeleteButton = styled.button`
  opacity: 0;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: white;
  height: 2.5rem;
  width: 2.5rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.primary4};
  transition: 0.2s ease;
  &:hover {
    cursor: pointer;
    fill: none;
    background: ${({ theme }) => theme.colors.secondary1};
  }
`

export default function Playlist({ playlist }) {
  const dispatch = useDispatch()

  const openDeletePlaylistModal = (id: string) => {
    dispatch(deletePlaylistModal.open(id))
  }

  return (
    <GridItem to={`/playlists/${playlist.id}`}>
      <Cover
        src={
          playlist.picture_medium ||
          'https://cdns-images.dzcdn.net/images/cover//250x250-000000-80-0-0.jpg'
        }
        alt="Playlist cover"
      />
      <Title>{playlist.title}</Title>
      <Info>{playlist.nb_tracks} tracks</Info>
      <Info>{secondsToMinutes(playlist.duration)}</Info>
      <DeleteButton
        onClick={(e) => {
          e.preventDefault()
          openDeletePlaylistModal(playlist.id)
        }}
      >
        <TrashIcon />
      </DeleteButton>
    </GridItem>
  )
}
