import React from "react"

export default function Movie(props){

    const poster = `https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`

    return(
        <div className="col">
            <img src={poster} alt={props.movie.title} onClick={() => props.action(props.movie)}/>
            {props.movie.title}
            <br/>
            {props.title === "profile" ? 
            <button onClick={() => props.removeFavorite(props.movie)} >remove</button> :
            null
            }
        </div>
    )
}