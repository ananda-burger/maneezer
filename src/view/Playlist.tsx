import { Link } from 'react-router-dom'
import { secondsToMinutes } from 'utilities'
import { styled } from 'view/components/theme'

const GridItem = styled(Link)`
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

export default function Playlist({ playlist }) {
  return (
    <GridItem to={`/playlists/${playlist.id}`}>
      <Cover src={playlist.picture_medium} alt="Playlist cover" />
      <Title>{playlist.title}</Title>
      <Info>{playlist.nb_tracks} tracks</Info>
      <Info>{secondsToMinutes(playlist.duration)}</Info>
    </GridItem>
  )
}
