import styled from 'styled-components'

const Icon = styled.svg`
  width: 2.7rem !important;
  height: 2.7rem !important;
  transition: 0.2 ease;
  &:hover {
    fill: rgb(227, 77, 134);
    cursor: pointer;
    color: white;
  }
`

export default function Play() {
  return (
    <Icon
      className="app-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeWidth={1}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
    </Icon>
  )
}
