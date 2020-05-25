import React, {useState, useEffect} from "react"
// import "node_modules/video-react/dist/video-react.css"
import YouTube from "react-youtube"

export default function HeroMovie(props){
   
    const [cast, setCast] = useState([]),
        [ytKey, setYtKey] = useState(""),
        [showTrailer, setShowTrailer] = useState(false),
        movie = props.movie,
        backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
        style = {backgroundImage: `url(${backdrop})`},
        [certification, setCertification] = useState(""),
        opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }

        useEffect(() => {
                setShowTrailer(false)
                fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/credits?api_key=b94d0b3b408ccf74d9f49bb39a64a13b`)
                .then(resp => resp.json())
                .then(data => {
                    
                    const array = data.cast.slice(0, 4),
                    cast = array.map(actor => actor.name)
                    setCast(cast)
                    
                })


                // fetch call to the released endpoint to get the credentials i.e.  R, PG, PG13
                fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/release_dates?api_key=b94d0b3b408ccf74d9f49bb39a64a13b`)
                .then(resp => resp.json())
                .then(data => {
                    
                    const us = data.results.find(obj => obj.iso_3166_1 === "US")
                    const certificationObj = us.release_dates.find(element => element.certification !== '')
                    // console.log("is this it?", certificationObj)
                    let certification
                   
                    certificationObj === undefined ? certification = "" : certification = certificationObj.certification
                    //if the certObj is null set cert to "" else continute with what we had
                    // certificationObj.certification errors if certificationOb is null
                    setCertification(certification)
                    // console.log("cert:", certification)
                })
                
                fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/videos?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US`)
                .then(resp => resp.json())
                .then(data => {
                    setYtKey(data.results[0].key)
                    //data comes back an as array.
                })
             
    }, [movie.tmdb_id])   

   function _onReady(event) {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
      }

    function playTrailer(){
        setShowTrailer(!showTrailer)
    }
    console.log(props.userFavorites.filter(mov => mov.title === movie.title).length)
    return(
        <div className="featured-movie" style={style}>
            <div className="featured-top">
                <div className="featured-top-left">
                    <h1>{movie.title}</h1>
                    <div className="movie-info-bar">
                        <div className="rating-logo">
                            {certification === "" ? "Not Rated" : certification}
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
                    {/* if movie exists in user.favorites render remove fav else add fav. function logic handled in app.js */}
                    {/* {props.userFavorites.length > 0 ? null :  <button onClick={() => props.action(movie)}>add to favorites</button>} */}
                    {props.userFavorites.filter(mov => mov.title === movie.title).length > 0 ?
                     <button onClick={() => props.action(movie)}>remove from favorites</button>:
                     <button onClick={() => props.action(movie)}>add to favorites</button> }
                </div>
                <div className="featured-top-right">
                    {showTrailer ? <YouTube videoId={ytKey} opts={opts} onReady={_onReady} /> : null}
                    
               
                </div> 
            </div>
            <div className="featured-bottom">
                Things Go here like trailer buttons, favorite this, etc.
                <button onClick={playTrailer}>Play Trailer</button>
            </div>
            
        </div>
    )
   
}

// https://image.tmdb.org/t/p/w200/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg