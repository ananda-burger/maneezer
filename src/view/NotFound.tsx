import { styled } from 'view/theme'
import { Link } from 'react-router-dom'

const HomeButton = styled(Link)<{ path: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  height: 2.5rem;
  width: 150px;
  background-color: ${({ theme }) => theme.colors.secondary1};
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: 0.2s ease;
  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

const Text = styled.p`
  color: white;
  font-size: 1rem;
  margin: 1rem;
  @media (min-width: 420px) {
    font-size: 1.3rem;
    margin: 1rem;
  }
`

const Image = styled.img`
  margin: 2rem;
  margin-bottom: 0;
  max-width: 80%;
  @media (min-width: 420px) {
    max-width: 400px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

const Info = styled.div`
  max-width: 50ch;
  @media (min-width: 420px) {
    max-width: 50ch;
  }
`

const Title = styled.p`
  color: ${({ theme }) => theme.colors.secondary1};
  line-height: 1.2;
  font-size: 3rem;
  margin: 1rem;
  margin-top: 0;
  @media (min-width: 420px) {
    color: ${({ theme }) => theme.colors.secondary1};
    line-height: 1.2;
    font-weight: bold;
    font-size: 4rem;
    margin: 1rem;
    margin-top: 0;
  }
`
export default function NotFound() {
  return (
    <Container>
      <Info>
        <Image
          src="https://ik.imagekit.io/z9fjicafx6e/Pages/404_gHnh3OoN-.jpg?updatedAt=1629651889251"
          alt="404 Page not found"
        />
        <Title>Whoops!</Title>
        <Text>Have you lost yourself in the music world?</Text>
        <HomeButton to="/" path="">
          Return Home
        </HomeButton>
      </Info>
    </Container>
  )
}
