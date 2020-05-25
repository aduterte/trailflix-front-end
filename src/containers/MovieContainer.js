import React, {useState} from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"


export default function MovieContainer(props){
    
    const [currentMovie, setCurrentMovie] = useState(props.rndMov)

    
    function handleMovieClick(movie) {
        document.getElementById("movie-container").scrollTop = 0
        setCurrentMovie(movie)   
    }

    return (
        <div id="movie-container">
            <div>
                <HeroMovie userFavorites={props.userFavorites} movie={currentMovie} action={props.action}/>
            </div>
            <div className="flex-grid">
                {props.movies.map(movie => <Movie title="movie-container" key={movie.id} movie={movie} removeFavorite={props.removeFavorite} action={handleMovieClick}/>)}
            </div>
        </div>
    )
}