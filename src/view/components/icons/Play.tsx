import styled from 'styled-components'

const Icon = styled.svg`
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
      fill="currentColor"
      className="app-icon"
      viewBox="0 0 512 512"
      width="512px"
    >
      <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" />{' '}
    </Icon>
  )
}
