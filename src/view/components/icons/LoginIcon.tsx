import { styled } from 'view/components/theme'

const Icon = styled.svg`
  width: 1.7rem !important;
  height: 1.7rem !important;
  transition: 0.2 ease;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
  }
`
export default function LoginIcon() {
  return (
    <Icon
      className="app-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </Icon>
  )
}
