import React, {useState} from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"


export default function MovieContainer(props){
    
    const [currentMovie, setCurrentMovie] = useState(props.rndMov)

    
    function handleMovieClick(movie) {
        setCurrentMovie(movie)   
    }
   
    return (
        <div id="movie-container">
            <div>
                <HeroMovie movie={currentMovie}/>
            </div>
            <div className="flex-grid">
                {props.movies.map(movie => <Movie key={movie.id} movie={movie} handleMovieClick={handleMovieClick}/>)}
            </div>
        </div>
    )
}