import {Link} from "react-router-dom"
import Logo from "../assets/HawkeyeSunsetLogo.png"


export function About(){
    return(
        <>
            <ul className="navbar">
                <img src={Logo} className="logo"></img>
                <Link to="/">Home</Link>
                <Link to="/about"><strong>About</strong></Link>
                <Link to="/feedback">Feedback</Link>
            </ul>

        </>
    )
}