import styled from 'styled-components'
import colors from '../../utils/style/colors'

export default function Footer() {
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

  return (
    <FooterContainer>
      <NeightModeButton>Changer de mode</NeightModeButton>
    </FooterContainer>
  )
}
