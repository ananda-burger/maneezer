import styled from 'styled-components'

export const Icon = styled.svg<{ size?: string }>`
  width: ${({ size = '1.3rem' }) => size};
  height: ${({ size = '1.3rem' }) => size};
`
