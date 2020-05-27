import React, {useState} from "react"
import { Link } from "react-router-dom"

export default function NavButton (props){
    const [isHovered, setIsHovered] = useState(false)
    return (
        <Link to={props.link}>
         <div className={!isHovered ? "right-nav":"right-nav-hovered"} onMouseOver={()=>setIsHovered(!isHovered)} 
         onMouseOut={()=>setIsHovered(!isHovered)}>
        
        
            {props.text}
       
        </div>
        </Link>
    )
}