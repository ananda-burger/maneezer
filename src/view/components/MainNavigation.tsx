import classes from './MainNavigation.module.css'
import { Link } from 'react-router-dom'

export default function MainNavigation() {
  return (
    <header className={classes.head}>
      <Link to="/">Maneezer</Link>
      <Link to="/">Top Tracks</Link>
      <Link to="/favorites">Favorites</Link>
    </header>
  )
}
