import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  background: rgba(50, 5, 22);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: 100%;
  height: 3.5rem;
  z-index: 997;
  position: sticky;
  top: 0;
`

export default function MainNavigation() {
  return (
    <Header>
      <Link to="/">Maneezer</Link>
      <Link to="/">Top Tracks</Link>
      <Link to="/favorites">Favorites</Link>
    </Header>
  )
}
