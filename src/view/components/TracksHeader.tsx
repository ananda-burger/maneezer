import classes from 'view/components/TracksHeader.module.css'
import Clock from 'view/components/icons/Clock'

export default function TracksHeader() {
  return (
    <div className={classes.container}>
      <div className={classes.headerGrid}>
        <div className={classes.hash}>#</div>
        <div></div>
        <div>TITLE</div>
        <div>ALBUM</div>
        <Clock className={classes.clock} />
        <div></div>
      </div>
    </div>
  )
}
