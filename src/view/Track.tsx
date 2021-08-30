import { useDispatch, useSelector } from 'app/hooks'
import * as audio from 'store/audioSlice'
import * as favorites from 'store/favoriteTracksSlice'
import * as user from 'store/userSlice'
import * as types from 'types'
import { styled } from 'view/components/theme'
import { secondsToMinutes } from 'utilities'
import ExternalLink from 'view/components/icons/ExternalLink'
import FullHeart from 'view/components/icons/FullHeart'
import HollowHeart from 'view/components/icons/HollowHeart'
import Pause from 'view/components/icons/Pause'
import Play from 'view/components/icons/Play'

const Container = styled.li<{ isPlaying: boolean }>`
  padding: 0.5rem 1.5rem;
  align-items: center;
  display: grid;
  grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.7fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 0.8rem;
  background-color: ${({ isPlaying }) =>
    isPlaying ? 'rgb(227,77,134,0.25)' : 'transparent'};

  @media (hover: hover) {
    &:hover {
      border: none;
      border-radius:  5px;
      background-color: ${({ theme, isPlaying }) =>
        isPlaying ? 'rgb(227,77,134,0.4)' : theme.colors.primary4};
      color: white;
  }

  @media (max-width: 768px) {
    & {
      grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.7fr) minmax(0, 4fr) minmax(0, 1fr);
    }
  }
`

const Column = styled.div`
  max-width: 100%;
`

const ColumnLarge = styled(Column)`
  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
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
  color: ${({ theme }) => theme.colors.primary5};
  font-size: 0.9rem;
`

const AlbumTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ButtonsContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary5};
  display: flex;
  justify-content: flex-end;

  & > div {
    margin-left: 0.8rem;
  }

  & > div:first-child {
    margin: 0;
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
  const isPlaying = track.id === playingTrackId

  return (
    <Container isPlaying={isPlaying}>
      {isPlaying ? (
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
      <ColumnLarge>
        <AlbumTitle>{track.album.title}</AlbumTitle>
      </ColumnLarge>
      <ColumnLarge>
        <div>{secondsToMinutes(track.duration)}</div>
      </ColumnLarge>
      <Column>
        <ButtonsContainer>
          {isFavorite ? (
            <div onClick={() => dispatch(favorites.remove(track))}>
              <FullHeart />
            </div>
          ) : (
            isLogged && (
              <div>
                <div onClick={() => dispatch(favorites.add(track))}>
                  <HollowHeart />
                </div>
              </div>
            )
          )}
          <div>
            <a href={track.link} target="_blank" rel="noreferrer">
              <ExternalLink />
            </a>
          </div>
        </ButtonsContainer>
      </Column>
    </Container>
  )
}
