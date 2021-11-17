import { useContext } from 'react'
import { ThemeContext } from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: 'row';
  align-item: center;
  justify-content: center;
  padding-top: 60px;
`

const NeightModeButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.secondary};
`

export default function Footer() {
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <FooterContainer>
      <NeightModeButton onClick={() => toggleTheme()}>
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NeightModeButton>
    </FooterContainer>
  )
}
