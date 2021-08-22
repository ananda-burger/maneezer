import { useHistory, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Search from 'view/components/icons/Search'
import User from 'view/components/icons/User'
import Back from 'view/components/icons/Back'
import Login from 'view/components/icons/Login'
import Logo from 'view/components/icons/Logo'
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

const LogoutOptions = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  svg {
    &:first-child {
      margin-right: 0.6rem;
    }
  }
`

const LoginOptions = styled(LogoutOptions)`
  svg {
    &:first-child {
      margin-right: 0.3rem;
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
  display: flex;
  align-items: center;
  img {
    &:first-child {
      margin-right: 0.6rem;
    }
  }
`

const UserLink = styled(Link)`
  margin-right: 1rem;
  &:hover {
    div {
      color: rgb(227, 77, 134);
    }
  }
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

const Image = styled.img`
  width: 32px;
  height: 42px;
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
  const textInput = useRef<HTMLInputElement>(null)

  return (
    <Header>
      <LogoLink to="/">
        <Image
          src="https://ik.imagekit.io/z9fjicafx6e/Media_Icons/Untitled_86yGLQ_ib_6u9-lnMbwCn.png?updatedAt=1629662990877"
          alt="music notes"
        />
        Maneezer
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
                  dispatch(search.fetch({ isLoading, lastIndex }))
                  history.push(`/search?q=${searchInput}`)
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
        {isLogged ? (
          <LogoutOptions onClick={() => dispatch(user.login())}>
            <User />
            Logout
          </LogoutOptions>
        ) : (
          <LoginOptions onClick={() => dispatch(user.login())}>
            <Login />
            Login
          </LoginOptions>
        )}
      </UserLink>
    </Header>
  )
}
