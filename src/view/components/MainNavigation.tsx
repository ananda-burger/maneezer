import { useHistory, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Search from 'view/components/icons/Search'
import User from 'view/components/icons/User'
import Logo from 'view/components/icons/Logo'
import { openSearch, closeSearch, updateSearchInput } from 'store/searchSlice'
import { useSelector, useDispatch } from 'app/hooks'
import { selectSearchInput } from 'store/searchSlice'

const Header = styled.header`
  font-size: 1.2rem;
  background: rgba(50, 5, 22);
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  align-items: center;
  justify-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.4rem 0;
  z-index: 997;
  position: sticky;
  top: 0;
`

const TopTracksLink = styled(Link)<{ path: string }>`
  margin: 2rem;
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
  ${({ path }) =>
    path === '/' ? 'color: rgb(227, 77, 134);' : 'color: darkgray;'}
`

const MainNavOptions = styled.div`
  justify-self: center;
`

const FavoritesLink = styled(Link)<{ path: string }>`
  margin: 2rem;
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
  ${({ path }) =>
    path === '/favorites' ? 'color: rgb(227, 77, 134);' : 'color: darkgray;'}
`

const SearchLink = styled.a<{ path: string }>`
  margin: 2rem;
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
`

const LogoLink = styled(Link)`
  margin-left: 2rem;
  justify-self: flex-start;
`

const UserLink = styled(Link)`
  justify-self: flex-end;
`
export default function MainNavigation({
  isSearching
}: {
  isSearching: boolean
}) {
  const { pathname: path } = useLocation()
  const dispatch = useDispatch()
  const searchInput = useSelector(selectSearchInput)
  const history = useHistory()

  return (
    <Header>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <MainNavOptions>
        <TopTracksLink to="/" path={path}>
          Top Tracks
        </TopTracksLink>
        <FavoritesLink to="/favorites" path={path}>
          Favorites
        </FavoritesLink>
        <span>
          {isSearching ? (
            <span>
              <span onClick={() => dispatch(closeSearch())}> {`<-`} </span>
              <input
                value={searchInput}
                type="text"
                autoFocus
                onChange={(e) => {
                  dispatch(updateSearchInput(e.target.value))
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Escape') {
                    dispatch(closeSearch())
                  } else if (e.key === 'Enter') {
                    history.push('/search?q=input')
                  }
                }}
              />
              <span
                onClick={() => {
                  dispatch(updateSearchInput(''))
                  dispatch(closeSearch())
                }}
              >
                x
              </span>
            </span>
          ) : (
            <SearchLink
              onClick={() => {
                dispatch(openSearch())
              }}
              path={path}
            >
              <Search />
            </SearchLink>
          )}
        </span>
      </MainNavOptions>
      <div>
        <UserLink to="/">
          <User />
        </UserLink>
      </div>
    </Header>
  )
}
