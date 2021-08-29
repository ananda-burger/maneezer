import Clock from 'view/components/icons/Clock'
import { Icon } from 'view/components/styled'
import { styled } from 'view/theme'

const Header = styled.div`
  font-size: 0.9rem;
  background: ${({ theme }) => theme.colors.primary2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary4};
  color: ${({ theme }) => theme.colors.primary5};
  margin-top: 1rem;

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

export default function TracksHeader() {
  return (
    <Header>
      <TracksHeaderGroup>
        <div></div>
        <div></div>
        <div>TITLE</div>
        <div>ALBUM</div>
        <div>
          <Icon>
            <Clock />
          </Icon>
        </div>
        <div></div>
      </TracksHeaderGroup>
    </Header>
  )
}
