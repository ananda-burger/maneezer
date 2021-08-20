import Clock from 'view/components/icons/Clock'
import styled from 'styled-components'
import { Icon } from 'view/components/styled'

const Container = styled.div`
  position: sticky;
  top: 3.5rem;
  background: black;
`

const Grid = styled.div`
  margin: 0;
  display: grid;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  justify-items: flex-start;
  grid-template-columns: 0.5fr 0.7fr 4fr 3fr 1fr 1fr;
  padding: 0.4rem 2.5rem;
  border-bottom: 1px solid rgb(51, 51, 51);
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
