import { useSelector, useDispatch } from 'app/hooks'
import Track from 'view/components/Track'

import { addTrack, selectTracks } from 'store/trackSlice'
import * as t from 'types'

export default function TrackList() {
  const tracks = useSelector(selectTracks)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(addTrack())}>x</button>
      <ul>
        {tracks.map((track: t.Track) => {
          return <Track key={track.id} track={track} />
        })}
      </ul>
    </div>
  )
}
