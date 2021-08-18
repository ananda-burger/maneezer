import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import { loadTracks, selectTracks } from 'store/trackSlice'
import * as types from 'types'
import Track from 'view/components/Track'

export default function TrackList() {
  const tracks = useSelector(selectTracks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTracks())
  }, [])

  return (
    <div>
      <ul>
        {tracks.map((track: types.Track) => {
          return <Track key={track.id} track={track} />
        })}
      </ul>
    </div>
  )
}
