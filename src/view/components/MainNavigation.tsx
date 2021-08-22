import { useHistory, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Search from 'view/components/icons/Search'
import User from 'view/components/icons/User'
import Logo from 'view/components/icons/Logo'
import Back from 'view/components/icons/Back'
import ClearInput from 'view/components/icons/ClearInput'
import { useSelector, useDispatch } from 'app/hooks'
import * as search from 'store/searchSlice'
import * as user from 'store/userSlice'
import { useRef } from 'react'

const Header = styled.header`
  font-size: 1.2rem;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  padding: 0.7rem 0;
  z-index: 997;
  position: sticky;
  top: 0;
`

const TopTracksLink = styled(Link)<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
  ${({ path }) =>
    path === '/' ? 'color: rgb(227, 77, 134);' : 'color: darkgray;'}
`

const MainNavOptions = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 2rem;
    &:first-child {
      margin: 0;
    }
  }
`

const FavoritesLink = styled(Link)<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
  ${({ path }) =>
    path === '/favorites' ? 'color: rgb(227, 77, 134);' : 'color: darkgray;'}
`

const SearchLink = styled.a<{ path: string }>`
  &:hover {
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
`

const LogoLink = styled(Link)`
  margin-left: 1rem;
  justify-self: flex-start;
`

const UserLink = styled(Link)`
  margin-right: 1rem;
`

const InputContainer = styled.div`
  position: relative;
`

const SearchInput = styled.input`
  font-size: 1.1rem;
  color: white;
  width: 20rem;
  height: 2.3rem;
  padding: 0 3rem;
  border-radius: 5px;
  border: none;
  background: rgba(250, 250, 250, 0.3);
  outline: pink;
`

export default function MainNavigation() {
  const { pathname: path } = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const searchInput = useSelector(search.selectSearchInput)
  const isSearching = useSelector(search.selectIsSearching)
  const textInput = useRef<HTMLInputElement>(null)

  return (
    <Header>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <MainNavOptions>
        {isSearching ? (
          <InputContainer>
            <span onClick={() => dispatch(search.close())}>
              <Back />
            </span>
            <SearchInput
              ref={textInput}
              value={searchInput}
              type="text"
              placeholder="Search"
              spellCheck={false}
              autoFocus
              onChange={(e) => {
                dispatch(search.update(e.target.value))
              }}
              onKeyUp={(e) => {
                if (e.key === 'Escape') {
                  dispatch(search.close())
                } else if (e.key === 'Enter') {
                  history.push('/search?q=input')
                }
              }}
            />
            {searchInput !== '' && (
              <span
                onClick={() => {
                  textInput.current && textInput.current.focus()
                  dispatch(search.update(''))
                }}
              >
                <ClearInput />
              </span>
            )}
          </InputContainer>
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
      <UserLink to="/">
        <div onClick={() => dispatch(user.login())}>
          <User />
        </div>
      </UserLink>
    </Header>
  )
}
