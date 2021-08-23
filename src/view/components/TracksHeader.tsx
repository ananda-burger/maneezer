import Clock from 'view/components/icons/Clock'
import styled from 'styled-components'
import { Icon } from 'view/components/styled'

const Container = styled.div`
  position: sticky;
  top: 4rem;
  background: rgb(24, 24, 24);
  border-bottom: 1px solid rgb(51, 51, 51);
  color: gray;
`

const Grid = styled.div`
  margin: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 0.7fr 4fr 3fr 1fr 1fr;
  grid-gap: 0.8rem;
  padding: 0.6rem 1.5rem;
`

export default function TracksHeader() {
  return (
    <Container>
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
    </Container>
  )
}
