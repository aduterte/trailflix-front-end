import React, {useState, useEffect} from "react"
import Movie from "../components/Movie"
import HeroMovie from "../components/HeroMovie"


export default function ShowMovieContainer(props){
    
   
    const [similar, setSimilar] = useState([]),
        {movie, similarMovies, dbConvertor} = props
    
    function handleMovieClick(movie) {
        document.getElementById("movie-container").scrollTop = 0
        
    }

    useEffect(()=> {
        setSimilar(similarMovies)
        fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/similar?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US&page=1`)
        .then(resp => resp.json())
        .then( movArr => dbConvertor(movArr.results, "show"))
    }, [movie])

    useEffect(()=>{
        setSimilar(similarMovies)
    }, [similarMovies])
    return (
        <div id="movie-container">
            <div>
                <HeroMovie userFavorites={props.userFavorites} movie={props.movie} action={props.action}/>
            </div><div className="movies-header"> <h1 style={{color: "white"}}>Similar Movies</h1></div>
           
            <div className="flex-grid">
                
                {similar.map(movie => <Movie title="movie-container" favs={props.userFavorites} key={movie.id} movie={movie} handleFavorite={props.action} action={handleMovieClick}/>)}
            </div>
        </div>
    )
}