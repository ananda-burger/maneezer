import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'app/hooks'
import * as audio from 'store/audioSlice'
import * as favorites from 'store/favoriteTracksSlice'
import * as user from 'store/userSlice'
import * as types from 'types'
import { styled } from 'view/components/theme'
import { secondsToMinutes } from 'utilities'
// import ExternalLinkIcon from 'view/components/icons/ExternalLinkIcon'
import FullHeartIcon from 'view/components/icons/FullHeartIcon'
import HollowHeartIcon from 'view/components/icons/HollowHeartIcon'
import PauseIcon from 'view/components/icons/PauseIcon'
import PlayIcon from 'view/components/icons/PlayIcon'
import EtcIcon from 'view/components/icons/EtcIcon'

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

const ArtistLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.primary5};
  font-size: 0.9rem;
  :hover {
    color: ${({ theme }) => theme.colors.secondary1};
    cursor: pointer;
  }
`

const AlbumLink = styled(Link)`
  :hover {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

export default function Track({ track }: { track: types.Track }) {
  const dispatch = useDispatch()
  const playingTrackId = useSelector(audio.selectPlayingTrackId)
  const isLogged = useSelector(user.selectIsLogged)
  const isPlaying = track.id === playingTrackId

  return (
    <Container isPlaying={isPlaying}>
      {isPlaying ? (
        <Column onClick={() => dispatch(audio.pause())}>
          <PauseIcon />
        </Column>
      ) : (
        <Column onClick={() => dispatch(audio.play(track))}>
          <PlayIcon />
        </Column>
      )}
      {track.album ? (
        <Column>
          <Cover src={track.album.cover_small} alt="Album cover" />
        </Column>
      ) : (
        <Column></Column>
      )}
      <Column>
        <TrackName>{track.title}</TrackName>
        <ArtistLink to={`/artist/${track.artist.id}`}>
          {track.artist.name}
        </ArtistLink>
      </Column>
      {track.album ? (
        <ColumnLarge>
          <AlbumTitle>{track.album.title}</AlbumTitle>
        </ColumnLarge>
      ) : (
        <ColumnLarge></ColumnLarge>
      )}
      <ColumnLarge>
        <div>{secondsToMinutes(track.duration)}</div>
      </ColumnLarge>
      <Column>
        <ButtonsContainer>
          {isLogged && (
            <div>
              <div onClick={() => dispatch(favorites.add(track))}>
                <HollowHeartIcon />
              </div>
            </div>
          )}
          <div>
            {/* <div>Entire track on Deezer</div> */}
            {/* <div>Add to playlist...</div> */}
            {/* <a href={track.link} target="_blank" rel="noreferrer"> */}
            {/*   <ExternalLinkIcon /> */}
            {/* </a> */}
            <EtcIcon />
          </div>
        </ButtonsContainer>
      </Column>
    </Container>
  )
}
