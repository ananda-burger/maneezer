import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TrackList from 'view/TrackList'
import MainNavigation from 'view/components/MainNavigation'
import TracksHeader from 'view/components/TracksHeader'
import { selectTracks, selectFavoriteTracks } from 'store/trackSlice'
import { useSelector } from 'app/hooks'

export default function App() {
  const topTracks = useSelector(selectTracks)
  const favoriteTracks = useSelector(selectFavoriteTracks)

  return (
    <div>
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
