import styled from 'styled-components'

const Icon = styled.svg`
  position: absolute;
  top: 0.35rem;
  right: 0.5rem;
  transition: 0.2 ease;
  &:hover {
    fill: rgb(227, 77, 134);
    cursor: pointer;
    color: rgb(227, 77, 134);
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
