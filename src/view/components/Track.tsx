import classes from 'view/components/Track.module.css'
import { secondsToMinutes } from 'utilities'
import ExternalLink from 'view/components/icons/ExternalLink'
import Heart from 'view/components/icons/Heart'

export default function Track({ track }) {
  return (
    <li className={classes.trackContainer}>
      <div className={classes.position}>{track.position}</div>
      <img
        src={track.album.cover_small}
        alt="Album cover"
        className={classes.smallCover}
      />
      <div>
        <div className={classes.trackName}>{track.title}</div>
        <div className={classes.artistName}>{track.artist.name}</div>
      </div>
      <div>{track.album.title}</div>
      <div>{secondsToMinutes(track.duration)}</div>
      <div className={classes.buttonsContainer}>
        <Heart className={classes.smallIcon} />
        <ExternalLink className={classes.smallIcon} />
      </div>
    </li>
  )
}
