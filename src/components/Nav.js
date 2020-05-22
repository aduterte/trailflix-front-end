import React from "react"
import { Link } from "react-router-dom"
import '../App.css'

export default function Nav () {
    return(
        <div id="top-nav">
            <div id="left-nav">
                LOGO HERE
            </div>
            <div id="right-nav">
                <button>Search</button>
                <button><Link to="/movies">Movies</Link></button>
                <button><Link to="/login">Login</Link></button>
            </div>
        </div>
    )
}