import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import { fetchTracks, selectLastIndex } from 'store/trackSlice'
import * as types from 'types'
import Track from 'view/components/Track'
import classes from 'view/TrackList.module.css'

export default function TrackList({ tracks }) {
  const lastIndex = useSelector(selectLastIndex)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTracks(lastIndex))
  }, [dispatch])

  return (
    <div>
      <ul className={classes.container}>
        {tracks.map((track: types.Track) => {
          return <Track key={track.id} track={track} />
        })}
      </ul>
      <button
        className={classes.button}
        onClick={() => dispatch(fetchTracks(lastIndex))}
      >
        Infinity Scroll
      </button>
    </div>
  )
}
