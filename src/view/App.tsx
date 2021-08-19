import TrackList from 'view/TrackList'
import MainNavigation from 'view/components/MainNavigation'
import TracksHeader from 'view/components/TracksHeader'

export default function App() {
  return (
    <div>
      <MainNavigation />
      <TracksHeader />
      <TrackList />
    </div>
  )
}
