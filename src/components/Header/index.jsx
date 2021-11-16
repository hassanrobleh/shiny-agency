import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";

// const StyleLink = styled(Link)`
//     padding:15px; color:#8186a0; text-decoration:none; font-size: 17px ;
//     ${({props}) => props.$isFullLink && `color: white; border-radius: 30px; background-color: #5843E4;`}
// `
const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) => 
        props.$isFullLink &&
        `color: white; border-radius: 30px; background-color: ${colors.primary}`}
`

export default function Header() {

    return(
        <nav>   
            <StyledLink to="/">Acceuil </StyledLink>
            <StyledLink to="/survey/1" $isFullLink>Questionnaire </StyledLink>
            <StyledLink to="/freelances">Profils</StyledLink>
        </nav>
    )
}

 