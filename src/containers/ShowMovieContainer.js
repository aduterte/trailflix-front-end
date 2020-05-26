import React, {useState} from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"


export default function ShowMovieContainer(props){
    
   

    
    function handleMovieClick(movie) {
        document.getElementById("movie-container").scrollTop = 0
        console.log("i was clicked")
    }

    return (
        <div id="movie-container">
            <div>
                <HeroMovie userFavorites={props.userFavorites} movie={props.movie} action={props.action}/>
            </div>
            {/* <div className="flex-grid">
                {props.movies.map(movie => <Movie title="movie-container" key={movie.id} movie={movie} removeFavorite={props.removeFavorite} action={handleMovieClick}/>)}
            </div> */}
        </div>
    )
}