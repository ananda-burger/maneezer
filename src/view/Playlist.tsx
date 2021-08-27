import { Link } from 'react-router-dom'
import { secondsToMinutes } from 'utilities'

export default function Playlist({ playlist }) {
  return (
    <div>
      <Link to={`/playlists/${playlist.id}`}>
        {playlist.title}
        {playlist.id}
        tracks: {playlist.nb_tracks}
        duration: {secondsToMinutes(playlist.duration)}
      </Link>
    </div>
  )
}
