import styled from 'styled-components'

const Icon = styled.svg`
  position: absolute;
  top: calc(50% - 0.65rem);
  left: 0.7rem;
  transition: 0.2 ease;
  &:hover {
    fill: rgb(227, 77, 134);
    cursor: pointer;
    color: rgb(227, 77, 134);
  }
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
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </Icon>
  )
}
