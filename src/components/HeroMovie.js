import React, {useState, useEffect} from "react"

export default function HeroMovie(props){
    
    const [cast, setCast] = useState([]),
        movie = props.movie[props.rnd],
        backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
        style = {backgroundImage: `url(${backdrop})`}

        useEffect(() => {
            
                fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/credits?api_key=b94d0b3b408ccf74d9f49bb39a64a13b`)
                .then(resp => resp.json())
                .then(data => {
                    
                    const array = data.cast.slice(0, 4),
                        cast = array.map(actor => actor.name)
                        setCast(cast)
                    
                })
             
    }, [])   

    return(
        <div className="featured-movie" style={style}>
            <div className="featured-top">
                <div className="featured-top-left">
                    <h1>{movie.title}</h1>
                    <div className="movie-info-bar">
                        <div className="rating-logo">
                            Rated G
                        </div>
                        <div className="movie-released">
                            Released: {movie.release_date.substr(0,4)}
                        </div>
                        <div>
                            Runtime: {movie.runtime}minutes
                        </div>
                    </div>
                    <p>{movie.overview}</p>
                    <span className="cast"><p>Starring: {cast.join(", ")}</p></span>
                    <span className="genres"><p>Genres: {movie.genres.join(", ")}</p></span>
                </div>
                <div className="featured-top-right">
                    trailer video component goes here onClick state change
                </div> 
            </div>
            <div className="featured-bottom">
                Things Go here like trailer buttons, favorite this, etc.
            </div>
            
        </div>
    )
   
}

// https://image.tmdb.org/t/p/w200/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg