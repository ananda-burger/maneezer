import baseStyled, { ThemedStyledInterface } from 'styled-components'

export const theme = {
  colors: {
    primary1: 'black',
    primary2: 'rgb(18, 18, 18)',
    primary3: 'rgb(24, 24, 24)',
    primary4: 'rgba(255, 255, 255, 0.2)',
    primary5: 'darkgray',
    secondary1: 'rgb(227, 77, 134)',
    secondary2: 'rgb(110 16 52)'
  }
}

type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
