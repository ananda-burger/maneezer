import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import * as search from 'store/searchSlice'
import * as user from 'store/userSlice'
import { Route } from 'types'
import Clock from 'view/components/icons/Clock'
import Login from 'view/components/icons/Login'
import Logo from 'view/components/icons/Logo'
import Search from 'view/components/icons/Search'
import User from 'view/components/icons/User'
import SearchInputContainer from 'view/SearchInputContainer'
import { Icon } from 'view/components/styled'
import { styled } from 'view/theme'
import queryString from 'query-string'

const Header = styled.header`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.primary2};
  position: sticky;
  width: 100%;
  padding: 0.7rem 0;
  z-index: 997;
  top: 0;

  @media (max-width: 768px) {
    .medium-only {
      display: none;
    }
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopTracksLink = styled(Link)<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
  ${({ path, theme }) =>
    path === Route.Home
      ? `color: ${theme.colors.secondary1};`
      : `color: ${theme.colors.primary5};`}
`

const MainNavOptions = styled.div`
  display: flex;
  align-items: center;

  a {
    font-weight: bold;
    font-size: 1.3rem;
    margin-left: 2rem;
    &:first-child {
      margin: 0;
    }
  }
`

const LogoutOptions = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;

  @media (max-width: 768px) {
    svg {
      margin: 0;
    }
  }

  svg {
    &:first-child {
      margin-right: 0.6rem;
    }
  }
`

const LoginOptions = styled(LogoutOptions)`
  margin-right: 1rem;
  transition: color 0.12s;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }

  svg {
    &:first-child {
      margin-right: 0.3rem;
    }
  }

  @media (max-width: 768px) {
    & {
      margin: 0;
    }
  }
`

const FavoritesLink = styled(Link)<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
  ${({ path, theme }) =>
    path === '/favorites'
      ? `color: ${theme.colors.secondary1};`
      : `color: ${theme.colors.primary5};`}
`

const SearchLink = styled.a<{ path: string }>`
  transition: color 0.12s;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

const LogoLink = styled(Link)`
  margin-left: 1rem;
  justify-self: flex-start;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.6rem;
  }
`

const UserLink = styled(Link)`
  margin-right: 1rem;

  @media (max-width: 768px) {
    & {
      margin: 0;
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

const TracksHeader = styled.div`
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

export default function MainNavigation() {
  const { pathname: path } = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const searchInput = useSelector(search.selectSearchInput)
  const isSearching = useSelector(search.selectIsSearching)
  const lastIndex = useSelector(search.selectLastIndex)
  const isLoading = useSelector(search.selectIsLoadingTracks)
  const isLogged = useSelector(user.selectIsLogged)
  const { q: urlSearchQuery }: { q?: string } = queryString.parse(
    history.location.search
  )

  useEffect(() => {
    if (!searchInput && urlSearchQuery) {
      dispatch(
        search.updateAndFetch({ lastIndex, isLoading, query: urlSearchQuery })
      )
    }
  }, [])

  return (
    <Header>
      <Nav>
        <LogoLink to="/">
          <Logo />
          <span className="medium-only">Maneezer</span>
        </LogoLink>
        <MainNavOptions>
          {isSearching ? (
            <SearchInputContainer
              searchInput={searchInput}
              isLoading={isLoading}
            />
          ) : (
            <>
              <TopTracksLink to="/" path={path}>
                Top Tracks
              </TopTracksLink>
              <FavoritesLink to="/favorites" path={path}>
                Favorites
              </FavoritesLink>
              <SearchLink
                onClick={() => {
                  dispatch(search.open())
                }}
                path={path}
              >
                <Search />
              </SearchLink>
            </>
          )}
        </MainNavOptions>
        {isLogged ? (
          <UserLink to="/">
            <LogoutOptions onClick={() => dispatch(user.logout())}>
              <User />
              <span className="medium-only">Logout</span>
            </LogoutOptions>
          </UserLink>
        ) : (
          <LoginOptions onClick={() => dispatch(user.login())}>
            <Login />
            <span className="medium-only">Login</span>
          </LoginOptions>
        )}
      </Nav>
      <TracksHeader>
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
      </TracksHeader>
    </Header>
  )
}
