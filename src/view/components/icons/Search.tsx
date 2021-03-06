import { styled } from 'view/theme'

const Icon = styled.svg`
  transition: 0.2 ease;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
`

export default function Search() {
  return (
    <Icon
      className="app-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Icon>
  )
}
