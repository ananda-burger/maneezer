import { styled } from 'view/common/theme'

const Icon = styled.svg`
  transition: 0.2 ease;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0.5rem;
  &:hover {
    color: white;
    fill: ${({ theme }) => theme.colors.secondary1};
    cursor: pointer;
  }
`

export default function PlusIcon() {
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
        strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Icon>
  )
}
