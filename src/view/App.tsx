import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TrackList from 'view/TrackList'
import MainNavigation from 'view/components/MainNavigation'
import TracksHeader from 'view/components/TracksHeader'
import { selectTracks, selectFavoriteTracks } from 'store/trackSlice'
import { useSelector } from 'app/hooks'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import * as search from 'store/searchSlice'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
      font-family: 'Roboto', sans-serif;
      background-color:  rgb(18, 18, 18);
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
  const isSearching = useSelector(search.selectIsSearching)
  const filteredTracks = useSelector(search.selectTracks)

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <MainNavigation isSearching={isSearching} />
        <TracksHeader />
        <Switch>
          <Route path="/" exact>
            <TrackList tracks={topTracks} />
          </Route>
          <Route path="/favorites">
            <TrackList tracks={favoriteTracks} isFavorite={true} />
          </Route>
          <Route path="/search">
            <TrackList tracks={filteredTracks} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
