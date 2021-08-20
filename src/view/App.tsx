import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TrackList from 'view/TrackList'
import MainNavigation from 'view/components/MainNavigation'
import TracksHeader from 'view/components/TracksHeader'
import { selectTracks, selectFavoriteTracks } from 'store/trackSlice'
import { useSelector } from 'app/hooks'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
      font-family: 'Roboto', sans-serif;
      background-color:  black;
      color:  darkgray;
  }

  a {
    text-decoration: none;
    color: darkgray;
  }

  .app-icon {
    width: 1.3rem;
    height: 1.3rem;
  }
`

export default function App() {
  const topTracks = useSelector(selectTracks)
  const favoriteTracks = useSelector(selectFavoriteTracks)

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <MainNavigation />
        <TracksHeader />
        <Switch>
          <Route path="/" exact>
            <TrackList tracks={topTracks} />
          </Route>
          <Route path="/favorites">
            <TrackList tracks={favoriteTracks} isFavorite={true} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
