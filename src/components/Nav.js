import React, {useState} from "react"
import { Link } from "react-router-dom"
import NavButton from "../components/NavButton"
import '../App.css'

export default function Nav (props) {

    const [isHovered, setIsHovered] = useState(false)

    return(
        <div id="top-nav">
            <div id="left-nav">
                <Link to="/">
                <img alt="Trailflix Logo" src="http://localhost:3001/images/smalllogo.svg"/>
                </Link>
            </div>
            <div id="right-nav">
                <NavButton link="/search" text="Search"/>
                <NavButton link="/movies" text="Movies"/>
                {props.user ? 
                <NavButton link="/profile" text="Profile"/>:
                <NavButton link="/login" text="Log In"/>}
                {props.user ? 
                <Link to="/login" >
                <div className={!isHovered ? "right-nav":"right-nav-hovered"} 
                onMouseOver={()=>setIsHovered(!isHovered)} 
                onMouseOut={()=>setIsHovered(!isHovered)}
                onClick={props.handleLogout}>
                     
                    
                    Log Out
                    
                </div>
                </Link>
                : null }
            </div>
        </div>
    )
}