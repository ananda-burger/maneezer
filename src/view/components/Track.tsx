import { useDispatch } from 'app/hooks'
import { addToFavorites, removeFromFavorites } from 'store/trackSlice'
import { secondsToMinutes } from 'utilities'
import ExternalLink from 'view/components/icons/ExternalLink'
import FullHeart from 'view/components/icons/FullHeart'
import HollowHeart from 'view/components/icons/HollowHeart'
import Play from 'view/components/icons/Play'
import * as types from 'types'
import styled from 'styled-components'

const Container = styled.li`
  padding: 0.4rem 1.5rem;
  display: grid;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  justify-items: flex-start;
  grid-template-columns: 0.5fr 0.7fr 4fr 3fr 1fr 1fr;

  @media (hover: hover) {
    &:hover {
      border: none;
      border-radius:  5px;
      background-color:  rgba(255, 255, 255, 0.2);
      color: white;
  }
`

const Cover = styled.img`
  height: 3rem;
`

const TrackName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  margin-bottom: 0.2rem;
  max-width: 100%;
`

const ArtistName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
  font-size: 0.9rem;
`

const AlbumTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ButtonsContainer = styled.div`
  color: gray;
  display: flex;
  justify-self: end;

  a:last-child {
    margin-left: 0.8rem;
  }
`

export default function Track({
  track,
  isFavorite
}: {
  track: types.Track
  isFavorite?: boolean
}) {
  const dispatch = useDispatch()
  return (
    <Container>
      <Play />
      <Cover src={track.album.cover_small} alt="Album cover" />
      <div>
        <TrackName>{track.title}</TrackName>
        <ArtistName>{track.artist.name}</ArtistName>
      </div>
      <AlbumTitle>{track.album.title}</AlbumTitle>
      <div>{secondsToMinutes(track.duration)}</div>
      <ButtonsContainer>
        {isFavorite ? (
          <div onClick={() => dispatch(removeFromFavorites(track))}>
            <FullHeart />
          </div>
        ) : (
          <div onClick={() => dispatch(addToFavorites(track))}>
            <HollowHeart />
          </div>
        )}
        <a href={track.link} target="_blank" rel="noreferrer">
          <ExternalLink />
        </a>
      </ButtonsContainer>
    </Container>
  )
}
