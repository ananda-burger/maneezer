import { useDispatch, useSelector } from 'app/hooks'
import { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import * as search from 'store/searchSlice'
import * as user from 'store/userSlice'
import { Route } from 'types'
import LoginIcon from 'view/common/icons/LoginIcon'
import LogoIcon from 'view/common/icons/LogoIcon'
import SearchIcon from 'view/common/icons/SearchIcon'
import UserIcon from 'view/common/icons/UserIcon'
import SearchInputContainer from 'view/common/SearchInputContainer'
import { styled } from 'view/common/theme'
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
    path === Route.Favorites
      ? `color: ${theme.colors.secondary1};`
      : `color: ${theme.colors.primary5};`}
`

const PlaylistsLink = styled(Link)<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
  ${({ path, theme }) =>
    path === Route.Playlists
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
        <LogoLink to={Route.Home}>
          <LogoIcon />
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
              <TopTracksLink to={Route.Home} path={path}>
                Top Tracks
              </TopTracksLink>
              <FavoritesLink to={Route.Favorites} path={path}>
                Favorites
              </FavoritesLink>
              <SearchLink
                onClick={() => {
                  dispatch(search.open())
                }}
                path={path}
              >
                <SearchIcon />
              </SearchLink>
              <PlaylistsLink to={Route.Playlists} path={path}>
                Playlists
              </PlaylistsLink>
            </>
          )}
        </MainNavOptions>
        {isLogged ? (
          <UserLink to={Route.Home}>
            <LogoutOptions onClick={() => dispatch(user.logout())}>
              <UserIcon />
              <span className="medium-only">Logout</span>
            </LogoutOptions>
          </UserLink>
        ) : (
          <LoginOptions onClick={() => dispatch(user.login())}>
            <LoginIcon />
            <span className="medium-only">Login</span>
          </LoginOptions>
        )}
      </Nav>
    </Header>
  )
}
