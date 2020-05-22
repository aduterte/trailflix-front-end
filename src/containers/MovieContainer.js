import React from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"


export default function MovieContainer(props){
    console.log(props)
    const random = [Math.floor(Math.random() * props.movies.length)]
    return (
        <div id="movie-container">
            <div>
                {props.movies.length > 0 ? <HeroMovie movie={props.movies} rnd={random}/> : null}
            </div>
            <div className="flex-grid">
                {props.movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
        </div>
    )
}