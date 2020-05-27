import React, {useState} from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"
import {Redirect} from "react-router-dom"


export default function MovieContainer(props){
    
    const [currentMovie] = useState(props.rndMov)

    
    function handleMovieClick(movie) {
        document.getElementById("movie-container").scrollTop = 0
        return <Redirect to={`/movies/${movie.id}`}/>  
    }

    return (
        <div id="movie-container">
            <div>
                <HeroMovie userFavorites={props.userFavorites} movie={currentMovie} action={props.action}/>
            </div>
            <div className="movies-header"> <h1 style={{color: "white"}}>All Movies</h1></div>
            <div className="flex-grid">
                {props.movies.map(movie => <Movie title="movie-container" favs={props.userFavorites} key={movie.id} movie={movie} handleFavorite={props.action} action={handleMovieClick}/>)}
            </div>
        </div>
    )
}