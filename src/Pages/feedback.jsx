import {Link} from "react-router-dom"
import Logo from "../assets/HawkeyeSunsetLogo.png"

export function Feedback(){
    return(
        <>
            <ul className="navbar">
                <img src={Logo} className="logo"></img>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/feedback"><strong>Feedback</strong></Link>
            </ul>
        </>
    )
}