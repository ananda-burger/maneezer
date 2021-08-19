import classes from 'view/components/Track.module.css'
import { secondsToMinutes } from 'utilities'
import ExternalLink from 'view/components/icons/ExternalLink'
import Heart from 'view/components/icons/Heart'
import Play from 'view/components/icons/Play'

export default function Track({ track }) {
  return (
    <li className={classes.trackContainer}>
      <Play className={classes.playIcon} />
      <img
        src={track.album.cover_small}
        alt="Album cover"
        className={classes.smallCover}
      />
      <div>
        <div className={classes.trackName}>{track.title}</div>
        <div className={classes.artistName}>{track.artist.name}</div>
      </div>
      <div className={classes.albumTitle}>{track.album.title}</div>
      <div>{secondsToMinutes(track.duration)}</div>
      <div className={classes.buttonsContainer}>
        <Heart className={classes.heartIcon} />
        <a href={track.link} target="_blank">
          <ExternalLink className={classes.smallIcon} />
        </a>
      </div>
    </li>
  )
}
