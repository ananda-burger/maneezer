import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as favorites from 'store/favoriteTracksSlice'
import * as search from 'store/searchSlice'
import * as top from 'store/topTracksSlice'
import * as user from 'store/userSlice'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import MainNavigation from 'view/components/MainNavigation'
import TracksHeader from 'view/components/TracksHeader'
import TrackList from 'view/TrackList'
import { useDispatch } from 'app/hooks'

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(user.fetchLoginStatus())
  }, [])

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <MainNavigation />
        <TracksHeader />
        <Switch>
          <Route path="/" exact>
            <TrackList
              selectLastIndex={top.selectLastIndex}
              selectIsLoadingTracks={top.selectIsLoadingTracks}
              selectHasMoreTracks={top.selectHasMoreTracks}
              fetch={top.fetch}
              selectTracks={top.selectTracks}
            />
          </Route>
          <Route path="/favorites">
            <TrackList
              selectLastIndex={favorites.selectLastIndex}
              selectIsLoadingTracks={favorites.selectIsLoadingTracks}
              selectHasMoreTracks={favorites.selectHasMoreTracks}
              selectTracks={favorites.selectTracks}
              fetch={favorites.fetch}
              isFavorite={true}
            />
          </Route>
          <Route path="/search">
            <TrackList
              selectTracks={search.selectTracks}
              selectLastIndex={search.selectLastIndex}
              selectIsLoadingTracks={search.selectIsLoadingTracks}
              selectHasMoreTracks={search.selectHasMoreTracks}
              fetch={search.fetch}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
