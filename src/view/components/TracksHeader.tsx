import { useSelector } from 'app/hooks'
import * as user from 'store/userSlice'
import * as types from 'types'
import Clock from 'view/components/icons/Clock'
import styled from 'styled-components'
import { Icon } from 'view/components/styled'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  position: sticky;
  top: 4rem;
  background: rgb(24, 24, 24);
  border-bottom: 1px solid rgb(51, 51, 51);
  color: gray;
`

const Grid = styled.div`
  margin: 0;
  padding: 0.6rem 2rem;
  display: grid;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  justify-items: flex-start;
  grid-template-columns: 0.5fr 0.7fr 4fr 3fr 1fr 1fr;
  padding: 0.6rem 1.5rem;
`

export default function TracksHeader() {
  const isLogged = useSelector(user.selectIsLogged)
  const location = useLocation()

  return (
    <Container>
      {isLogged && location.pathname === types.Route.Favorites && (
        <Grid>
          <div></div>
          <div></div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <Icon>
            <Clock />
          </Icon>
          <div></div>
        </Grid>
      )}
    </Container>
  )
}
