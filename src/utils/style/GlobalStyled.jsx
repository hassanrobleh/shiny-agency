import { createGlobalStyle } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../context'

export const StyledGlobalStyled = createGlobalStyle`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? '#2F2E41' : 'white'};
  }
`

function GlobalStyled() {
  const { theme } = useContext(ThemeContext)
  return <StyledGlobalStyled isDarkMode={theme === 'dark'} />
}

export default GlobalStyled
