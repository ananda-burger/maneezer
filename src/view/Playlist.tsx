import { useDispatch } from 'app/hooks'
import { Link } from 'react-router-dom'
import { secondsToMinutes } from 'utilities'
import { styled } from 'view/components/theme'
import * as confirmationModal from 'store/confirmationModalSlice'

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
  background: black;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 1.5px solid white;
  transition: 0.2s ease;
  &:hover {
    cursor: pointer;
    color: black;
    background: ${({ theme }) => theme.colors.secondary1};
  }
`

export default function Playlist({ playlist }) {
  const dispatch = useDispatch()

  const openConfirmationModal = (event, id: string) => {
    event.preventDefault()
    dispatch(confirmationModal.updateId(id))
    dispatch(confirmationModal.open())
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
      <DeleteButton onClick={(e) => openConfirmationModal(e, playlist.id)}>
        X
      </DeleteButton>
    </GridItem>
  )
}
