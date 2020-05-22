import React from "react"

export default function Movie(props){

    const poster = `https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`

    return(
        <div className="col">
            <img src={poster}/>
            {props.movie.title}
        </div>
    )
}