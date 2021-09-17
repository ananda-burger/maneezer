import { useHistory } from 'react-router-dom'
import { styled } from 'view/common/theme'
import { Route } from 'types'

const Header = styled.div`
  font-size: 0.9rem;
  background: ${({ theme }) => theme.colors.primary2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary4};
  color: ${({ theme }) => theme.colors.primary5};
  position: sticky;
  width: 100%;
  z-index: 997;
  top: 3.5rem;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`

const TracksHeaderGroup = styled.div`
  margin: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 0.7fr 4fr 3fr 1fr 1fr;
  grid-gap: 0.8rem;
  padding: 0.6rem 1.5rem;
`

export default function TracksHeader({ columns }) {
  return (
    <Header>
      <TracksHeaderGroup>
        <div>{columns[0]}</div>
        <div>{columns[1]}</div>
        <div>{columns[2]}</div>
        <div>{columns[3]}</div>
        <div>{columns[4]}</div>
        <div>{columns[5]}</div>
      </TracksHeaderGroup>
    </Header>
  )
}
