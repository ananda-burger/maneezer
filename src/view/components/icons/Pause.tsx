import { styled } from 'view/theme'

const Icon = styled.svg`
  color: ${({ theme }) => theme.colors.secondary1};
  transition: 0.2 ease;
  &:hover {
    fill: ${({ theme }) => theme.colors.secondary1};
    cursor: pointer;
    color: white;
  }
`
export default function Pause() {
  return (
    <Icon fill="currentColor" className="app-icon" viewBox="0 0 512 512">
      <g>
        <path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
        <path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
      </g>
    </Icon>
  )
}
