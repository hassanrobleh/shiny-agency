import { Link } from "react-router-dom";

export default function Header() {

    return(
        <nav>
            <Link to="/">Acceuil </Link>
            <Link to="/survey/1">Questionnaire </Link>
            <Link to="/freelances">Profils</Link>
        </nav>
    )
}

 