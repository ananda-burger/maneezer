import { styled } from 'view/common/theme'

const Icon = styled.svg`
  transition: 0.2 ease;
  &:hover {
    color: white;
    fill: ${({ theme }) => theme.colors.secondary1};
    cursor: pointer;
  }
`

export default function HollowHeartIcon() {
  return (
    <Icon
      className="app-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </Icon>
  )
}