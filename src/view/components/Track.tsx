import { useDispatch, useSelector } from 'app/hooks'
import * as audio from 'store/audioSlice'
import * as favorites from 'store/favoriteTracksSlice'
import * as user from 'store/userSlice'
import * as types from 'types'
import styled from 'styled-components'
import { secondsToMinutes } from 'utilities'
import ExternalLink from 'view/components/icons/ExternalLink'
import FullHeart from 'view/components/icons/FullHeart'
import HollowHeart from 'view/components/icons/HollowHeart'
import Pause from 'view/components/icons/Pause'
import Play from 'view/components/icons/Play'

const Container = styled.li`
  padding: 0.5rem 1.5rem;
  align-items: center;
  display: grid;
  grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.7fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 0.8rem;

  @media (hover: hover) {
    &:hover {
      border: none;
      border-radius:  5px;
      background-color:  rgba(255, 255, 255, 0.2);
      color: white;
      fill: rgb(34, 34, 34);
  }
`

const Column = styled.div`
  max-width: 100%;
`

const Cover = styled.img`
  min-width: 2rem;
  max-width: 100%;
  min-height: 2rem;
  max-height: 3rem;
`

const TrackName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  margin-bottom: 0.35rem;
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
  const playingTrackId = useSelector(audio.selectPlayingTrackId)
  const isLogged = useSelector(user.selectIsLogged)

  return (
    <Container>
      {track.id === playingTrackId ? (
        <Column onClick={() => dispatch(audio.pause())}>
          <Pause />
        </Column>
      ) : (
        <Column onClick={() => dispatch(audio.play(track))}>
          <Play />
        </Column>
      )}
      <Column>
        <Cover src={track.album.cover_small} alt="Album cover" />
      </Column>
      <Column>
        <TrackName>{track.title}</TrackName>
        <ArtistName>{track.artist.name}</ArtistName>
      </Column>
      <Column>
        <AlbumTitle>{track.album.title}</AlbumTitle>
      </Column>
      <Column>
        <div>{secondsToMinutes(track.duration)}</div>
      </Column>
      <Column>
        <ButtonsContainer>
          {isFavorite ? (
            <div onClick={() => dispatch(favorites.remove(track))}>
              <FullHeart />
            </div>
          ) : (
            <div>
              {isLogged && (
                <div onClick={() => dispatch(favorites.add(track))}>
                  <HollowHeart />
                </div>
              )}
            </div>
          )}
          <a href={track.link} target="_blank" rel="noreferrer">
            <ExternalLink />
          </a>
        </ButtonsContainer>
      </Column>
    </Container>
  )
}
