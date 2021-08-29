import { useDispatch } from 'app/hooks'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Back from 'view/components/icons/Back'
import ClearInput from 'view/components/icons/ClearInput'
import { styled } from 'view/theme'
import * as search from 'store/searchSlice'

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
  background: ${({ theme }) => theme.colors.primary4};
  outline: none;

  @media (max-width: 768px) {
    & {
      width: 10rem;
    }
  }
`

export default function SearchInputContainer({ searchInput, isLoading }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const textInput = useRef<HTMLInputElement>(null)

  return (
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
            dispatch(search.fetchFirstPage({ isLoading, query: searchInput }))
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
  )
}
