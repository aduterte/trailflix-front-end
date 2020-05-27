import React, {useState, useEffect} from "react"
import TrailerButton from "../components/TrailerButton"

import YouTube from "react-youtube"
import {
    Player,
    ControlBar
    // ReplayControl,
    // ForwardControl,
    // CurrentTimeDisplay,
    // TimeDivider,
    // PlaybackRateMenuButton,
    // VolumeMenuButton
  } from 'video-react'

export default function HeroMovie(props){
   
    const [cast, setCast] = useState([]),
        [trailers, setTrailers] = useState([]),
        [ytKey, setYtKey] = useState(""),
        [showTrailer, setShowTrailer] = useState(false),
        [showMovie, setShowMovie] = useState(false),
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
              rel: 0,
              modestbranding: 1,
            },
            
          }

        useEffect(() => {
                setShowTrailer(false)
                setShowMovie(false)
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
                    let certificationObj 
                    let certification
                    us ?
                    certificationObj = us.release_dates.find(element => element.certification !== ''):
                    certification = ""
                   
                    
                   
                    certificationObj === undefined ? certification = "" : certification = certificationObj.certification
                    //if the certObj is null set cert to "" else continute with what we had
                    // certificationObj.certification errors if certificationOb is null
                    setCertification(certification)
                })
                
                fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}/videos?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US`)
                .then(resp => resp.json())
                .then(data => {
                    setTrailers(data.results)
                    //data comes back an as array.
                })
             
    }, [movie.tmdb_id])   

   function _onReady(event) {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
      }

    const playTrailer = (key) =>{
        setYtKey(key)
        setShowTrailer(!showTrailer)
        setShowMovie(false)
    }

    function playMovie(){
        setShowTrailer(false)
        setShowMovie(!showMovie)
    }
    
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
                    <button className="hero-play" onClick={() => playMovie()}>Play</button>
                    {props.userFavorites.filter(mov => mov.title === movie.title).length > 0 ?
                    <img onClick={() => props.action(movie)} className="hero-fav" src="http://localhost:3001/images/fav_green.png"/>:
                     <img onClick={() => props.action(movie)} className="hero-fav" src="http://localhost:3001/images/fav_empty.png"/>}
                     {/* <img onClick={() => props.action(movie)} className="hero-fav" src="http://localhost:3001/images/fav_empty.png"/> */}
                </div>
                <div className="featured-top-right">
                    {showTrailer ? <YouTube videoId={ytKey} opts={opts} onReady={_onReady} /> : null}
                    {showMovie ? 
                    <div style={{marginTop: "-50px", marginLeft: "-100px"}}>
                        <Player 
                        aspectRatio="16:9"
                        fluid={false} width={640} 
                        autoPlay={true}
                        src={`http://localhost:3001/movies-files/${movie.tmdb_id}.m4v`}>
                        <ControlBar autoHide={false}>
                       
                            {/* <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                            <VolumeMenuButton disabled />
                         */}
                        </ControlBar>
                    </Player> 
                    </div>: null}
               
                </div> 
            </div>
            <div className="featured-bottom">
                
                {trailers.slice(0,7).map((trailer, index) =>  <TrailerButton key={index} num={index+1} ytKey={trailer.key} func={playTrailer}/>
                        
                )}
            </div>
            
        </div>
    )
   
}

// https://image.tmdb.org/t/p/w200/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg