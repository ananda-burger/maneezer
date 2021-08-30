import { styled } from 'view/components/theme'

const Icon = styled.svg`
  position: absolute;
  top: calc(50% - 0.65rem);
  right: 0.5rem;
  transition: 0.2 ease;
  &:hover {
    fill: ${({ theme }) => theme.colors.secondary1};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary1};
`

export default function ClearInput() {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </Icon>
  )
}
