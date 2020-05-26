import React from "react"
import { Link } from "react-router-dom"
import '../App.css'

export default function Nav (props) {
    return(
        <div id="top-nav">
            <div id="left-nav">
                LOGO HERE
            </div>
            <div id="right-nav">
                <button><Link to="/search">Search</Link></button>
                <button><Link to="/movies">Movies</Link></button>
                <button>
                {props.user ? 
                 <Link to="/profile">profile</Link>:
                <Link to="/login">Login</Link>}
                </button>
            </div>
        </div>
    )
}