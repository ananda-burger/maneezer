import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as favorites from 'store/favoriteTracksSlice'
import * as search from 'store/searchSlice'
import * as top from 'store/topTracksSlice'
import * as user from 'store/userSlice'
import * as popUp from 'store/popUpSlice'
import * as types from 'types'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import reset from 'styled-reset'
import MainNavigation from 'view/MainNavigation'
import TrackList from 'view/TrackListPage'
import NotFound from 'view/NotFoundPage'
import { useDispatch, useSelector } from 'app/hooks'
import { styled, theme } from 'view/components/theme'
import PlaylistList from 'view/PlaylistListPage'
import PlaylistTrackList from 'view/pages/playlistTracks/PlaylistTrackListPage'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
      font-family: 'Roboto', sans-serif;
      background-color:  ${theme.colors.primary2};
      color:  darkgray;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.9);
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: ${theme.colors.primary4};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary4};
    border-radius: 20px;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary5};
    transition: color 0.12s;
    &:hover {
      color: ${theme.colors.secondary1};
    }
  }

  .app-icon {
    width: 1.3rem;
    height: 1.3rem;
  }
`

const PopUp = styled.div`
  position: fixed;
  display: inline;
  box-shadow: 1px 1px 10px ${theme.colors.secondary1};
  bottom: 2rem;
  border: 1.5px solid ${theme.colors.secondary1};
  font-weight: bold;
  color: white;
  right: 2rem;
  padding: 1.1rem;
  border-radius: 5px;
  background: ${theme.colors.secondary2};
  max-width: 35ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 10ch;
`

const Container = styled.div`
  max-width: 1536px;
  margin: 0 auto;
`

export default function App() {
  const dispatch = useDispatch()
  const popUpIsOpen = useSelector(popUp.selectIsOpen)
  const popUpMessage = useSelector(popUp.selectMessage)

  useEffect(() => {
    dispatch(user.fetchLoginStatus())
  }, [])

  const renderPopUp = () => {
    return <PopUp>{popUpMessage}</PopUp>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {popUpIsOpen && renderPopUp()}
        <GlobalStyle />
        <BrowserRouter>
          <MainNavigation />
          <Switch>
            <Route path={types.Route.Home} exact>
              <TrackList
                selectLastIndex={top.selectLastIndex}
                selectIsLoadingTracks={top.selectIsLoadingTracks}
                selectHasMoreTracks={top.selectHasMoreTracks}
                fetch={top.fetch}
                selectTracks={top.selectTracks}
              />
            </Route>
            <Route path={types.Route.Favorites}>
              <TrackList
                selectLastIndex={favorites.selectLastIndex}
                selectIsLoadingTracks={favorites.selectIsLoadingTracks}
                selectHasMoreTracks={favorites.selectHasMoreTracks}
                selectTracks={favorites.selectTracks}
                fetch={favorites.fetch}
                isFavorite={true}
              />
            </Route>
            <Route path={types.Route.Search}>
              <TrackList
                selectTracks={search.selectTracks}
                selectLastIndex={search.selectLastIndex}
                selectIsLoadingTracks={search.selectIsLoadingTracks}
                selectHasMoreTracks={search.selectHasMoreTracks}
                fetch={search.fetch}
              />
            </Route>
            <Route path={types.Route.Playlists} exact>
              <PlaylistList />
            </Route>
            <Route path={types.Route.Playlist}>
              <PlaylistTrackList />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}
